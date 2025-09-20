import { FaAngleRight } from "react-icons/fa";
import { popularServices } from "../../assets/demoData/demodata";


const PopularServices = () => {
    return (
        <div className="text-center bg-[#F2F4F8] py-20">
            <h1 className="font-semibold text-4xl">Popular Service Categories</h1>
            <p className="text-2xl text-[#595959] my-5">Find trusted professionals for every job, big or small</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 max-w-[1580px] mx-auto px-5">
                {
                    popularServices.map((service)=> <div className="flex bg-white items-center justify-between shadow-md p-5 rounded-md">
                    <div className="flex items-center gap-3 px-3">
                        <img src={service.icon} alt={service.title} className="w-8 h-8" />
                        <div className="text-left space-y-2">
                            <h1 className="font-semibold text-xl">{service.title}</h1>
                            <p className="text-sm">{service.description}</p>
                        </div>
                    </div>
                    <button><FaAngleRight className="text-2xl" /></button>
                </div>)
                }
            </div>

            <div>
                <button className="text-white bg-primary px-5 py-3 mt-10 rounded-md font-semibold">See All Categories</button>
            </div>
        </div>
    );
};

export default PopularServices;