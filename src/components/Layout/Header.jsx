import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // New state to track search status

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    if (searchInput.trim()) {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const products = await response.json();
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchResults(filteredProducts);
        setIsSearching(true); // Update search status
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 5, text: "Categories", link: "/categories" },
    { id: 2, text: "About", link: "/about" },
    { id: 3, text: "Contact", link: "/contact" },
    {
      id: 4,
      text: `Cart [${JSON.parse(localStorage.getItem("cart") || "[]").length}]`,
      link: "/cart",
    },
    { id: 7, text: "Login", link: "/login" },
  ];

  return (
    <>
      <nav className="bg-black flex justify-between items-center h-16 px-2 text-white">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-[#00df9a] mx-1">
            <Link to="/">Eshope</Link>
          </h1>
        </div>
        <div className="flex items-center relative w-full md:w-auto mx-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-80 lg:w-98 px-1.5 py-1.5 rounded-md text-black focus:outline-none"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 text-black bg-white p-0.5 hover:bg-black hover:text-white hover:border rounded-e-lg"
          >
            <BiSearch size={31} />
          </button>
        </div>
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link to={item.link} key={item.id} className="relative">
              <Link
                to={item.link}
                className="hover:bg-[#00df9a] rounded-xl px-4 py-2 cursor-pointer duration-500 hover:text-black"
              >
                {item.text}
              </Link>
            </Link>
          ))}
        </ul>
        <button
          onClick={handleNav}
          className="block md:hidden focus:outline-none"
        >
          {nav ? (
            <AiOutlineClose size={37} className="cursor-pointer text-red-600" />
          ) : (
            <AiOutlineMenu size={37} className="cursor-pointer" />
          )}
        </button>
        <ul
          className={`absolute top-16 my-0.5 left-0 w-60 bg-[#000300] border-r border-gray-900 transform ${
            nav ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-500 md:hidden z-10`}
        >
          {navItems.map((item) => (
            <Link to={item.link} key={item.id}>
              <li className="p-4 border-b rounded-sm border-gray-600 hover:bg-[#00df9a] hover:text-black cursor-pointer duration-300">
                <Link to={item.link}>{item.text}</Link>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="relative mx-5">
        {isSearching ? (
          searchResults.length > 0 ? (
            <div className="absolute top-0 left-0 bg-white text-black w-full rounded-md shadow-lg z-50">
              <ul>
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <Link
                      to={`/single-product/${product.id}`}
                      className="flex items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 mr-2 border p-2"
                      />
                      <span className="text-green-800 ">{product.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="absolute top-0 left-0 bg-white text-black w-full rounded-md shadow-lg p-4 z-50">
              No products found.
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default Header;
