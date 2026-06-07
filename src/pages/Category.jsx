import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (category = "") => {
    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";

      const response = await fetch(url);
      const data = await response.json();

      // Sort products by price
      const sortedProducts = [...data].sort((a, b) =>
        sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, sortOrder]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-3xl font-bold mb-4">Categories</h2>

          <div className="space-y-2">
            <button
              onClick={() => handleCategoryClick("")}
              className={`w-full text-white font-bold py-2 px-4 rounded ${
                selectedCategory === ""
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              All Products
            </button>

            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`w-full text-white font-bold py-2 px-4 rounded ${
                  selectedCategory === category
                    ? "bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-4 mt-8">Sort By</h2>

          <div className="space-y-2">
            <button
              onClick={() => handleSort("asc")}
              className={`w-full text-white font-bold py-2 px-4 rounded ${
                sortOrder === "asc"
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Price Low to High
            </button>

            <button
              onClick={() => handleSort("desc")}
              className={`w-full text-white font-bold py-2 px-4 rounded ${
                sortOrder === "desc"
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Price High to Low
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="w-full md:w-3/4">
          {selectedCategory ? (
            <h2 className="text-3xl font-bold mb-4">
              Products in {selectedCategory}
            </h2>
          ) : (
            <h2 className="text-3xl font-bold mb-4">
              All Products
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/single-product/${product.id}`}
              >
                <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain p-4"
                  />

                  <div className="p-4">
                    <h5 className="text-lg font-bold mb-2 line-clamp-2">
                      {product.title}
                    </h5>

                    <p className="text-gray-700 font-semibold">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Category;