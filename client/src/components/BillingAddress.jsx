import { useEffect, useMemo } from "react";
import { Country, State } from "country-state-city";

const BillingAddress = ({ billing, setBilling, fieldClass }) => {

    const countries = useMemo(() => {
        return Country.getAllCountries();
    }, []);

    const states = useMemo(() => {
        if (!billing.country) return [];

        return State.getStatesOfCountry(billing.country);
    }, [billing.country]);

    const selectedCountry = useMemo(() => {
        return countries.find(
            country => country.isoCode === billing.country
        );
    }, [countries, billing.country]);

    const hasStates = states.length > 0;

    const postalLabel =
        billing.country === "US"
            ? "ZIP"
            : "Postcode";

    const regionLabel =
        billing.country === "US"
            ? "State"
            : billing.country === "CA"
                ? "Province"
                : billing.country === "AU"
                    ? "Territory"
                    : "Region";

    const updateField = (field, value) => {
        setBilling(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Reset state when country changes
    useEffect(() => {
        setBilling(prev => ({
            ...prev,
            state: ""
        }));
    }, [billing.country]);

    return (
        <div className="space-y-6 font-atkinson-regular tracking-widest">
            <h2 className="text-[14px] md:text-[0.875vw] mb-3 ">
                Billing Address
            </h2>

            {/* Country */}
            <select
                value={billing.country}
                onChange={(e) =>
                    updateField("country", e.target.value)
                }
                className={fieldClass(billing.country)}
                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

            >
                <option value="">
                    Select Country
                </option>

                {countries.map(country => (
                    <option
                        key={country.isoCode}
                        value={country.isoCode}
                    >
                        {country.name}
                    </option>
                ))}
            </select>


            {/* Address */}
            <input
                type="text"
                placeholder="Address line 1"
                value={billing.address_line1}
                onChange={(e) =>
                    updateField(
                        "address_line1",
                        e.target.value
                    )
                }
                className={fieldClass(billing.address_line1)}
                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

            />


            {/* Address line 2 */}
            <input
                type="text"
                placeholder="Address line 2 (optional)"
                value={billing.address_line2}
                onChange={(e) =>
                    updateField(
                        "address_line2",
                        e.target.value
                    )
                }
                className="w-[309px] md:w-full h-[35px] md:h-[4vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[12px] md:text-[0.75vw] font-atkinson-regular text-[#9C9C9C] outline-none pl-2 border-gray-300"
                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

            />

            <div className="flex items-center justify-between">
                {/* City */}
                <input
                    type="text"
                    placeholder="City"
                    value={billing.city}
                    onChange={(e) =>
                        updateField(
                            "city",
                            e.target.value
                        )
                    }
                    className={`${fieldClass(billing.city)} !w-[94px] md:!w-[5.875vw]`}
                    style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

                />

                {/* State / Province */}
                {hasStates ? (
                    <select
                        value={billing.state}
                        onChange={(e) =>
                            updateField(
                                "state",
                                e.target.value
                            )
                        }
                        className={`${fieldClass(billing.city)} !w-[94px] md:!w-[5.875vw]`}
                        style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

                    >
                        <option value="">
                            {regionLabel}
                        </option>

                        {states.map(state => (
                            <option
                                key={state.isoCode}
                                value={state.isoCode}
                            >
                                {state.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        placeholder={regionLabel}
                        value={billing.state}
                        onChange={(e) =>
                            updateField(
                                "state",
                                e.target.value
                            )
                        }
                        className={`${fieldClass(billing.city)} !w-[94px] md:!w-[5.875vw]`}
                        style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

                    />
                )}

                {/* Postal Code */}
                <input
                    type="text"
                    inputMode="text"
                    autoComplete="postal-code"
                    placeholder={postalLabel}
                    value={billing.zip}
                    onChange={(e) =>
                        updateField(
                            "zip",
                            e.target.value
                        )
                    }
                    className={`${fieldClass(billing.city)} !w-[94px] md:!w-[5.875vw]`}
                    style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}

                />
            </div>

        </div>
    );
};

export default BillingAddress;