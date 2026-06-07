import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce App"}>
      <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6">
        <div className="w-full md:w-1/2 p-4">
          <img
            src="/images/about.jpeg"
            alt="about us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to our e-commerce platform, where we strive to provide the
            best products and services to our valued customers. Our journey
            started with a simple idea: to make shopping easier and more
            enjoyable. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ducimus officiis obcaecati esse tempore unde ratione, eveniet
            mollitia, perferendis eius temporibus dicta blanditiis doloremque
            explicabo quasi sunt vero optio cum aperiam vel consectetur! Laborum
            enim accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to offer a seamless shopping experience with a wide
            range of products at competitive prices. We are committed to
            quality, customer satisfaction, and continuous improvement. Thank
            you for choosing our platform, and we look forward to serving you.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 mt-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-red-500">
          Our History
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Over the years, we have undertaken numerous projects aimed at
          enhancing our platform and expanding our offerings. Here are some of
          the key milestones in our journey:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>
            <span className="font-semibold">2015:</span> Launched our first
            e-commerce platform, providing a basic range of products and
            services.
          </li>
          <li>
            <span className="font-semibold">2017:</span> Expanded our product
            categories and introduced international shipping.
          </li>
          <li>
            <span className="font-semibold">2019:</span> Implemented advanced
            analytics to better understand customer preferences and improve our
            offerings.
          </li>
          <li>
            <span className="font-semibold">2020:</span> Launched a mobile app
            to provide a seamless shopping experience on the go.
          </li>
          <li>
            <span className="font-semibold">2021:</span> Partnered with major
            brands to bring exclusive deals and products to our platform.
          </li>
          <li>
            <span className="font-semibold">2023:</span> Upgraded our platform
            with cutting-edge technologies to enhance performance and security.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          We are constantly working on new projects and improvements to ensure
          that our customers have the best shopping experience possible. Stay
          tuned for more exciting updates!
        </p>
      </div>
    </Layout>
  );
};

export default About;
