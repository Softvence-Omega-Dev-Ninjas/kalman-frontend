import { useEffect, useState } from "react";
import { Upload, File, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/typeHook';
import { saveProfessional } from '@/redux/features/tradeForm/tradeFormSlice';
import type { ProfessionalInfo } from '@/redux/features/tradeForm/tradeFormSlice';

export default function CredentialsInfoForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.tradeForm.professional) as ProfessionalInfo;

  const { handleSubmit } = useForm();

  const [files, setFiles] = useState<Array<{ name: string; size: number; type: string; dataUrl?: string }>>([]);

  useEffect(() => {
    if (saved?.credentialsFiles) setFiles(saved.credentialsFiles as Array<{ name: string; size: number; type: string; dataUrl?: string }>);
  }, [saved]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const converted = await Promise.all(
      incoming.map(async (f) => {
        const dataUrl = await fileToDataUrl(f as File);
        return { name: f.name, size: f.size, type: f.type, dataUrl };
      })
    );
    setFiles((prev) => [...prev, ...converted]);
    console.log('[CredentialsInfoForm] Files selected:', converted.map(f => ({ name: f.name, size: f.size, type: f.type })));
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onSubmit = () => {
    const payload = { credentialsFiles: files };
    console.log('[CredentialsInfoForm] Submitting credentials payload:', payload);
    dispatch(saveProfessional(payload));
    navigate('/trade-person/payment-terms');
  };

  return (
    <div className=" px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* Title */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Credentials <span className="font-normal">(optional)</span></h2>
          <span className="underline">skip</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="mt-10 font-semibold">Professional Qualifications</h5>

          {/* Upload Section */}
          <div className="mt-3 border border-dashed border-gray-300 rounded-xl p-6 text-center bg-[#F8F9FA]">
            <Upload className="mx-auto text-gray-400" size={30} />
            <p className="mt-2 text-gray-700 font-medium">Upload Credentials</p>
            <p className="text-sm text-gray-500">Upload certificates or licenses (optional)</p>

            <label className="inline-block mt-4">
              <span className="px-2 py-1 bg-white border border-gray-100 rounded-md text-black font-semibold cursor-pointer hover:bg-gray-200 mt-5">
                Upload Now
              </span>
              <input type="file" className="hidden" onChange={handleFileChange} multiple />
            </label>
          </div>

          {/* Uploaded File */}
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

          {/* Buttons */}
          <div className="mt-16 flex justify-between">
            <Link to='/trade-person/service-areas'>
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
