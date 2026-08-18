const OrderedConfirmationItems = ({ items }) => {
    if (!items?.length) return null;

    return (
        <div className="mt-3">
            {items.map((item) => {
                const modifiers = item.modifiers || {};

                const modifierEntries = Object.entries(modifiers).filter(
                    ([, value]) =>
                        value !== undefined &&
                        value !== null &&
                        value !== "" &&
                        value !== "merch"
                );

                return (
                    <div
                        key={item.id}
                        className="mb-6 tracking-wider"
                    >
                        {/* Product */}
                        <div className="flex justify-between">
                            <div>
                                <p className="font-atkinson-bold">
                                    {item.product_name}
                                </p>

                                {/* <p className="font-atkinson-regular">
                                    ${parseFloat(item.unit_price).toFixed(2)}
                                    {item.quantity > 1 && ` × ${item.quantity}`}
                                </p> */}
                            </div>

                            <p className="font-atkinson-bold text-[var(--color-pink)]">
                                ${parseFloat(item.line_total).toFixed(2)}
                            </p>
                        </div>

                        {/* Modifiers */}
                        {modifierEntries.length > 0 && (
                            <div className="mt-3 ml-4">
                                {modifierEntries.map(([key, modifier]) => {
                                    // Handles either:
                                    // modifier = "Some value"
                                    // OR
                                    // modifier = { name, priceAdd, ... }

                                    const value =
                                        modifier?.name ??
                                        modifier;

                                    const priceAdd = parseFloat(
                                        modifier?.priceAdd ||
                                        modifier?.price_add ||
                                        0
                                    );

                                    let title = key;

                                    if (
                                        key.trim().toLowerCase() ===
                                        "physical copies" ||
                                        key.trim().toLowerCase() ===
                                        "save my negatives"
                                    ) {
                                        title = `${key} - INVOICE LATER`;
                                    }

                                    return (
                                        <div
                                            key={key}
                                            className="mt-2"
                                        >
                                            <p className="font-atkinson-bold text-[var(--color-pink)] uppercase">
                                                {title}
                                            </p>

                                            <p className="font-atkinson-regular">
                                                {value}

                                                {priceAdd > 0 &&
                                                    ` (+$${priceAdd.toFixed(2)})`
                                                }
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OrderedConfirmationItems;