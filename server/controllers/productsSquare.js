import fetch from "node-fetch";
import { squareEnv } from "../config/square.js";

const catalogToken = process.env.SQUARE_PROD_ACCESS_TOKEN;
const catalogBaseUrl = process.env.SQUARE_PROD_BASE_URL;

export const getSquareProducts = async (req, res) => {
    try {
        // ?types=ITEM
        const response = await fetch(`${catalogBaseUrl}/catalog/list?types=CATEGORY`, {
            method: "GET",
            headers: {
                "Square-Version": "2026-01-22", // required header
                "Authorization": `Bearer ${catalogToken}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(400).json({ error: data });
        }

        const items = data.objects || [];

        res.status(200).json(items);

    } catch (error) {
        console.error("Square Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch Square products" });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await fetch(`${catalogBaseUrl}/catalog/object/${id}?include_related_objects=true`, {
            method: "GET",
            headers: {
                "Square-Version": "2026-01-22",
                "Authorization": `Bearer ${catalogToken}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) return res.status(response.status).json({ error: data });

        const item = data.object;
        const related = data.related_objects || [];


        // Create lookup for modifiers/taxes
        const lookup = related.reduce((acc, obj) => {
            acc[obj.id] = obj;
            return acc;
        }, {});

        const itemData = item.item_data || {};
        const variation = itemData.variations?.[0]?.item_variation_data || {};

        const imageId = itemData.image_ids?.[0];

        const imageUrl =
            lookup[imageId]?.image_data?.url || "";

        // Format the single product exactly like your list items
        const formattedProduct = {
            id: item.id,
            name: itemData.name,
            description: itemData.description_plaintext,
            price: variation.price_money ? (variation.price_money.amount / 100).toFixed(2) : 0,
            imageUrl,
            taxes: (itemData.tax_ids || []).map(taxId => {
                const taxObj = lookup[taxId];
                const taxData = taxObj?.tax_data || {};
                return {
                    id: taxId,
                    name: taxData.name || "Tax",
                    rate: parseFloat(taxData.percentage || "0"),
                    inclusionType: taxData.calculation_phase
                };
            }),
        };

        res.status(200).json(formattedProduct);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product details" });
    }
};


const CATEGORY_MAP = {
    color: process.env.SQUARE_COLOR_CATEGORY_ID,
    blackwhite: process.env.SQUARE_BW_CATEGORY_ID,
    merchandise: process.env.SQUARE_MERCHANDISE_CATEGORY_ID,
};

const formatItem = (item, lookup) => {
    const itemData = item.item_data || {};
    const variationObject = itemData.variations?.[0];

    const variation = variationObject?.item_variation_data || {};

    // Taxes
    const taxes = (itemData.tax_ids || []).map(taxId => {
        const taxObj = lookup[taxId];
        const taxData = taxObj?.tax_data || {};
        return {
            id: taxId,
            name: taxData.name || "Tax",
            rate: parseFloat(taxData.percentage || "0"),
            inclusionType: taxData.calculation_phase
        };
    });

    // Modifiers
    const modifiers = (itemData.modifier_list_info || []).map(info => {
        const listData = lookup[info.modifier_list_id]?.modifier_list_data;
        return {
            listName: listData?.name,
            choices: listData?.modifiers?.map(m => ({
                name: m.modifier_data.name,
                priceAdd: m.modifier_data.price_money
                    ? (m.modifier_data.price_money.amount / 100).toFixed(2)
                    : "0.00"
            })) || []
        };
    });

    const imageId = itemData.image_ids?.[0];

    const imageUrl =
        lookup[imageId]?.image_data?.url || "";


    return {
        id: item.id,
        variationId: variationObject?.id,
        name: itemData.name,
        price: variation.price_money
            ? (variation.price_money.amount / 100).toFixed(2)
            : "0.00",
        description: itemData.description_plaintext,
        imageUrl,
        taxes,
        modifiers
    };
};

export const getAllProducts = async (req, res) => {
    try {
        const results = {};

        // 🔑 Loop through all categories
        for (const [key, categoryId] of Object.entries(CATEGORY_MAP)) {
            const response = await fetch(`${catalogBaseUrl}/catalog/search`, {
                method: "POST",
                headers: {
                    "Square-Version": "2026-01-22",
                    "Authorization": `Bearer ${catalogToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: {
                        exact_query: {
                            attribute_name: "category_id",
                            attribute_value: categoryId
                        }
                    },
                    include_related_objects: true
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data });
            }

            const allObjects = data.objects || [];
            const related = data.related_objects || [];


            const lookup = [...allObjects, ...related].reduce((acc, obj) => {
                acc[obj.id] = obj;
                return acc;
            }, {});

            const formatted = allObjects
                .filter(obj => obj.type === "ITEM")
                .map(item => formatItem(item, lookup));

            results[key] = formatted;
        }

        res.status(200).json(results);

    } catch (error) {
        console.error("Square Error:", error);
        res.status(500).json({ error: "Failed to fetch all products" });
    }
};