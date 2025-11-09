
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</p>
      <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
      <a href="/#" className="mt-6 inline-block bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
