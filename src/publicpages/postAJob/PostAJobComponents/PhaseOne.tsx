import { IoLocationOutline } from "react-icons/io5";
import { popularServices } from "../../../assets/demoData/demodata";
import { useState } from "react";
import tellUsImg from "../../../assets/sample_images/tellusabouturproject.png"
import { FaArrowRight } from "react-icons/fa";
import { useGetCategoriesQuery } from "@/redux/features/admin/categoryApi";

interface PhaseOneProps {
    phase: number;
    setPhase: (phase: number) => void;
}
interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}


const PhaseOne = ({phase, setPhase}: PhaseOneProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const maxChars = 500;

      const { data, isLoading, error } = useGetCategoriesQuery({
      });
    
       const categories: TCategory[] = data?.data?.result || [];

    const runningPhase = () =>{
        setPhase(phase + 1)
    }
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#0B1B26] flex items-center justify-center mb-4">
                    <img src={tellUsImg} alt="" />
                </div>
                <h1 className="text-lg font-semibold">Tell us about your project</h1>
                <p className="text-sm text-secondary">Provide details about what you need done</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Fix leaky kitchen tap"
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium">Category</label>
                        <button className="text-sm text-[#FF7346]">See all</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedCategory(c.id)}
                                className={`flex flex-col items-start gap-3 p-4 rounded-lg border ${selectedCategory === c.id ? 'border-[#FF7346]' : 'border-gray-200'} bg-white text-left`}
                            >
                                <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center mb-1">
                                    <img src={c.image} alt={c.name} className="w-6 h-6" />
                                </div>
                                <div className="font-semibold text-sm">{c.name}</div>
                                <div className="text-xs text-secondary">{c.subCategories}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, maxChars))}
                        placeholder="Describe what needs to be done, including any specific requirements, materials needed, or preferences you have..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm min-h-[120px] resize-none focus:outline-none"
                    />
                    <div className="text-xs text-right text-secondary mt-2">minimum 50/500 characters</div>
                </div>

               <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                 <div className="flex items-center justify-start gap-3 px-3 py-3 text-secondary  border border-gray-200 rounded-md bg-gray-50">
                    <IoLocationOutline className="inline text-lg mr-2" />
                    <p className="block text-sm">Select a location</p>
                </div>
               </div>

                <div className="flex justify-end">
                    <button type="submit" onClick={()=> runningPhase() } className="bg-[#FF7346] text-white px-6 py-2 rounded-md flex items-center gap-2 font-semibold"><span>Continue </span><FaArrowRight /></button>
                </div>
            </div>
        </div>
    );
};

export default PhaseOne;