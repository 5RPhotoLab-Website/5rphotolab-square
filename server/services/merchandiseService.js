
import fetch from "node-fetch";

export const getMerchandiseProductIds = async () => {
    const categoryId =
        process.env.SQUARE_MERCHANDISE_CATEGORY_ID;

    const token =
        process.env.SQUARE_PROD_ACCESS_TOKEN;

    const baseUrl =
        process.env.SQUARE_PROD_BASE_URL;

    if (!categoryId || !token || !baseUrl) {
        throw new Error("Missing Square catalog configuration.");
    }

    const productIds = new Set();
    let cursor;

    do {
        const response = await fetch(
            `${baseUrl}/catalog/search`,
            {
                method: "POST",
                headers: {
                    "Square-Version": "2026-01-22",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: {
                        exact_query: {
                            attribute_name: "category_id",
                            attribute_value: categoryId
                        }
                    },
                    ...(cursor ? { cursor } : {})
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Square catalog request failed: ${response.status}`
            );
        }

        const data = await response.json();

        for (const item of data.objects || []) {
            if (item.type === "ITEM") {
                productIds.add(String(item.id));
            }
        }

        cursor = data.cursor;
    } while (cursor);

    return productIds;
};
