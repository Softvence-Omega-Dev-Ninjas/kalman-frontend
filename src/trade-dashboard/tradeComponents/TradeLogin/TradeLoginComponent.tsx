import { AiOutlineEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import loginImg from "../../../assets/sample_images/LoginImg.png";

interface LogInComponentProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const TradeLogInComponent: React.FC<LogInComponentProps> = ({step, setStep}) => {
    const handleLogin = () =>{
        setStep(step + 1);
    }
    return (
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <div className="w-full  max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={loginImg}
                alt="Login"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right form */}
          <div className="w-full max-w-md mx-auto">
            <div className="text-right mb-6 hidden lg:block">
              <div className="text-sm text-gray-800 font-semibold">
                Are you a tradesperson?{" "}
                <Link to="#" className="text-primary">
                  Sign up
                </Link>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-2 mb-6 text-center">
              Enter your email and password to access your account
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AiOutlineMail />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDEC9]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password *
                </label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AiOutlineEyeInvisible />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-semibold">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="w-4 h-4" /> Remember me
                </label>
                <Link to="#" className="text-sm text-primary">
                  Forgot Password?
                </Link>
              </div>

              <button
                onClick={handleLogin}
                type="submit"
                style={{ backgroundColor: "#FF7346" }}
                className="w-full text-white py-3 rounded-md font-semibold mt-2"
              >
                Sign In
              </button>

              <div className="flex items-center my-4 font-semibold">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="px-4 text-sm text-gray-400">
                  Or Continue with
                </div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                type="button"
                className="w-full border border-gray-200 rounded-md py-2.5 flex items-center justify-center gap-3"
              >
                <FcGoogle />
                <span className="text-sm">Google</span>
              </button>

              <div className="text-center text-sm text-gray-600 mt-4 font-semibold">
                Don't have an account?{" "}
                <Link to="/trade-signup" className="text-primary">
                  Sign up
                </Link>
              </div>

              <div className="text-center text-sm text-gray-600 mt-2 font-semibold">
                Are you a tradesperson?{" "}
                <Link to="#" className="text-primary">
                  Register as a Tradesperson
                </Link>
              </div>
            </form>
          </div>
        </div>
    );
};

export default TradeLogInComponent;