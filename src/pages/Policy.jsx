import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

function Policy() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose">
          <div className="mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Section 1
            </button>
            {isOpen && (
              <div className="py-2 px-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris nec nibh eu odio ultricies fringilla.
                </p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <button
              onClick={toggleAccordion}
              className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Section 2
            </button>
            {isOpen && (
              <div className="py-2 px-4">
                <p>
                  Sed lobortis congue sem, et dapibus tortor condimentum nec.
                  Proin faucibus justo quis turpis fringilla.
                </p>
              </div>
            )}
          </div>
          {/* Add more sections as needed */}
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
