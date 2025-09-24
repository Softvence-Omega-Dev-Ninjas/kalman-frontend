import { useNavigate } from "react-router-dom";
import phase3Img from "../../assets/sample_images/phase3logo.png";
import { useState } from "react";
import { MdOutlineFileUpload, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import callOnlyIcon from "../../assets/sample_images/phoneOnly.png";
import emailOnlyIcon from "../../assets/sample_images/viaEmail.png"
import { IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";

const PhaseThree = ({ phase, setPhase }: { phase: number; setPhase: (phase: number) => void; }) => {
    const [contactMethod, setContactMethod] = useState<'phone' | 'email' | null>(null);
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
            <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#0B1B26] flex items-center justify-center mb-4">
                    <img src={phase3Img} alt="photos" className="" />
                </div>
                <h1 className="text-lg font-semibold">Photos & Final Details</h1>
                <p className="text-sm text-secondary">Add photos to help tradespeople understand the job better</p>
            </div>

            <div className="space-y-6">
                {/* Drop area */}
                <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center bg-gray-50">
                    <div className="p-2 bg-gray-200 rounded-full inline-block mb-4">
                        <MdOutlineFileUpload className="text-4xl text-gray-500" />
                    </div>
                    <div className="mb-2">Drop photos here or click to browse</div>
                    <div className="text-xs text-secondary mb-4">Up to 5 photos, max 10MB each • JPG, PNG, WEBP</div>
                    <button className="px-4 py-2 border border-gray-200 rounded-md bg-white">Choose Image</button>
                </div>

                {/* Contact preference */}
                <div>
                    <h2 className="text-sm font-medium mb-3">How would you like to be contacted?</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setContactMethod('phone')} className={`p-4 rounded-lg border ${contactMethod === 'phone' ? 'border-[#FF7346]' : 'border-gray-200'} flex items-center gap-3`}>
                            <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center"><img src={callOnlyIcon} alt="" /></div>
                            <div className="text-left">
                                <div className="font-semibold">Phone only</div>
                                <div className="text-xs text-secondary">Tradespeople will call you directly</div>
                            </div>
                        </button>

                        <button onClick={() => setContactMethod('email')} className={`p-4 rounded-lg border ${contactMethod === 'email' ? 'border-[#FF7346]' : 'border-gray-200'} flex items-center gap-3`}>
                            <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center"><img src={emailOnlyIcon} alt="" /></div>
                            <div className="text-left">
                                <div className="font-semibold">Email only</div>
                                <div className="text-xs text-secondary">Receive quotes and messages via email</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Job Summary box */}
                <div className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold flex items-center gap-2"><IoDocumentTextOutline /><span>Job Summary</span></div>
                        <button className="text-lg text-secondary"><FaRegEdit /></button>
                    </div>

                    <div className="text-sm text-black mb-3">
                        <div className="mb-2 pb-2 border-b border-gray-200"><strong>Job Title :</strong> asdsadsa</div>
                        <div className="mb-2"><strong>Service Category</strong></div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className=" text-sm">Home improvement</span>
                            <MdOutlineKeyboardDoubleArrowRight className="text-lg text-primary" />
                            <span className=" text-sm">Cleaning</span>
                        </div>
                        <div className=""><strong>Budget</strong></div>
                        <div className="text-sm px-2 py-1 bg-gray-100 rounded-md max-w-max my-2">Fixed Price</div>
                        <div className="text-xs">Maximum : $200.00</div>
                        <div className="mt-3 mb-2"><strong>Timeline</strong></div>
                        <div className="flex gap-2 flex-wrap"><span className="px-2 py-1 bg-gray-100 rounded-md text-sm">Flexible</span><span className="px-2 py-1 bg-gray-100 rounded-md text-sm">Preferred time anytime</span></div>
                        <div className="mt-3"><strong>Location</strong></div>
                        <div className="text-sm mt-1 flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-md max-w-max"><IoLocationOutline /><span>Preferred time anytime</span></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={() => setPhase(phase - 1)} className="px-4 py-2 rounded-md border border-gray-200 flex items-center gap-2"><FaArrowLeft /> <span>Previous</span></button>
                    <button onClick={()=> navigate('/')} className="px-6 py-2 rounded-md bg-[#FF7346] text-white flex items-center gap-2"><span>Post Job</span> <FaArrowRight /></button>
                </div>
            </div>
        </div>
    );
};

export default PhaseThree;