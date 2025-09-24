import React from 'react'
import circleImg1 from "../../assets/sample_images/undraw_confirmed_c5lo 1.png";
import circleImg2 from "../../assets/sample_images/Group 1422567285.png";
import circleImg3 from "../../assets/sample_images/Frame 2147225506.png";
import { Link } from 'react-router-dom';

const HireAsTradeperson: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1580px] mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-center ">How to hire the right tradesperson</h2>
                <p className="text-center text-2xl text-[#595959] mt-3 mb-10">Connect with skilled tradespeople in three easy steps.</p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
                    <div className="flex flex-col items-center text-center max-w-xs">
                       <img className='w-32 h-32 rounded-full' src={circleImg1} alt="" />
                        <div className="text-[11px] tracking-wider text-[#FF7346] font-semibold my-3">STEP 1</div>
                        <div className="text-lg font-semibold">Post your job for free</div>
                    </div>

                    <div className="flex flex-col items-center text-center max-w-xs">
                        <img className='w-32 h-32 rounded-full' src={circleImg3} alt="" />
                        <div className="text-[11px] tracking-wider text-[#FF7346] font-semibold my-3">STEP 2</div>
                        <div className="text-lg font-semibold">Choose a Tradespeople</div>
                    </div>

                    <div className="flex flex-col items-center text-center max-w-xs">
                       <img className='w-32 h-32 rounded-full' src={circleImg2} alt="" />
                        <div className="text-[11px] tracking-wider text-[#FF7346] font-semibold my-3">STEP 3</div>
                        <div className="text-lg font-semibold">Get It Done</div>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <Link to="/post-a-job" className="bg-primary text-white px-6 py-2 rounded-md shadow-md">Post a Job</Link>
                </div>
            </div>
        </section>
    )
}

export default HireAsTradeperson