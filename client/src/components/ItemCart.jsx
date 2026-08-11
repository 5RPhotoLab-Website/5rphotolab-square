import ItemCounter from './ItemCounter';
import deleteIcon from '../assets/itemdetails/deleteIcon.svg';
import { useNavigate } from 'react-router-dom';


const ItemCart = ({ product, addProduct, removeProduct }) => {
    const navigate = useNavigate();
    // This is the total for this specific cart row (ie. unit price (catalogPrice + modifiers) * quantity)
    const lineTotal = (product.unitPrice * product.quantity).toFixed(2);

    // -----------------------------------------
    // MODIFIERS
    // -----------------------------------------
    const modifiers = product.modifiers || {};

    const modifierEntries = Object.entries(modifiers).filter(
        ([key, value]) =>
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "merch"
    );

    return (
        <div className="mt-8">
            <div className="flex justify-between">
                <div className="tracking-wider cursor-pointer" onClick={() => navigate(`/products/get/${product.product_id}`)}>
                    <p className='font-atkinson-bold text-[12px] md:text-[0.625vw]'>{product.name}</p>
                    <p className='font-atkinson-regular text-[12px] md:text-[0.625vw]'>{product.quantity > 1
                        ? `$${(product.catalogPrice)} × ${product.quantity} `
                        : `$${(product.catalogPrice)}`}</p>
                </div>
                <p className="text-[var(--color-pink)] font-atkinson-bold text-[12px] md:text-[0.625vw] tracking-wider">${lineTotal}</p>
            </div>

            <div className='flex mt-3 space-x-7'>
                <div className='flex flex-col items-center -space-y-6'>
                    <img src={product.imageUrl} alt={product.name} className="w-[105px] h-[105px] cursor-pointer" onClick={() => navigate(`/products/get/${product.product_id}`)} />
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
                    {modifierEntries.map(([key, modifier]) => {
                        const value = modifier?.name ?? modifier;
                        const priceAdd = parseFloat(modifier?.priceAdd || 0);

                        let title = key;

                        if (
                            key.trim().toLowerCase() === "physical copies" ||
                            key.trim().toLowerCase() === "save my negatives"
                        ) {
                            title = `${key} - INVOICE LATER`;
                        }

                        return (
                            <div key={key} className="mt-1">

                                <h1 className="font-atkinson-bold text-[12px] md:text-[0.625vw] tracking-wider text-[var(--color-pink)] uppercase">
                                    {title}
                                </h1>

                                <p className="font-atkinson-regular text-[12px] md:text-[0.625vw] tracking-wider">
                                    {value}

                                    {priceAdd > 0 &&
                                        ` (+$${priceAdd.toFixed(2)})`
                                    }
                                </p>

                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <div className='flex justify-end'>
                <img src={deleteIcon} alt="Delete Item" className="w-[12px] h-[13px] mt-2 cursor-pointer" onClick={() => removeProduct(product.product_id, product.modifiers)} />
            </div> */}
        </div>
    )
}

export default ItemCart;

