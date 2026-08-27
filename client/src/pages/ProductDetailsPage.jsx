import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HelpfulInformation from '../components/HelpfulInformation';
import OptionGroup from '../components/OptionGroup';
import ItemCounter from '../components/ItemCounter';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDetailsPage = ({ products, merchandiseProducts }) => {
    const { id } = useParams();
    const { addProduct } = useCart();
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState({});


    // -----------------------------------------
    // FETCH PRODUCT
    // -----------------------------------------
    useEffect(() => {
        const fetchProduct = async () => {
            setProduct(null);
            const response = await fetch(
                `${API_BASE_URL}/api/products/get/${id}`
            );
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    // -----------------------------------------
    // DETERMINE PRODUCT TYPE FROM NAME
    // -----------------------------------------
    const productType = product?.name?.startsWith("Color ")
        ? "color"
        : product?.name?.startsWith("B&W ")
            ? "bw"
            : null;

    // -----------------------------------------
    // HARD-CODED TYPE GROUP
    // -----------------------------------------
    const typeGroup = {
        listName: "TYPE",
        type: "productType",
        choices: [
            {
                name: "Color (C-41)",
                type: "color",
                priceAdd: "0.00"
            },
            {
                name: "B&W",
                type: "bw",
                priceAdd: "0.00"
            }
        ]
    };

    // -----------------------------------------
    // BASE PRODUCT NAME
    // -----------------------------------------
    const getBaseName = (name) => {
        return name.replace(/^Color\s|^B&W\s/, "").trim();
    };

    // -----------------------------------------
    // SWITCH COLOR / B&W PRODUCT
    // -----------------------------------------
    const switchProductType = (type) => {
        if (!product || !products) return;

        const baseName = getBaseName(product.name);

        const prefix = type === "color"
            ? "Color"
            : "B&W";

        const matchingProduct = products.find(
            p => p.name === `${prefix} ${baseName}`
        );

        if (!matchingProduct) {
            return;
        }

        navigate(`/products/get/${matchingProduct.id}`);
    };


    // -----------------------------------------
    // INITIALIZE SQUARE MODIFIERS
    // -----------------------------------------
    useEffect(() => {
        if (!product) return;

        const initial = {};

        product.modifiers?.forEach(group => {
            initial[group.listName] =
                group.choices?.[0]?.name ?? null;
        });

        // TYPE is based on the product name
        if (productType) {
            initial.TYPE =
                productType === "color"
                    ? "Color (C-41)"
                    : "B&W";
        }

        setSelected(initial);

    }, [product, productType]);


    // -----------------------------------------
    // PRICE
    // -----------------------------------------
    const calculateUnitPriceAfterModifiers = () => {
        if (!product) return 0;

        let total = parseFloat(product.price) || 0;

        product.modifiers?.forEach(group => {
            const selectedName = selected[group.listName];

            const choice = group.choices.find(
                choice => choice.name === selectedName
            );

            if (choice) {
                total += parseFloat(choice.priceAdd) || 0;
            }
        });

        return total;
    };

    const calculateLineTotal = () => {
        return calculateUnitPriceAfterModifiers() * quantity;
    };

    // -----------------------------------------
    // ADD TO CART
    // -----------------------------------------
    const handleAddToCart = () => {
        if (!product) return;

        // Build modifiers from the currently selected options.
        const modifiers = {};

        product.modifiers?.forEach((group) => {
            const selectedName = selected[group.listName];

            if (!selectedName) return;

            const selectedChoice = group.choices?.find(
                (choice) => choice.name === selectedName
            );

            if (!selectedChoice) return;

            modifiers[group.listName] = {
                modifierListId: group.modifierListId,
                modifierId: selectedChoice.id,
                name: selectedChoice.name,
                priceAdd: parseFloat(selectedChoice.priceAdd || 0),
            };
        });

        const unitPrice = calculateUnitPriceAfterModifiers();
        const lineTotal = unitPrice * quantity;

        const cartProduct = {
            product_id: product.id,
            name: product.name,
            catalogPrice: parseFloat(product.price) || 0,
            unitPrice: unitPrice.toFixed(2),
            imageUrl: product.imageUrl,
            quantity,
            modifiers,
            variation_id: product.variationId,
        };

        // Add to your actual cart
        addProduct(cartProduct);

        // ==========================================
        // META PIXEL - ADD TO CART
        // ==========================================
        if (typeof window.fbq === "function") {
            window.fbq("track", "AddToCart", {
                content_ids: [
                    String(product.variationId)
                ],
                content_name: product.name,
                content_type: "product",
                value: lineTotal.toFixed(2),
                currency: "USD",
            });
        }

        // ==========================================
        // GOOGLE - ADD TO CART
        // ==========================================
        if (typeof window.gtag === "function") {
            window.gtag("event", "add_to_cart", {
                currency: "USD",
                value: lineTotal.toFixed(2),
                items: [
                    {
                        item_id: String(product.variationId),
                        item_name: product.name,
                        price: unitPrice,
                        quantity,
                    }
                ]
            });
        }

        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };


    if (!product) return <div className="text-center p-30">Loading...</div>;
    const isMerch = merchandiseProducts?.some(m => m.id === product.id);


    return (
        <div className="bg-[#F5F5F5]">
            {/* Desktop */}
            <div className="hidden md:flex justify-center w-full px-6 pb-[25vh]">
                <div className="max-w-[62.5vw] grid grid-cols-2 gap-[12vw] items-start">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col">
                        <div className="flex relative space-x-5 mt-8">
                            <img src={product.imageUrl} alt="" className="w-[11vw] h-[20vh]" />

                            <div className="flex flex-col">
                                <p className="font-atkinson-bold text-[1vw] tracking-wider">
                                    {product.name}
                                </p>
                                <p className="font-atkinson-regular text-[0.7vw] tracking-wider mt-4">
                                    ${product.price}
                                </p>

                                <ItemCounter
                                    quantity={quantity}
                                    onIncrease={() => setQuantity((prev) => prev + 1)}
                                    onDecrease={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button
                                className={`w-[13vw] h-[4vh] border-4 rounded-[10px] tracking-wider text-[0.625vw] font-atkinson-regular cursor-pointer ${isAdded ? "bg-white" : "bg-[var(--color-blue)]"}`}
                                style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                                onClick={handleAddToCart}
                            >
                                <span className={`font-atkinson-bold ${isAdded ? 'text-[var(--color-blue)]' : 'text-black'}`}>
                                    {isAdded ? "ADDED TO CART " : "ADD TO CART "}
                                </span>
                                <span className={isAdded ? 'text-[var(--color-blue)]' : 'text-black'}>
                                    ${calculateLineTotal().toFixed(2)}
                                </span>
                            </button>

                            <button
                                className="w-[8vw] h-[4vh] border-4 rounded-[10px] bg-[#CECECE] tracking-wider text-[0.625vw] font-atkinson-regular cursor-pointer"
                                style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                                onClick={() => navigate('/mail-in')}
                            >
                                Continue Shopping
                            </button>
                        </div>

                        <div className="w-full mt-8">
                            <HelpfulInformation page="product-details" product={product} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col">
                        {productType && (
                            <OptionGroup
                                key="TYPE"
                                title="TYPE"
                                modifierGroup={typeGroup}
                                selected={selected}
                                setSelected={setSelected}
                                switchProductType={switchProductType}
                                isProductType={true}
                            />
                        )}
                        {product.modifiers?.map((modifierGroup) => (
                            <OptionGroup
                                key={modifierGroup.listName}
                                title={modifierGroup.listName}
                                modifierGroup={modifierGroup}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ))}
                    </div>

                </div>
            </div>



            {/* Mobile */}
            <div className="md:hidden p-4">
                <div className='flex relative space-x-5 mt-8'>
                    <img src={product.imageUrl} alt="" className='w-[192px] h-[192px]' />
                    <div className='flex flex-col'>
                        <p className='font-atkinson-bold text-[16px] tracking-wider'>{product.name}</p>
                        <p className='font-atkinson-regular text-[12px] tracking-wider mt-4'>${product.price}</p>
                        <ItemCounter
                            quantity={quantity}
                            onIncrease={() => setQuantity((prev) => prev + 1)}
                            onDecrease={() =>
                                setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                            }
                        />
                    </div>
                </div>


                {productType && (
                    <OptionGroup
                        key="TYPE"
                        title="TYPE"
                        modifierGroup={typeGroup}
                        selected={selected}
                        setSelected={setSelected}
                        switchProductType={switchProductType}
                        isProductType={true}
                    />
                )}
                {product.modifiers?.map((modifierGroup) => (
                    <OptionGroup
                        key={modifierGroup.listName}
                        title={modifierGroup.listName}
                        modifierGroup={modifierGroup}
                        selected={selected}
                        setSelected={setSelected}
                    />
                ))}


                <HelpfulInformation page="product-details" product={product} />

                <div className="mt-8 flex justify-between mb-8">
                    <button
                        className={`w-[55vw] h-[35px] border-4 rounded-[10px] tracking-wider text-[12px] font-atkinson-regular space-x-3 ${isAdded ? 'bg-white' : 'bg-[var(--color-blue)]'}`}
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={handleAddToCart}
                    >
                        <span className={`font-atkinson-bold ${isAdded ? 'text-[var(--color-blue)]' : 'text-black'}`}>{isAdded ? "ADDED TO CART" : "ADD TO CART"}</span>
                        <span className={`${isAdded ? 'text-[var(--color-blue)]' : 'text-black'}`}>${calculateLineTotal().toFixed(2)}</span>
                    </button>
                    <button className='w-[33vw] h-[35px] border-4 rounded-[10px] bg-[#CECECE] tracking-wider text-[12px] font-atkinson-regular'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}>Continue Shopping</button>
                </div>

            </div>
        </div>


    )
}

export default ProductDetailsPage;