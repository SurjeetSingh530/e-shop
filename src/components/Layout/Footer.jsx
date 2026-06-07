import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const sections = [
  {
    title: "Shop",
    items: [
      { name: "Categories", link: "/categories" },
      { name: "Products", link: "/" },
      { name: "Deals", link: "/deals" },
      { name: "Shipping", link: "/shipping" },
    ],
  },
  {
    title: "Customer Service",
    items: [
      { name: "FAQs", link: "/" },
      { name: "Contact Us", link: "/contact" },
      { name: "Track Order", link: "/service" },
      { name: "Returns", link: "/service" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About Us", link: "/about" },
      { name: "Careers", link: "/" },
      { name: "Terms of Service", link: "/" },
      { name: "Privacy Policy", link: "/policy" },
    ],
  },
  {
    title: "Help",
    items: [
      { name: "Payment Methods", link: "/" },
      { name: "Order Status", link: "/" },
      { name: "Gift Cards", link: "/" },
      { name: "Size Guide", link: "/" },
    ],
  },
];

const socialMediaLinks = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/" },
  { name: "Email", icon: FaEnvelope, link: "mailto:contact@example.com" },
];

const Footer = () => {
  return (
    <div className="bg-black text-gray-300 px-2">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between border-b-2 border-gray-600 py-4">
        {sections.map((section, index) => (
          <div key={index} className="mx-4">
            <h6 className="font-bold uppercase underline mb-4">
              {section.title}
            </h6>
            <ul>
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="py-1 text-sm text-gray-500 hover:text-white"
                >
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col max-w-7xl px-2 py-4 mx-auto justify-between text-center text-gray-500">
        <p className="pb-4 text-sm">
          © {new Date().getFullYear()} Your Ecommerce Store. All rights
          reserved.
        </p>
        <div className="flex justify-center mx-5 space-x-6">
          {socialMediaLinks.map((link, index) => (
            <a
              href={link.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <link.icon className="text-xl" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
