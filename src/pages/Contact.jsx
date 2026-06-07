import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Contact = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataJson = Object.fromEntries(formData.entries());

    try {
      setSubmissionStatus("pending");

      const response = await axios.post("your-api-endpoint", formDataJson);

      if (response.status === 200) {
        setSubmissionStatus("success");
        toast.success("Message sent successfully!");
      } else {
        setSubmissionStatus("error");
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmissionStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title={"Contact us"}>
      <div className="flex flex-col md:flex-row items-center justify-center py-10 bg-gray-100">
        {/* Image Section */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <img
            src="/images/contactus.jpeg"
            alt="contact us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Contact Information Section */}
        <div className="w-full md:w-1/3 px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            CONTACT US
          </h1>
          <p className="text-gray-700 mb-6 text-justify">
            For any queries and information about our products, feel free to
            call us anytime. We are available 24/7.
          </p>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center">
              <BiMailSend className="mr-2 text-xl" /> www.help@ecommerceapp.com
            </p>
            <p className="flex items-center">
              <BiPhoneCall className="mr-2 text-xl" /> +91 9506061859
            </p>
            <p className="flex items-center">
              <BiSupport className="mr-2 text-xl" /> 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="flex justify-center items-center h-50 bg-white">
        <div className="w-full max-w-lg p-8 bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={submissionStatus === "pending"}
              >
                {submissionStatus === "pending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {submissionStatus === "success" && (
            <p className="text-green-500 text-center">
              Message sent successfully!
            </p>
          )}
          {submissionStatus === "error" && (
            <p className="text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Contact;
