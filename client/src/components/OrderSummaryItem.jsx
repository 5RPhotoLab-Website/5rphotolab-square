const OrderSummaryItem = ({ cart }) => {
    return (
        <div className="pb-10">
            {cart.map((product) => {
                const lineTotal = (
                    product.unitPrice * product.quantity
                ).toFixed(2);

                const modifiers = product.modifiers || {};

                const modifierEntries = Object.entries(modifiers).filter(
                    ([key, value]) =>
                        value !== undefined &&
                        value !== null &&
                        value !== "" &&
                        value !== "merch"
                );

                return (
                    <div
                        key={`${product.product_id}-${JSON.stringify(product.modifiers)}`}
                        className="mt-6"
                    >
                        <div className="flex justify-between">
                            <p className="font-atkinson-bold text-[12px] md:text-[0.75vw] tracking-wider">
                                {product.name}
                            </p>

                            <p className="text-[var(--color-pink)] font-atkinson-bold text-[12px] md:text-[0.75vw] tracking-wider">
                                ${lineTotal}
                            </p>
                        </div>

                        <div className="flex mt-3 space-x-5">
                            <div className="relative shrink-0">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-[108px] h-[108px] md:w-[6.75vw] md:h-[12.8vh] object-cover"
                                />

                                <div
                                    style={{
                                        boxShadow:
                                            "0px 4px 0px rgba(0, 0, 0, 1)",
                                    }}
                                    className="
                                        absolute
                                        -top-2
                                        -right-2
                                        min-w-[22px]
                                        h-[22px]
                                        md:min-w-[1.375vw]
                                        md:h-[2.4vh]
                                        px-1
                                        rounded-[6px]
                                        bg-[#EEEDED]
                                        text-black
                                        flex
                                        items-center
                                        justify-center
                                        font-atkinson-bold
                                        text-[12px]
                                        md:text-[0.75vw]
                                        border-2
                                        border-black
                                    "
                                >
                                    {product.quantity}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                {modifierEntries.map(([key, modifier]) => {
                                    const value =
                                        modifier?.name ?? modifier;

                                    const priceAdd = parseFloat(
                                        modifier?.priceAdd || 0
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
                                        <div key={key}>
                                            <h1 className="
                                                font-atkinson-bold
                                                text-[12px]
                                                md:text-[0.75vw]
                                                tracking-wider
                                                text-[var(--color-pink)]
                                                uppercase
                                            ">
                                                {title}
                                            </h1>

                                            <p className="
                                                font-atkinson-regular
                                                text-[12px]
                                                md:text-[0.75vw]
                                                tracking-wider
                                            ">
                                                {value}

                                                {priceAdd > 0 &&
                                                    ` (+$${priceAdd.toFixed(2)})`}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderSummaryItem;