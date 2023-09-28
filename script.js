document.addEventListener("DOMContentLoaded", function () {
    // Sample furniture data (you can replace this with actual data)
    const furnitureData = [
        { name: "Chair 1", category: "chairs", price: 100, color: "white", reviews: 4 },
        { name: "Chair 2", category: "chairs", price: 120, color: "black", reviews: 4.5 },
        { name: "Table 1", category: "tables", price: 200, color: "brown", reviews: 3.5 },
        // Add more furniture items
    ];

    const categorySelect = document.getElementById("category");
    const colorSelect = document.getElementById("color");
    const priceRange = document.getElementById("price");
    const reviewsSelect = document.getElementById("reviews");
    const productsContainer = document.getElementById("products");

    // Event listeners for filters
    categorySelect.addEventListener("change", updateProducts);
    colorSelect.addEventListener("change", updateProducts);
    priceRange.addEventListener("change", updateProducts);
    reviewsSelect.addEventListener("change", updateProducts);

    // Initial product list
    updateProducts();

    function updateProducts() {
        const selectedCategory = categorySelect.value;
        const selectedColor = colorSelect.value;
        const priceRangeValue = priceRange.value;
        const minReviews = parseFloat(reviewsSelect.value);

        // Filter the furniture data based on selected filters
        const filteredProducts = furnitureData.filter(product => {
            return (selectedCategory === "all" || product.category === selectedCategory) &&
                (selectedColor === "all" || product.color === selectedColor) &&
                (isPriceInRange(product.price, priceRangeValue)) &&
                (product.reviews >= minReviews);
        });

        displayProducts(filteredProducts);
    }

    function displayProducts(products) {
        productsContainer.innerHTML = "";

        if (products.length === 0) {
            productsContainer.innerHTML = "<p>No products match the selected filters.</p>";
            return;
        }

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Color: {product.color}</p>
                <p>Price: {product.price}</p>
                <p>Reviews:  {product.reviews}</p>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    // Helper function to check if a price is in the specified range
    function isPriceInRange(price, range) {
        const [min, max] = range.split("-").map(parseFloat);
        if (isNaN(min) || isNaN(max)) {
            return true; // If the range is not valid, include the item
        }
        return price >= min && price <= max;
    }
});

