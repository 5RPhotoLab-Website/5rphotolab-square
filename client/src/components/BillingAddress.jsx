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
            ? "ZIP Code"
            : billing.country === "GB"
                ? "Postcode"
                : "Postal Code";

    const regionLabel =
        billing.country === "US"
            ? "State"
            : billing.country === "CA"
                ? "Province"
                : billing.country === "AU"
                    ? "State / Territory"
                    : "State / Province / Region";

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
        <div className="space-y-3 mt-4">
            <h2 className="text-[14px] font-semibold mb-2">
                Billing Address
            </h2>

            {/* Country */}
            <select
                value={billing.country}
                onChange={(e) =>
                    updateField("country", e.target.value)
                }
                className={fieldClass(billing.country)}
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
                className="border rounded-xl p-3 w-full"
            />


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
                className={fieldClass(billing.city)}
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
                    className={fieldClass(billing.state)}
                >
                    <option value="">
                        Select {regionLabel}
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
                    className={fieldClass(billing.state)}
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
                className={fieldClass(billing.zip)}
            />

        </div>
    );
};

export default BillingAddress;