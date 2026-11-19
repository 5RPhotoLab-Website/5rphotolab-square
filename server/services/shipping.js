
export const SHIPPING_FEE_CENTS = 599;

export const requiresShipping = (
    products = [],
    merchandiseProductIds = new Set()
) => {
    return products.some(product => {
        const isMerch = merchandiseProductIds.has(
            String(product.product_id)
        );

        if (isMerch) {
            return product.name?.trim().toLowerCase()
                !== "filmy sticker";
        }

        const modifiers = product.modifiers || {};

        const negatives = Object.entries(modifiers).find(
            ([name]) =>
                name.trim().toLowerCase() === "save my negatives"
        )?.[1];

        const prints = Object.entries(modifiers).find(
            ([name]) =>
                name.trim().toLowerCase() === "physical copies"
        )?.[1];

        const wantsNegatives =
            negatives?.name?.trim().toLowerCase() === "yes";

        const printChoice =
            prints?.name?.trim().toLowerCase();

        const wantsPrints =
            Boolean(printChoice) &&
            printChoice !== "no prints, thanks";

        return wantsNegatives || wantsPrints;
    });
};
