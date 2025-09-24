import { NavLink } from "react-router-dom";
import { useState } from "react";
import avatar from '../../assets/Ellipse 2.png'

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
    const [open, setOpen] = useState(false)

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
                        <img src={avatar} alt="profile" className="w-10 h-10 rounded-full hidden md:block object-cover" />

                        {/* mobile menu button */}
                        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md border">
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h20M0 7h20M0 13h20" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </button>
                    </div>
                </div>

                {/* mobile dropdown */}
                {open && (
                    <div className="md:hidden bg-white border-t">
                        <ul className="flex flex-col px-4 py-3 gap-2">
                            {navItems.map((item) => (
                                <li key={item.label}><NavLink to={item.path} className={({ isActive }) => `block py-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>{item.label}</NavLink></li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;