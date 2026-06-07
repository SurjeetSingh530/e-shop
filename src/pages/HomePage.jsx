import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import backgroundImage from "../styles/bg-img/3.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoriesResponse = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        const categoriesData = categoriesResponse.data;
        setCategories(categoriesData);

        const productsByCategoryData = {};

        await Promise.all(
          categoriesData.map(async (category) => {
            const productsResponse = await axios.get(
              `https://fakestoreapi.com/products/category/${category}`
            );
            productsByCategoryData[category] = productsResponse.data;
          })
        );

        setProductsByCategory(productsByCategoryData);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Background Image with Overlay */}
      <div
        className="relative h-screen flex flex-col justify-center items-center text-white bg-cover bg-center "
        style={{
          backgroundImage: `url(${backgroundImage})`,

          backgroundRepeat: "no-repeat", // Prevent image repetition
          width: "100%", // Ensure the image covers the entire container
          height: "90vh", // Adjust the height as per your requirement
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center sm:p-2">
          <h1 className="text-5xl text-red-300 font-bold my-6">
            Welcome to Our E-commerce Store
          </h1>
          <p className="text-xl font-bold mb-4">
            Find the best deals on your favorite products
          </p>
          <Link
            to="categories"
            className="bg-blue-900 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-1 py-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-3xl font-bold mb-8 mt-2 capitalize p-5 bg-green-900 rounded text-white">
              Products in {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
              {productsByCategory[category]?.slice(0, 4).map((product) => (
                <Link
                  to={`single-product/${product.id}`}
                  key={product.id}
                  className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 flex flex-col"
                >
                  <img
                    className="w-full h-64 sm:h-56 md:h-64 lg:h-80 object-cover"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold mb-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {product.description.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
