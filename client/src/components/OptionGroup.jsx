const OptionGroup = ({
    title,
    modifierGroup,
    selected,
    setSelected,
    switchProductType,
    isProductType = false
}) => {

    const options = modifierGroup?.choices || [];

    const handleClick = (option) => {

        // TYPE is special:
        // it switches the actual product.
        if (isProductType) {
            switchProductType(option.type);
            return;
        }


        // Normal Square modifier
        const isSelected =
            selected[modifierGroup.listName] === option.name;

        setSelected(prev => ({
            ...prev,
            [modifierGroup.listName]:
                isSelected ? null : option.name
        }));
    };


    const renderOptions = (mobile = false) => (
        <div
            className={
                mobile
                    ? "flex flex-wrap gap-3 mt-2"
                    : "flex flex-wrap gap-[1.6vh] mt-[0.5vw]"
            }
        >

            {options.map(option => {

                let isSelected;

                if (isProductType) {
                    isSelected = selected.TYPE === option.name;
                } else {
                    isSelected = selected[modifierGroup.listName] === option.name;
                }


                return (
                    <div
                        key={option.name}
                        onClick={() => handleClick(option)}
                        className={`border-4 rounded-[10px] text-center py-1 px-3 cursor-pointer transition ${isSelected
                            ? "bg-[var(--color-green)]"
                            : "bg-white"
                            }`}
                        style={{
                            boxShadow:
                                "0px 4px 0px rgba(33, 31, 34, 1)"
                        }}
                    >

                        <p
                            className={
                                mobile
                                    ? "text-[12px]"
                                    : "text-[0.625vw]"
                            }
                        >
                            {option.name}

                            {!isProductType &&
                                parseFloat(option.priceAdd) > 0 &&
                                ` (+$${parseFloat(
                                    option.priceAdd
                                ).toFixed(2)})`
                            }
                        </p>

                    </div>
                );
            })}

        </div>
    );

    const isShippingLater =
        ["physical copies", "save my negatives"].includes(
            title?.trim().toLowerCase()
        );

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:block">

                <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.625vw] tracking-wider mt-5 uppercase">
                    {title}
                    {isShippingLater && " - INVOICE FOR SHIPPING LATER"}
                </h1>

                {renderOptions(false)}

            </div>


            {/* Mobile */}
            <div className="md:hidden">

                <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[12px] tracking-wider mt-5 uppercase">
                    {title}
                    {isShippingLater && " - INVOICE FOR SHIPPING LATER"}
                </h1>

                {renderOptions(true)}

            </div>
        </>
    );
};

export default OptionGroup;