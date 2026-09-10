const ItemCounter = ({ quantity, onIncrease, onDecrease, disabled = false }) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center space-x-3 mt-10">
        <button
          onClick={onDecrease}
          className="w-[1.5vw] h-[2.5vh] border-2 rounded-[6px] bg-[#EEEDED] flex items-center justify-center cursor-pointer"
          style={{ boxShadow: "0px 2px 0px rgba(0, 0, 0, 1)" }}
        >
          <span className="font-atkinson-regular text-[0.8vw]">-</span>
        </button>

        <span className="font-atkinson-regular text-[0.8vw]">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          // disabled={disabled}
          className="w-[1.5vw] h-[2.5vh] border-2 rounded-[6px] bg-[#CECECE] flex items-center justify-center cursor-pointer"
          style={{ boxShadow: "0px 2px 0px rgba(0, 0, 0, 1)" }}
        >
          <span className="font-atkinson-regular text-[0.8vw]">+</span>
        </button>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center space-x-3 mt-10">
        <button
          onClick={onDecrease}
          className="w-[23px] h-[22px] border-2 rounded-[6px] bg-[#EEEDED] flex items-center justify-center cursor-pointer"
          style={{ boxShadow: "0px 2px 0px rgba(0, 0, 0, 1)" }}
        >
          <span className="font-atkinson-regular text-[12px]">-</span>
        </button>

        <span className="font-atkinson-regular text-[12px]">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          // disabled={disabled}
          className="w-[23px] h-[22px] border-2 rounded-[6px] bg-[#CECECE] flex items-center justify-center cursor-pointer"
          style={{ boxShadow: "0px 2px 0px rgba(0, 0, 0, 1)" }}
        >
          <span className="font-atkinson-regular text-[12px]">+</span>
        </button>
      </div>
    </>
  );
};

export default ItemCounter;
