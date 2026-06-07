import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Search = ({ isSearching, searchResults }) => {
  return (
    <Layout>
      <div className="mx-5">
        {isSearching ? (
          searchResults.length > 0 ? (
            <div className="bg-white text-black w-full rounded-md shadow-lg">
              <ul>
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 mr-2"
                      />
                      <span>{product.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white text-black w-full rounded-md shadow-lg p-4">
              No products found.
            </div>
          )
        ) : null}
      </div>
    </Layout>
  );
};

export default Search;
