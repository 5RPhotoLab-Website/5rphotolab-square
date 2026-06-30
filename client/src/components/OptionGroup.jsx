const OptionGroup = ({ title, groupKey, optionData, selected, setSelected, config }) => {
    const options = optionData[groupKey] || [];

    const filteredOptions = config?.excludeOptions?.[groupKey]
        ? options.filter(
            o => !config.excludeOptions[groupKey].includes(o.id)
        )
        : options;


    return (
        <>
            {/* Desktop */}
            <div className="hidden md:block">
                <h1 className='font-atkinson-bold text-[var(--color-pink)] text-[0.625vw] tracking-wider mt-5'>
                    {title}
                </h1>

                <div className='flex flex-wrap gap-[1.6vh] mt-[0.5vw]'>
                    {filteredOptions.map(option => (
                        <div
                            key={option.id}
                            onClick={() => {
                                if (groupKey === "saveNegatives") {
                                    setSelected(prev => ({
                                        ...prev,
                                        [groupKey]:
                                            prev[groupKey] === option.id
                                                ? null
                                                : option.id
                                    }));
                                } else {
                                    setSelected(prev => ({
                                        ...prev,
                                        [groupKey]: option.id
                                    }));
                                }
                            }}
                            className={`border-4 rounded-[10px] text-center py-1 px-3 cursor-pointer transition
                            ${selected[groupKey] === option.id
                                    ? "bg-[var(--color-green)]"
                                    : "bg-white"
                                }
                        `}
                            style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        >
                            <p className='text-[0.625vw]'>
                                {option.label}
                                {option.price > 0 && ` (+$${option.price.toFixed(2)})`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden">
                <h1 className='font-atkinson-bold text-[var(--color-pink)] text-[12px] tracking-wider mt-5'>
                    {title}
                </h1>

                <div className='flex flex-wrap gap-3 mt-2'>
                    {filteredOptions.map(option => (
                        <div
                            key={option.id}
                            onClick={() => {
                                if (groupKey === "saveNegatives") {
                                    setSelected(prev => ({
                                        ...prev,
                                        [groupKey]:
                                            prev[groupKey] === option.id
                                                ? null
                                                : option.id
                                    }));
                                } else {
                                    setSelected(prev => ({
                                        ...prev,
                                        [groupKey]: option.id
                                    }));
                                }
                            }}
                            className={`border-4 rounded-[10px] text-center py-1 px-3 cursor-pointer transition
                            ${selected[groupKey] === option.id
                                    ? "bg-[var(--color-green)]"
                                    : "bg-white"
                                }
                        `}
                            style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        >
                            <p className='text-[12px]'>
                                {option.label}
                                {option.price > 0 && ` (+$${option.price.toFixed(2)})`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default OptionGroup;