// Albert Heijn Product Database
const PRODUCTS_DATABASE = {
    "8713800000015": {
        name: "AH Verse melk",
        description: "Volle melk 1 liter",
        price: 1.29,
        image: "🥛",
        category: "Zuivel"
    },
    "8710398230046": {
        name: "AH Brood wit",
        description: "Casino wit brood 800g",
        price: 1.49,
        image: "🍞",
        category: "Brood & Banket"
    },
    "8713800000022": {
        name: "AH Eieren vrije uitloop",
        description: "12 stuks",
        price: 3.29,
        image: "🥚",
        category: "Zuivel"
    },
    "8710398230053": {
        name: "AH Bananen",
        description: "1 kg",
        price: 1.89,
        image: "🍌",
        category: "Groente & Fruit"
    },
    "8713800000039": {
        name: "AH Tomaten",
        description: "500g cherry tomaten",
        price: 2.19,
        image: "🍅",
        category: "Groente & Fruit"
    },
    "8710398230060": {
        name: "AH Kaas jong belegen",
        description: "Plakken 150g",
        price: 2.99,
        image: "🧀",
        category: "Zuivel"
    },
    "8713800000046": {
        name: "AH Koffie",
        description: "Filterkoffie medium roast 500g",
        price: 4.49,
        image: "☕",
        category: "Koffie & Thee"
    },
    "8710398230077": {
        name: "AH Pasta penne",
        description: "500g volkoren",
        price: 1.79,
        image: "🍝",
        category: "Pasta & Rijst"
    },
    "8713800000053": {
        name: "AH Appels",
        description: "Elstar 1kg",
        price: 2.49,
        image: "🍎",
        category: "Groente & Fruit"
    },
    "8710398230084": {
        name: "AH Yoghurt naturel",
        description: "500ml Griekse yoghurt",
        price: 1.89,
        image: "🥛",
        category: "Zuivel"
    },
    "8713800000060": {
        name: "AH Kipfilet",
        description: "Verse kipfilet 300g",
        price: 4.99,
        image: "🐔",
        category: "Vlees & Vis"
    },
    "8710398230091": {
        name: "AH Hagelslag puur",
        description: "380g",
        price: 2.79,
        image: "🍫",
        category: "Beleg"
    },
    "8713800000077": {
        name: "AH Sinaasappels",
        description: "2kg netje",
        price: 3.99,
        image: "🍊",
        category: "Groente & Fruit"
    },
    "8710398230107": {
        name: "AH Roomboter",
        description: "Ongezouten 250g",
        price: 2.49,
        image: "🧈",
        category: "Zuivel"
    },
    "8713800000084": {
        name: "AH Zalm filet",
        description: "Verse zalmfilet 200g",
        price: 6.99,
        image: "🐟",
        category: "Vlees & Vis"
    },
    "8710398230114": {
        name: "AH Cola",
        description: "1.5 liter",
        price: 1.99,
        image: "🥤",
        category: "Frisdrank"
    },
    "8713800000091": {
        name: "AH Wortels",
        description: "1kg gewassen",
        price: 1.39,
        image: "🥕",
        category: "Groente & Fruit"
    },
    "8710398230121": {
        name: "AH Gehakt half om half",
        description: "500g",
        price: 4.29,
        image: "🥩",
        category: "Vlees & Vis"
    },
    "8713800000107": {
        name: "AH Rijst",
        description: "Basmati rijst 1kg",
        price: 3.29,
        image: "🍚",
        category: "Pasta & Rijst"
    },
    "8710398230138": {
        name: "AH Chocolade",
        description: "Melkchocolade 200g",
        price: 2.89,
        image: "🍫",
        category: "Snoep & Koek"
    }
};

// Function to get random products for "Lees van Scanner" feature
function getRandomProducts(count = 8) {
    const productKeys = Object.keys(PRODUCTS_DATABASE);
    const randomProducts = [];
    
    for (let i = 0; i < count; i++) {
        const randomKey = productKeys[Math.floor(Math.random() * productKeys.length)];
        const product = PRODUCTS_DATABASE[randomKey];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 items
        
        randomProducts.push({
            barcode: randomKey,
            ...product,
            quantity: quantity
        });
    }
    
    return randomProducts;
}

// Function to find product by barcode
function findProductByBarcode(barcode) {
    return PRODUCTS_DATABASE[barcode] || null;
}

// Function to search products by name
function searchProductsByName(searchTerm) {
    const results = [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    for (const [barcode, product] of Object.entries(PRODUCTS_DATABASE)) {
        if (product.name.toLowerCase().includes(lowerSearchTerm) || 
            product.description.toLowerCase().includes(lowerSearchTerm)) {
            results.push({
                barcode: barcode,
                ...product
            });
        }
    }
    
    return results;
}

// Function to get all products by category
function getProductsByCategory(category) {
    const results = [];
    
    for (const [barcode, product] of Object.entries(PRODUCTS_DATABASE)) {
        if (product.category === category) {
            results.push({
                barcode: barcode,
                ...product
            });
        }
    }
    
    return results;
}

// Function to get all unique categories
function getAllCategories() {
    const categories = new Set();
    
    for (const product of Object.values(PRODUCTS_DATABASE)) {
        categories.add(product.category);
    }
    
    return Array.from(categories).sort();
}

// Export functions for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTS_DATABASE,
        getRandomProducts,
        findProductByBarcode,
        searchProductsByName,
        getProductsByCategory,
        getAllCategories
    };
}