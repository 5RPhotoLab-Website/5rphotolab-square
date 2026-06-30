const ItemCounter = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center space-x-3 mt-10">
        <button
          onClick={onDecrease}
          className="w-[1.198vw] h-[2.2vh] border-2 rounded-[6px] bg-[#EEEDED] flex items-center justify-center cursor-pointer"
        >
          −
        </button>

        <span className="font-atkinson-regular text-[0.625vw]">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          className="w-[1.198vw] h-[2.2vh] border-2 rounded-[6px] bg-[#CECECE] flex items-center justify-center cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center space-x-3 mt-10">
        <button
          onClick={onDecrease}
          className="w-[23px] h-[22px] border-2 rounded-[6px] bg-[#EEEDED] flex items-center justify-center cursor-pointer"
        >
          −
        </button>

        <span className="font-atkinson-regular text-[12px]">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          className="w-[23px] h-[22px] border-2 rounded-[6px] bg-[#CECECE] flex items-center justify-center cursor-pointer"
        >
          +
        </button>
      </div>
    </>
  );
};

export default ItemCounter;
