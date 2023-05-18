import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <h2 className="text-blue-500 font-bold text-lg">
            <strong>Vote It</strong>
          </h2>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <svg
              className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              to="/"
              className="block mt-4 mr-8 lg:inline-block lg:mt-0 text-white-400 mr-4 text-base"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block mt-4 mr-8 lg:inline-block lg:mt-0 text-white-400 mr-4 text-base"
            >
              About Us
            </Link>
            <Link
              to="/all-polls"
              className="block mt-4 mr-8 lg:inline-block lg:mt-0 text-white-400 mr-4 text-base"
            >
              All Polls
            </Link>
            <Link
              to="/create"
              className="block mt-4 mr-8 lg:inline-block lg:mt-0 text-white-400 mr-4 text-base"
            >
              Create Poll
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
