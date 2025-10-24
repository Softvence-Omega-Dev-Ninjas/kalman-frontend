import { useEffect, useState } from "react";
import { Upload, File, X, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/typeHook';
import { saveProfessional } from '@/redux/features/tradeForm/tradeFormSlice';
import type { ProfessionalInfo } from '@/redux/features/tradeForm/tradeFormSlice';

export default function BusinessInfoForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.tradeForm.professional) as ProfessionalInfo;

  const { register, handleSubmit, setValue } = useForm<ProfessionalInfo>({ defaultValues: saved ?? {} });

  const [files, setFiles] = useState<Array<{ name: string; size: number; type: string; dataUrl?: string }>>([]);

  useEffect(() => {
    if (saved) {
      if (saved.idType) setValue('idType', saved.idType);
    if (saved.idFiles) setFiles(saved.idFiles as Array<{ name: string; size: number; type: string; dataUrl?: string }>);
      console.log('[BusinessInfoForm] Loaded saved professional identity:', saved.idType, saved.idFiles);
    }
  }, [saved, setValue]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const converted = await Promise.all(
      incoming.map(async (f) => {
        const dataUrl = await fileToDataUrl(f);
        return { name: f.name, size: f.size, type: f.type, dataUrl };
      })
    );
    setFiles((prev) => [...prev, ...converted]);
    console.log('[BusinessInfoForm] Files selected:', incoming.map((f) => ({ name: f.name, size: f.size, type: f.type })));
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onSubmit = (data: ProfessionalInfo) => {
    // merge id fields into professional payload
    const payload: Partial<ProfessionalInfo> = {
      ...data,
      idType: data.idType,
      idFiles: files,
    };
    console.log('[BusinessInfoForm] Submitting identity payload:', payload);
    dispatch(saveProfessional(payload));
    navigate('/trade-person/service-areas');
  };

  return (
    <div className=" px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900">Verify your identity</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Select ID Type */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Select your ID type</label>
            <div className="relative">
              <select {...register('idType')} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none bg-[#F8F9FA]">
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="NID">NID</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Upload Section */}
          <div className="mt-12 border border-dashed border-gray-300 rounded-xl p-6 text-center bg-[#F8F9FA]">
            <Upload className="mx-auto text-gray-400" size={30} />
            <p className="mt-2 text-gray-700 font-medium">Upload ID Document</p>
            <p className="text-sm text-gray-500">Upload clear photos of your ID document</p>

            <label className="inline-block mt-4">
              <span className="px-2 py-1 bg-white border border-gray-100 rounded-md text-black font-semibold cursor-pointer hover:bg-gray-200 mt-5">
                Choose files
              </span>
              <input type="file" className="hidden" onChange={handleFileChange} multiple />
            </label>
          </div>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div>
              <h1 className="mt-5 font-bold">Uploaded Files</h1>
              <div className="mt-4 space-y-2">
                {files.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-[#F8F9FA]">
                    <div className="flex items-center gap-2 text-gray-700">
                      <File size={18} className="text-gray-400" />
                      <span className="text-sm">{f.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={f.dataUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">Preview</a>
                      <button type="button" className="text-gray-500 hover:text-red-500" onClick={() => removeFile(idx)}>
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Requirements */}
          <div className="mt-6 bg-teal-50 border-teal-300 border rounded-lg p-4 text-sm text-gray-700">
            <h3 className="font-semibold text-teal-800 mb-2">Document Requirements</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Document must be current and not expired</li>
              <li>All text and details must be clearly visible</li>
              <li>Upload both front and back (if applicable)</li>
              <li>File formats: JPG, PNG, PDF (max 05MB each)</li>
              <li>Documents will be securely encrypted and stored</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-16 flex justify-between">
            <Link to='/trade-person/professional-info'>
              <button type="button" className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                <ArrowLeft size={18} />
                Previous
              </button>
            </Link>

            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
