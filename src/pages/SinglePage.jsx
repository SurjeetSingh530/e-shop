import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";

function SinglePage() {
  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false); // State for toast message
  const { id } = useParams(); // Extract id parameter from URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    // Clean up effect
    return () => setProduct(null);
  }, [id]);

  const handleAddToCart = () => {
    // Get cart items from localStorage or initialize as an empty array
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (!isProductInCart) {
      // Add the product to cart
      cartItems.push({ ...product, quantity: 1 });
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      // Inform user that the item is added to cart
      setShowToast(true);
      // Hide toast message after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    } else {
      // If product is already in the cart, inform the user
      alert("Product is already in the cart!");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={index}
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.775 1.4 8.165L12 18.896l-7.334 3.865 1.4-8.165L.132 9.211l8.2-1.193L12 .587z" />
          </svg>
        ))}
        {halfStar && (
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 18.896l7.334 3.865-1.4-8.165 5.934-5.775-8.2-1.193L12 .587V18.896z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={index}
            className="w-6 h-6 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.775 1.4 8.165L12 18.896l-7.334 3.865 1.4-8.165L.132 9.211l8.2-1.193L12 .587z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Toast Message */}
      {showToast && (
        <div className=" fixed  text-center font-bold  top-20 right-0 mt-4 mr-4 bg-green-500 text-white py-2 px-8 rounded">
          Product added to cart!
        </div>
      )}
      {/* Product Details */}
      {product ? (
        <div className="container mx-auto p-8 top-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover md:w-96 p-6"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {product.category}
                </div>
                <h2 className="text-4xl font-bold mt-2">{product.title}</h2>
                <p className="mt-2 text-gray-700 text-2xl">${product.price}</p>
                <p className="mt-4 text-gray-600">{product.description}</p>
                <div className="mt-6 flex ">
                  <button
                    onClick={handleAddToCart}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to="/buy-product"
                    className="bg-red-500 text-white px-6 py-3 mx-5 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Buy Now
                  </Link>
                  <Link
                    to="/cart"
                    onClick={handleAddToCart}
                    className="bg-red-500 text-white px-6 py-3 mx-5 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Go to Cart
                  </Link>
                </div>

                <div className="mt-4">
                  <p className="text-lg text-gray-700">
                    Rating: {product.rating.rate}{" "}
                    {renderStars(product.rating.rate)}( {product.rating.count} -
                    Reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-8 text-xl">Loading...</p>
      )}
    </Layout>
  );
}

export default SinglePage;
