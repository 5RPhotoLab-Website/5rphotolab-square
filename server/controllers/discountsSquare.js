import fetch from "node-fetch";

const catalogToken = process.env.SQUARE_PROD_ACCESS_TOKEN;
const catalogBaseUrl = process.env.SQUARE_PROD_BASE_URL;

export const getValidatedDiscount = async (code) => {
    if (!code || !code.trim()) {
        throw new Error("Discount code is required.");
    }

    const normalizedCode = code.trim().toUpperCase();

    const response = await fetch(
        `${catalogBaseUrl}/catalog/list?types=DISCOUNT`,
        {
            method: "GET",
            headers: {
                "Square-Version": "2026-01-22",
                "Authorization": `Bearer ${catalogToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error(
            "Square discount lookup failed:",
            data
        );

        throw new Error("Unable to validate discount code.");
    }

    const discounts = data.objects || [];

    const matchingDiscount = discounts.find((object) => {
        if (
            object.type !== "DISCOUNT" ||
            !object.discount_data
        ) {
            return false;
        }

        const squareDiscountName =
            object.discount_data.name?.trim() || "";

        const squareDiscountCode =
            squareDiscountName
                .split("—")
                .pop()
                ?.trim()
                .toUpperCase();

        return squareDiscountCode === normalizedCode;
    });

    if (!matchingDiscount) {
        throw new Error("Invalid discount code.");
    }

    const discount = matchingDiscount.discount_data;

    return {
        code: normalizedCode,
        catalogDiscountId: matchingDiscount.id,
        name: discount.name,
        discountType: discount.discount_type,
        percentage: discount.percentage || null,
        amountMoney: discount.amount_money || null
    };
};

export const validateDiscountCode = async (req, res) => {
    try {
        const discount =
            await getValidatedDiscount(req.body.code);

        return res.status(200).json({
            success: true,
            discount
        });

    } catch (error) {
        console.error(
            "Discount validation error:",
            error
        );

        return res.status(500).json({
            success: false,
            error:
                "Unable to validate discount code."
        });
    }
};