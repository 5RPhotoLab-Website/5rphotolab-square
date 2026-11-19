
import {
    requiresShipping,
    SHIPPING_FEE_CENTS
} from "./services/shipping.js";

const merchandiseIds = new Set([
    "TSHIRT_ID",
    "STICKER_ID"
]);

const testCases = [
    {
        name: "Digital scans",
        cart: [{
            product_id: "FILM_ID",
            name: "Film Development",
            modifiers: {}
        }],
        expected: false
    },
    {
        name: "No physical prints",
        cart: [{
            product_id: "FILM_ID",
            name: "Film Development",
            modifiers: {
                "Physical Copies": {
                    name: "No prints, thanks"
                }
            }
        }],
        expected: false
    },
    {
        name: "Save negatives",
        cart: [{
            product_id: "FILM_ID",
            name: "Film Development",
            modifiers: {
                "Save My Negatives": {
                    name: "Yes"
                }
            }
        }],
        expected: true
    },
    {
        name: "Physical prints",
        cart: [{
            product_id: "FILM_ID",
            name: "Film Development",
            modifiers: {
                "Physical Copies": {
                    name: "4x6 Prints"
                }
            }
        }],
        expected: true
    },
    {
        name: "T-shirt",
        cart: [{
            product_id: "TSHIRT_ID",
            name: "T-Shirt",
            modifiers: {}
        }],
        expected: true
    },
    {
        name: "Filmy Sticker",
        cart: [{
            product_id: "STICKER_ID",
            name: "Filmy Sticker",
            modifiers: {}
        }],
        expected: false
    }
];

for (const test of testCases) {
    const required = requiresShipping(
        test.cart,
        merchandiseIds
    );

    const fee = required
        ? SHIPPING_FEE_CENTS / 100
        : 0;

    const passed = required === test.expected;

    console.log(
        `${passed ? "PASS" : "FAIL"} | ${test.name} | Shipping: $${fee.toFixed(2)}`
    );
}
