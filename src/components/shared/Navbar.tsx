import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className=" mx-auto  fixed bg-white w-full z-50 shadow-md">
            <div className="max-w-[1580px] p-5 mx-auto flex items-center justify-between gap-5">
                <h1 className="text-3xl font-bold">Navbar</h1>
                <div className="flex items-center gap-5 justify-center">
                    <Link to="/">Home</Link>
                    <Link to="/">Home</Link>
                    <Link to="/">Home</Link>
                    <Link to="/">Home</Link>
                    <Link to="/">Home</Link>
                    <Link to="/">Home</Link>
                </div>
                <button>PP</button>
            </div>
        </div>
    );
};

export default Navbar;