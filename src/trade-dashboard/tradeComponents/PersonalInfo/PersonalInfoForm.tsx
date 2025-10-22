import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@/redux/typeHook';
import { savePersonal } from '@/redux/features/tradeForm/tradeFormSlice';
import type { PersonalInfo } from '@/redux/features/tradeForm/tradeFormSlice';
import { useEffect } from 'react';

const PersonalInfoForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const saved = useAppSelector((s) => s.tradeForm.personal) as PersonalInfo;
  const { register, handleSubmit, reset, watch } = useForm<PersonalInfo>({ defaultValues: saved ?? {} });

  useEffect(() => {
    if (saved) {
      console.log('[PersonalInfoForm] Loaded saved defaults:', saved);
      reset(saved);
    }
  }, [saved, reset]);

  // watch form values for debugging; will log on every change
  const watched = watch();
  useEffect(() => {
    console.log('[PersonalInfoForm] Form values changed:', watched);
  }, [watched]);

  const onSubmit = (data: PersonalInfo) => {
    console.log('[PersonalInfoForm] Submitting data:', data);
    dispatch(savePersonal(data));
    navigate('/trade-person/professional-info');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register('firstName')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register('lastName')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Date of Birth + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Date of Birth</label>
            <input
              type="text"
              placeholder="Enter your date of birth"
              {...register('dob')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              {...register('phone')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-6 mt-16" />

        {/* Address Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Address</h3>

        {/* Street Address */}
        <div className="mb-4 mt-8">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Street Address</label>
          <input
            type="text"
            placeholder="Enter your street address"
            {...register('street')}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* City + Postcode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              {...register('city')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">State</label>
            <input
              type="text"
              placeholder="State"
              {...register('state')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">Zip</label>
            <input
              type="text"
              placeholder="Postcode"
              {...register('zip')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 px-6 rounded-md flex items-center space-x-2 transition-all duration-200">
            <span>Continue</span>
            <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
