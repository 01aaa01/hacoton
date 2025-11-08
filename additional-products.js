// Add 85 more products
const additionalProducts = [
    // More Electronics
    {
        id: 16,
        name: "Dell XPS 15",
        price: 1899.99,
        image: "https://m.media-amazon.com/images/I/71h4U6RqqYL._AC_SL1500_.jpg",
        description: "15.6-inch 4K OLED display, Intel i9, 32GB RAM",
        category: "electronics"
    },
    {
        id: 17,
        name: "iPad Air",
        price: 599.99,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1645065732688",
        description: "M1 chip, 10.9-inch Liquid Retina display",
        category: "electronics"
    },
    // Add Fashion items
    {
        id: 18,
        name: "Designer Leather Wallet",
        price: 129.99,
        image: "https://m.media-amazon.com/images/I/71cSaFnaxpL._AC_UY695_.jpg",
        description: "Genuine leather with RFID blocking",
        category: "fashion"
    },
    // Continue adding more products...
];

// Append new products to the existing array
products.push(...additionalProducts);