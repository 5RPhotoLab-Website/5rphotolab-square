import ItemCounter from './ItemCounter';
import deleteIcon from '../assets/itemdetails/deleteIcon.svg';
import { useNavigate } from 'react-router-dom';
import { TITLE_MAP, OPTION_LABEL_DATA } from '../config/productConfig';


const ItemCart = ({ product, addProduct, removeProduct }) => {
    const navigate = useNavigate();
    // This is the total for this specific cart row (ie. unit price (catalogPrice + modifiers) * quantity)
    const lineTotal = (product.unitPrice * product.quantity).toFixed(2);

    return (
        <div className="mt-8">
            <div className="flex justify-between">
                <div className="tracking-wider cursor-pointer" onClick={() => navigate(`/products/get/${product.product_id}`)}>
                    <p className='font-atkinson-bold text-[12px] md:text-[0.625vw]'>{product.name}</p>
                    <p className='font-atkinson-regular text-[12px] md:text-[0.625vw]'>{product.quantity > 1
                        ? `$${(product.catalogPrice).toFixed(2)} × ${product.quantity} `
                        : `$${(product.catalogPrice).toFixed(2)}`}</p>
                </div>
                <p className="text-[var(--color-pink)] font-atkinson-bold text-[12px] md:text-[0.625vw] tracking-wider">${lineTotal}</p>
            </div>

            <div className='flex mt-3 space-x-7'>
                <div className='flex flex-col items-center -space-y-6'>
                    <img src={product.imageUrl} alt={product.imageUrl} className="w-[105px] h-[105px] cursor-pointer" onClick={() => navigate(`/products/get/${product.product_id}`)} />
                    <ItemCounter
                        quantity={product.quantity}
                        onIncrease={() =>
                            addProduct({ ...product, quantity: 1 })
                        }
                        onDecrease={() =>
                            addProduct({ ...product, quantity: -1 })
                        }
                    />
                </div>

                <div className='flex flex-col'>
                    {Object.keys(TITLE_MAP)
                        .filter(key => product.modifiers?.[key] !== undefined && key !== "type")
                        .map((key) => {
                            // 1. Get the ID stored in the cart (e.g., "medium")
                            const selectedId = product.modifiers[key] || "N/A";

                            // 2. Find the corresponding label object in your export data
                            const optionData = OPTION_LABEL_DATA[key]?.find(opt => opt.id === selectedId);

                            let title = TITLE_MAP[key] || key;
                            title = title.replace(" FOR SHIPPING", "");

                            const isMerch = product.modifiers[key] === "merch";

                            return (
                                <div key={key} className='mt-1'>
                                    <h1 className='font-atkinson-bold text-[12px] md:text-[0.625vw] tracking-wider text-[var(--color-pink)] uppercase'>
                                        {isMerch ? product.name : title}
                                    </h1>
                                    <p className='font-atkinson-regular text-[12px] md:text-[0.625vw] tracking-wider'>
                                        {/* 3. Display the label if found, otherwise fallback to the ID */}
                                        {optionData ? `${optionData.label} ${optionData.price > 0 ? ` (+$${optionData.price.toFixed(2)})` : ''}` : selectedId}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className='flex justify-end'>
                <img src={deleteIcon} alt="Delete Item" className="w-[12px] h-[13px] mt-2 cursor-pointer" onClick={() => removeProduct(product.product_id, product.modifiers)} />
            </div>
        </div>
    )
}

export default ItemCart;