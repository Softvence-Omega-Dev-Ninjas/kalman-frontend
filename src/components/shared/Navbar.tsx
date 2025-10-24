import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import SignInModal from "../reuseable/SignInModal";
import SignUpModal from "../reuseable/SignUpModal";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { clearUser, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { FiMenu, FiX, FiChevronDown, FiLogIn } from "react-icons/fi";
import icon from '@/assets/user-icon/user-icon1.png';


const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Jobs", path: "/jobs" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [signinModal, setSigninModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const userState = useSelector(selectCurrentUser);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSignUp = () => {
    setSignupModal(true);
    setOpen(false);
  };

  const handleSignIn = () => {
    setSigninModal(true);
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setDropdownOpen(false);
    window.location.href = "/general-login";
  };

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top Announcement */}
      <div className="w-full bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="max-w-[1580px] mx-auto px-4 py-2 text-sm text-gray-700 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">NEW</span>
            Are you a tradesperson looking for leads?{" "}
            <Link to="/trade-signup" className="underline font-semibold text-orange-600 hover:text-orange-700">
              Join for free
            </Link>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-500">Language</span>
            <span className="font-semibold bg-white px-2 py-1 rounded border">EN</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-[1580px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl hidden sm:block md:text-3xl font-bold text-gray-900">
                Stavbar
              </h1>
            </Link>
          </div>

          {/* Center Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                        isActive 
                          ? "text-orange-600 bg-orange-50 font-semibold" 
                          : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Info / Avatar */}
            {userState ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex cursor-pointer items-center gap-3 focus:outline-none group"
                >
                  <div className="relative">
                    <img
                       src={icon || "https://randomuser.me/api/portraits/men/61.jpg"}
                      alt="User"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-lg transition-all duration-300 group-hover:border-orange-400 group-hover:scale-105"
                    />
                    <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  {/* Show user info on desktop */}
                  {!isMobile && (
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800">
                        {userState.name || userState.role}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {userState.role}

                      </span>
                    </div>
                  )}
                  
                  <FiChevronDown 
                    className={`text-gray-400 transition-transform duration-300 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={icon || "https://randomuser.me/api/portraits/men/61.jpg"}
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                              {userState.name || userState.role}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {userState.email}
                          </p>
                          <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-orange-50 rounded-full">
                            <span className="text-xs font-medium text-orange-700 capitalize">
                              {userState.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/user-dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <MdDashboard className="text-gray-400 group-hover:text-orange-500 text-lg" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link
                        to="/user-dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 transition-colors duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <IoSettingsSharp className="text-gray-400 group-hover:text-orange-500 text-lg" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                        onClick={handleLogout}
                      >
                        <IoIosLogOut className="text-red-400 group-hover:text-red-500 text-lg" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in - Desktop buttons
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={handleSignIn}
                  className="font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="font-semibold px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-600 hover:to-amber-600 transform hover:-translate-y-0.5"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Sign In Button (when not logged in) */}
            {!userState && isMobile && (
              <button
                onClick={handleSignIn}
                className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
              >
                <FiLogIn className="text-lg" />
              </button>
            )}

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden" ref={mobileMenuRef}>
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>

              {/* Mobile Slide-over Menu */}
              <div 
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                  open ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                aria-hidden={!open}
              >
                {/* Backdrop */}
                <div
                  onClick={() => setOpen(false)}
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    open ? 'opacity-30' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* Panel */}
                <aside 
                  className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
                    open ? 'translate-x-0' : 'translate-x-full'
                  }`} 
                  role="dialog" 
                  aria-modal="true"
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <Link to="/" onClick={handleNavLinkClick}>
                        <h1 className="text-2xl font-bold text-gray-900">Stavbar</h1>
                      </Link>
                      <button 
                        aria-label="Close menu" 
                        onClick={() => setOpen(false)} 
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto">
                      <ul className="flex flex-col gap-1">
                        {navItems.map((item) => (
                          <li key={item.label}>
                            <NavLink
                              to={item.path}
                              onClick={handleNavLinkClick}
                              className={({ isActive }) =>
                                `block py-4 px-4 rounded-xl transition-colors font-medium ${
                                  isActive
                                    ? 'text-orange-600 bg-orange-50 font-semibold'
                                    : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Auth Buttons - Only show if not logged in */}
                    {!userState && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <button 
                          onClick={handleSignIn}
                          className="w-full text-center py-4 font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mb-3"
                        >
                          Sign In
                        </button>
                        <button 
                          onClick={handleSignUp}
                          className="w-full text-center py-4 font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}

                    {/* User Info - Only show if logged in */}
                    {userState && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                          <img
                             src={icon || "https://randomuser.me/api/portraits/men/61.jpg"}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {userState.name ||  userState.role}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {userState.role}
                            </p>
                          </div>
                        </div>
                        
                        <Link
                          to="/user-dashboard"
                          onClick={handleNavLinkClick}
                          className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <MdDashboard className="text-lg" />
                          <span>Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/profile"
                          onClick={handleNavLinkClick}
                          className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <IoSettingsSharp className="text-lg" />
                          <span>Profile Settings</span>
                        </Link>
                        
                        <button
                          onClick={() => {
                            handleNavLinkClick();
                            handleLogout();
                          }}
                          className="flex items-center gap-3 w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-2"
                        >
                          <IoIosLogOut className="text-lg" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {signinModal && (
          <SignInModal
            siginModal={signinModal}
            setsigninModal={setSigninModal}
          />
        )}
        {signupModal && (
          <SignUpModal
            signupModal={signupModal}
            setsignupModal={setSignupModal}
          />
        )}
      </nav>
    </header>
  );
};

export default Navbar;