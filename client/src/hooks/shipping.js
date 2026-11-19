export const SHIPPING_RATE = 5.99;

export const requiresReturnShipping = (cart = [], merchandiseProducts = []) => {
    return cart.some(product => {
        const modifiers = product.modifiers || {};

        // Check if product is merchandise
        const isMerch = merchandiseProducts.some(
            merch => String(merch.id) === String(product.product_id)
        );

        // All merchandise requires shipping except Filmy Sticker
        if (isMerch) {
            return product.name?.trim().toLowerCase() !== "filmy sticker";
        }

        const saveNegatives = Object.entries(modifiers).find(
            ([name]) => name.trim().toLowerCase() === "save my negatives"
        )?.[1];

        const physicalCopies = Object.entries(modifiers).find(
            ([name]) => name.trim().toLowerCase() === "physical copies"
        )?.[1];

        const wantsNegatives =
            saveNegatives?.name?.trim().toLowerCase() === "yes";

        // Adjust to match your actual Square choice names.
        const physicalChoice =
            physicalCopies?.name?.trim().toLowerCase();

        const wantsPrints =
            Boolean(physicalChoice) &&
            !["no prints, thanks"].includes(physicalChoice);

        return wantsNegatives || wantsPrints;
    });
};

export const getReturnShippingFee = (cart = [], merchandiseProducts = []) =>
    requiresReturnShipping(cart, merchandiseProducts) ? SHIPPING_RATE : 0;