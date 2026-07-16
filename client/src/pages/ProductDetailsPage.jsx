import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HelpfulInformation from '../components/HelpfulInformation';
import OptionGroup from '../components/OptionGroup';
import ItemCounter from '../components/ItemCounter';
import { PRODUCT_CONFIG, TITLE_MAP, OPTION_LABEL_DATA } from '../config/productConfig';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProductDetailsPage = ({ products, merchandiseProducts }) => {
    const { id } = useParams();
    const { addProduct } = useCart();
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState({
        type: OPTION_LABEL_DATA.type[0].id,
        scanType: OPTION_LABEL_DATA.scanType[0].id,
        scanTypeBorder: OPTION_LABEL_DATA.scanTypeBorder[0].id,
        scanSize: OPTION_LABEL_DATA.scanSize[0].id,
        physicalCopies: OPTION_LABEL_DATA.physicalCopies[0].id,
        physicalCopies35mm: OPTION_LABEL_DATA.physicalCopies35mm[0].id,
        saveNegatives: null,
        addOns: OPTION_LABEL_DATA.addOns[0].id,
        pullPush: OPTION_LABEL_DATA.pullPush[0].id,
    });

    // Fetch from API if user refreshed the page (fallback)
    useEffect(() => {
        if (!product) {
            const fetchItemById = async () => {
                const response = await fetch(`${API_BASE_URL}/api/products/get/${id}`);
                const data = await response.json();
                setProduct(data);
            };
            fetchItemById();
        }
    }, [id, product]);


    const getBaseName = (name) => {
        return name.replace(/^Color\s|^B&W\s/, "").trim();
    };

    useEffect(() => {
        if (!product || !products) return;

        const baseName = getBaseName(product.name);

        const targetPrefix = selected.type === "color" ? "Color" : "B&W";

        const matchingProduct = products.find(p =>
            p.name === `${targetPrefix} ${baseName}`
        );

        if (matchingProduct && matchingProduct.id !== product.id) {
            setProduct(matchingProduct);
            navigate(`/products/get/${matchingProduct.id}`);
        }

    }, [selected.type]);

    // identify product type from name to determine which options to show and if any special pricing applies
    const getProductKey = (product) => {
        if (!product?.name) return null;

        const name = product.name.toLowerCase();

        const isColor = name.startsWith("color");

        if (name.includes("aps")) return "aps";
        if (name.includes("110")) return isColor ? "110_color" : "110_bw";
        if (name.includes("120")) return isColor ? "120_color" : "120_bw";
        if (name.includes("disposable")) return isColor ? "disposable_color" : "disposable_bw";
        if (name.includes("35mm")) return isColor ? "35mm_color" : "35mm_bw";

        return null;
    };

    const productKey = getProductKey(product);
    const config = PRODUCT_CONFIG[productKey] || {};
    const optionData = OPTION_LABEL_DATA;


    const calculateUnitPriceAfterModifiers = () => {
        if (!product) return 0;

        const basePrice = parseFloat(product.price) || 0;

        let extra = 0;

        config.groups?.forEach(group => {
            const option = optionData[group]?.find(
                o => o.id === selected[group]
            );
            if (option) extra += option.price || 0;
        });

        return basePrice + extra;
    };

    const calculateLineTotal = () => {
        return calculateUnitPriceAfterModifiers() * quantity;
    };



    if (!product) return <div className="text-center">Loading...</div>;
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
                                onClick={() => {
                                    const modifiers = {};

                                    if (isMerch) {
                                        modifiers.merchandise = "merch";
                                    } else {
                                        config.groups?.forEach(groupKey => {
                                            modifiers[groupKey] = selected[groupKey];
                                        });
                                    }

                                    addProduct({
                                        product_id: id,
                                        name: product.name,
                                        catalogPrice: parseFloat(product.price),
                                        unitPrice: parseFloat(calculateUnitPriceAfterModifiers()),
                                        imageUrl: product.imageUrl,
                                        quantity: quantity,
                                        modifiers,
                                        variation_id: product.variationId
                                    });

                                    setIsAdded(true);
                                    setTimeout(() => setIsAdded(false), 2000);

                                }}
                            >
                                <span className={`font-atkinson-bold ${isAdded ? 'text-[var(--color-blue)]' : 'text-white'}`}>
                                    {isAdded ? "ADDED TO CART " : "ADD TO CART "}
                                </span>
                                <span className={isAdded ? 'text-[var(--color-blue)]' : 'text-white'}>
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
                        {!isMerch &&
                            config.groups?.map(groupKey => (
                                <OptionGroup
                                    key={groupKey}
                                    title={TITLE_MAP[groupKey]}
                                    groupKey={groupKey}
                                    optionData={optionData}
                                    selected={selected}
                                    setSelected={setSelected}
                                    config={config}
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


                {!isMerch && config.groups?.map(groupKey => (
                    <OptionGroup
                        key={groupKey}
                        title={TITLE_MAP[groupKey]}
                        groupKey={groupKey}
                        optionData={optionData}
                        selected={selected}
                        setSelected={setSelected}
                        config={config}
                    />
                ))}


                <HelpfulInformation page="product-details" product={product} />

                <div className="mt-8 flex justify-between mb-8">
                    <button
                        className={`w-[245px] h-[35px] border-4 rounded-[10px] tracking-wider text-[12px] font-atkinson-regular space-x-3 ${isAdded ? 'bg-white' : 'bg-[var(--color-blue)]'}`}
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => {
                            const modifiers = {};

                            if (isMerch) {
                                modifiers.merchandise = "merch";
                            } else {
                                config.groups?.forEach(groupKey => {
                                    modifiers[groupKey] = selected[groupKey];
                                });
                            }

                            addProduct({
                                product_id: id,
                                name: product.name,
                                catalogPrice: parseFloat(product.price),
                                unitPrice: parseFloat(calculateUnitPriceAfterModifiers()),
                                imageUrl: product.imageUrl,
                                quantity: quantity,
                                modifiers,
                                variation_id: product.variationId
                            });

                            setIsAdded(true);
                            setTimeout(() => setIsAdded(false), 2000);

                        }}

                    >
                        <span className={`font-atkinson-bold ${isAdded ? 'text-[var(--color-blue)]' : 'text-white'}`}>{isAdded ? "ADDED TO CART" : "ADD TO CART"}</span>
                        <span className={`${isAdded ? 'text-[var(--color-blue)]' : 'text-white'}`}>${calculateLineTotal().toFixed(2)}</span>
                    </button>
                    <button className='w-[146px] h-[35px] border-4 rounded-[10px] bg-[#CECECE] tracking-wider text-[12px] font-atkinson-regular'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}>Continue Shopping</button>
                </div>

            </div>
        </div>


    )
}

export default ProductDetailsPage;