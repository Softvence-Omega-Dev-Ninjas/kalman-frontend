import { useState } from "react";
import { Upload, File, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CredentialsInfoForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className=" px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* Title */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Credentials <span className="font-normal">(optional)</span></h2>
          <span className="underline">skip</span>
        </div>



        <h5 className="mt-10 font-semibold">Professional Qualifications</h5>

        {/* Upload Section */}
        <div className="mt-3 border border-dashed border-gray-300 rounded-xl p-6 text-center bg-[#F8F9FA]">
          <Upload className="mx-auto text-gray-400" size={30} />
          <p className="mt-2 text-gray-700 font-medium">Upload ID Document</p>
          <p className="text-sm text-gray-500">Upload clear photos of your ID document</p>

          <label className="inline-block mt-4">
            <span className="px-2 py-1 bg-white border border-gray-100 rounded-md text-black font-semibold cursor-pointer hover:bg-gray-200 mt-5">
              Upload Now
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* Uploaded File */}

        {
          file && (
            <div>
              <h1 className="mt-5 font-bold">Uploaded Files</h1>
            </div>
          )
        }
        {file && (
          <div className="mt-4 flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA]">
            <div className="flex items-center gap-2 text-gray-700">
              <File size={18} className="text-gray-400" />
              <span className="text-sm">{file.name}</span>
            </div>
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => setFile(null)}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-16 flex justify-between">
          <Link to='/trade-person/service-areas'>
          <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            <ArrowLeft size={18} />
            Previous
          </button>
          </Link>

          <Link to='/trade-person/payment-terms'>
          <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Continue
            <ArrowRight size={18} />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
