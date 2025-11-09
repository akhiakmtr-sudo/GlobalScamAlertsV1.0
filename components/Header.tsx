
import React, { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    ...NAV_LINKS.PUBLIC,
    ...(isAuthenticated ? [] : NAV_LINKS.AUTH),
    ...(isAuthenticated ? NAV_LINKS.USER : []),
    ...(isAdmin ? NAV_LINKS.ADMIN : []),
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
          <a href="/#" className="text-2xl font-bold text-primary">Global Scam Alerts</a>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5">
                {user && (
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                )}
                {menuItems.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {link.name}
                  </a>
                ))}
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
