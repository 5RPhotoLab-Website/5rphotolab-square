// src/config/productConfig.js

export const PRODUCT_CONFIG = {
    "aps": {
        groups: ["scanTypeBorder", "physicalCopies", "saveNegatives"],
        excludeOptions: {
            physicalCopies: ["individualsPrints"],
        },
    },
    "110_color": {
        groups: ["type", "scanTypeBorder", "physicalCopies", "saveNegatives"],
        excludeOptions: {
            physicalCopies: ["individualsPrints"],
        },
    },
    "110_bw": {
        groups: ["type", "scanTypeBorder", "physicalCopies", "saveNegatives"],
        excludeOptions: {
            physicalCopies: ["individualsPrints"],
        },
    },
    "120_color": {
        groups: ["type", "addOns", "saveNegatives"],
    },
    "120_bw": {
        groups: ["type", "pullPush", "addOns", "saveNegatives"],
    },
    "disposable_color": {
        groups: ["type", "scanType", "scanSize", "physicalCopies", "saveNegatives"],
    },
    "disposable_bw": {
        groups: ["type", "scanType", "scanSize", "pullPush", "physicalCopies", "saveNegatives"],
    },
    "35mm_color": {
        groups: ["type", "scanType", "scanSize", "physicalCopies35mm", "saveNegatives"],
    },
    "35mm_bw": {
        groups: ["type", "scanType", "scanSize", "pullPush", "physicalCopies35mm", "saveNegatives"],
    },
    "tote_bag": {
        groups: ["toteBag"],
    },
    "hat": {
        groups: ["hat"],
    },
    "sticker": {
        groups: ["sticker"],
    },
};

export const TITLE_MAP = {
    type: "TYPE",
    scanType: "SCAN TYPE",
    scanTypeBorder: "SCAN TYPE",
    scanSize: "SCAN SIZE",
    physicalCopies: "PHYSICAL COPIES - INVOICE FOR SHIPPING LATER",
    physicalCopies35mm: "PHYSICAL COPIES - INVOICE FOR SHIPPING LATER",
    addOns: "ADD-ONS",
    pullPush: "PULL/PUSH",
    saveNegatives: "SAVE MY NEGATIVES - INVOICE FOR SHIPPING LATER",
    merchandise: ""
};

export const OPTION_LABEL_DATA = {
    type: [
        { id: "color", label: "Color (C-41)", price: 0 },
        { id: "bw", label: "B&W", price: 0 },
    ],
    scanType: [
        { id: "standard", label: "Standard (full-frame)", price: 0 },
        { id: "diptychs", label: "Half-Frame Diptychs", price: 4 },
        { id: "individuals", label: "Half-Frame Individuals", price: 8 },
    ],
    scanTypeBorder: [
        { id: "fullBorder", label: "Full Border", price: 0 },
        { id: "imageOnly", label: "Image Only (no border)", price: 0 },
    ],
    scanSize: [
        { id: "medium", label: "Medium 3130x2075 px", price: 0 },
        { id: "large", label: "Large 6774x4492 px", price: 7 },
        { id: "sprocket", label: "Sprocket Camera Scan 4700x4200 px", price: 15 },
        { id: "largeTiff", label: "Large + 16-Bit Tiff", price: 15 },
    ],
    physicalCopies: [
        { id: "noPrints", label: "No prints, thanks", price: 0 },
        { id: "4x6", label: "4x6 prints", price: 7 },
        { id: "2x4x6", label: "2 x 4x6 prints", price: 14 },
        { id: "individualsPrints", label: "Half-Frame Individuals", price: 14 },
        { id: "printsOnly", label: "Prints only - no scans", price: 4 },
    ],
    physicalCopies35mm: [
        { id: "noPrints", label: "No prints, thanks", price: 0 },
        { id: "4x6", label: "4x6 prints", price: 9 },
        { id: "2x4x6", label: "2 x 4x6 prints", price: 18 },
        { id: "individualsPrints", label: "Half-Frame Individuals", price: 18 },
        { id: "printsOnly", label: "Prints only - no scans", price: 6 },
    ],
    saveNegatives: [
        { id: "yes", label: "Yes", price: 0 },
        { id: "no", label: "No", price: 0 },
    ],
    addOns: [
        { id: "none", label: "No add-ons, thanks!", price: 0 },
        { id: "largeTiff", label: "Large + 16-Bit Tiff", price: 15 },
    ],
    pullPush: [
        { id: "box", label: "Nope! Please process at box speed", price: 0 },
        { id: "pullOne", label: "Pull 1 stop", price: 2 },
        { id: "pullTwo", label: "Pull 2 stops", price: 4 },
        { id: "pullThree", label: "Pull 3 stops", price: 6 },
        { id: "pushOne", label: "Push 1 stop", price: 2 },
        { id: "pushTwo", label: "Push 2 stops", price: 4 },
        { id: "pushThree", label: "Push 3 stops", price: 6 },
    ],
    merchandise: [
        { id: "merch", label: "", price: 0 },
    ],
};