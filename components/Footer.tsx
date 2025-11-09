
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-t-sm mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Global Scam Alerts. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
