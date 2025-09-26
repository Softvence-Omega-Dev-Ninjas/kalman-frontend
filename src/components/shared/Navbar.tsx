import { useState } from "react";
import { NavLink } from "react-router-dom";
import SignInModal from "../reuseable/SignInModal";
import SignUpModal from "../reuseable/SignUpModal";


const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [signupModal, setsignupModal]= useState(false);
    const [siginModal, setsigninModal]= useState(false);
    const handlesignUp = () =>{
        console.log("Triggered")
        setsignupModal(true);
    }
    const handlesignIn = () =>{
        setsigninModal(true);
    }

    return (
        <header className="w-full fixed top-0 left-0 z-50">
            {/* top announcement */}
            <div className="w-full bg-gray-50">
                <div className="max-w-[1580px] mx-auto px-4 py-1 text-sm text-gray-700 flex items-center justify-between">
                    <div>Are you a tradesperson looking for leads? <a href="#" className="underline">Join for free</a></div>
                    <div className="text-sm">Language <span className="ml-2">EN</span></div>
                </div>
            </div>

            {/* main nav */}
            <nav className="w-full bg-white shadow-sm">
                <div className="max-w-[1580px] mx-auto px-4 py-4 flex items-center justify-between">
                    {/* logo */}
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0D1B2A]">Stavbar</h1>
                    </div>

                    {/* center nav - hidden on small */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <ul className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <NavLink to={item.path} className={({ isActive }) => `font-semibold ${isActive ? 'text-primary' : 'text-gray-700'}`}>{item.label}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* right side */}
                    <div className="flex items-center gap-4">
                        {/* desktop avatar */}
                        <div className="hidden md:flex items-center gap-4">
                            <button onClick={handlesignIn} className="font-semibold">Signin</button>
                            <button onClick={handlesignUp} className="font-semibold px-3 py-1 bg-black text-white rounded-md">Signup</button>
                        </div>

                        {/* mobile hamburger */}
                        <button
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <svg className={`w-6 h-6 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    siginModal && <SignInModal siginModal={siginModal} setsigninModal={setsigninModal}/>
                }
                {
                    signupModal && <SignUpModal  signupModal={signupModal} setsignupModal={setsignupModal}/>
                }

                {/* mobile dropdown */}
                {/* Mobile dropdown with smooth transition */}
                <div
                    className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    aria-hidden={!open}
                >
                    <ul className="flex flex-col px-4 py-3 gap-2">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) => `block py-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}

                        {/* mobile auth actions - close menu when opening modal */}
                        <li>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    handlesignIn();
                                }}
                                className="w-full text-left py-2 font-semibold"
                            >
                                Signin
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    handlesignUp();
                                }}
                                className="w-full text-left py-2 font-semibold bg-black text-white rounded-md px-3"
                            >
                                Signup
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;