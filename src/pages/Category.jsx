import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch all products by default
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

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
      const response = await fetch(`${url}?sort=${sortOrder}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      fetchProducts(); // Fetch all products
    } else {
      fetchProducts(category);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    fetchProducts(selectedCategory);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-3xl font-bold mb-4">Categories</h2>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryClick("")}
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                selectedCategory === "" ? "bg-blue-700" : ""
              }`}
            >
              All Products
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  selectedCategory === category ? "bg-blue-700" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-4 mt-8">Sort By</h2>
          <div className="space-y-2">
            <button
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                sortOrder === "asc" ? "bg-blue-700" : ""
              }`}
              onClick={() => handleSort("asc")}
            >
              Price Low to High
            </button>
            <button
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                sortOrder === "desc" ? "bg-blue-700" : ""
              }`}
              onClick={() => handleSort("desc")}
            >
              Price High to Low
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          {selectedCategory ? (
            <div>
              <h3 className="text-2xl font-bold mt-8">
                Products in {selectedCategory}
              </h3>
            </div>
          ) : (
            <h2 className="text-3xl font-bold mb-4">All Products</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            {products.map((product, index) => (
              <Link to={`/single-product/${product.id}`} key={index}>
                <div className="rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-xl font-bold mb-2">{product.title}</h5>
                    <p className="text-gray-700">${product.price}</p>
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
