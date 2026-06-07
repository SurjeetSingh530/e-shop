import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

function Pagenotfound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-8xl font-bold mb-2">404</h1>
        <p className="text-lg mb-6">Page Not Found !!!</p>
        <Link
          to="/"
          className="px-4 py-2 bg-[#00df9a] text-black rounded-lg hover:bg-[#00bf8a] duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </Layout>
  );
}

export default Pagenotfound;
