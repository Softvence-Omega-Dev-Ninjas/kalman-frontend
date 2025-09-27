import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
                <div className="max-w-[1580px] mx-auto px-4 py-1 text-sm text-gray-700 flex items-center justify-between gap-5">
                    <div>Are you a tradesperson looking for leads? <Link to="/trade-signup" className="underline">Join for free</Link></div>
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

                {/* mobile slide-over menu */}
                <div className={`md:hidden ${open ? 'fixed inset-0 z-40' : 'pointer-events-none'}`} aria-hidden={!open}>
                    {/* backdrop */}
                    <div
                        onClick={() => setOpen(false)}
                        className={`absolute inset-0 bg-black transition-opacity ${open ? 'opacity-30' : 'opacity-0'}`}
                        aria-hidden="true"
                    />

                    {/* panel */}
                    <aside className={`absolute right-0 top-0 h-full w-11/12 max-w-xs bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true">
                        <div className="p-4 h-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Menu</h2>
                                <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md focus:outline-none">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="mt-6 flex-1 overflow-y-auto">
                                <ul className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <li key={item.label}>
                                            <NavLink
                                                to={item.path}
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) => `block py-3 px-2 rounded hover:bg-gray-50 ${isActive ? 'text-primary font-semibold' : 'text-gray-700'}`}
                                            >
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="mt-4">
                                <button onClick={() => { setOpen(false); handlesignIn(); }} className="w-full text-left py-3 font-semibold">Sign in</button>
                                <button onClick={() => { setOpen(false); handlesignUp(); }} className="w-full mt-3 font-semibold py-3 bg-black text-white rounded-md">Sign up</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;