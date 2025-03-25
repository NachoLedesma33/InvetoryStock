import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              Cart
            </Link>
          </div>

          <div className="mt-8 md:mt-0">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
