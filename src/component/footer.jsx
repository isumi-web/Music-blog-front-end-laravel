import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-blue-900">
      <div className="container px-4 mx-auto text-center">
      
        <p className="mb-4 text-sm md:text-base">
          Welcome to Entertainment World, your gateway to a universe of endless fun and excitement. Discover, explore, and enjoy!
        </p>

       
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm md:text-base">
            Email: <a href="mailto:isumiaranika@gmail.com" className="underline">isumiaranika@gmail.com</a>
          </p>
          <p className="text-sm md:text-base">
            Contact: 071-9329085
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
