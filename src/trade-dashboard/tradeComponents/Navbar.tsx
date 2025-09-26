import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900">Stavbar</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-gray-900">
              Home
            </a>
            <a href="#" className="hover:text-gray-900">
              Services
            </a>
            <a href="#" className="hover:text-gray-900">
              Jobs
            </a>
            <a href="#" className="hover:text-gray-900">
              About
            </a>
            <a href="#" className="hover:text-gray-900">
              Blog
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>

          {/* Profile */}
          <div className="hidden md:flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 focus:outline-none"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100 px-4 py-3 space-y-2 text-sm font-medium text-gray-700">
          <a href="#" className="block hover:text-gray-900">
            Home
          </a>
          <a href="#" className="block hover:text-gray-900">
            Services
          </a>
          <a href="#" className="block hover:text-gray-900">
            Jobs
          </a>
          <a href="#" className="block hover:text-gray-900">
            About
          </a>
          <a href="#" className="block hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="block hover:text-gray-900">
            Contact
          </a>
          <div className="pt-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
