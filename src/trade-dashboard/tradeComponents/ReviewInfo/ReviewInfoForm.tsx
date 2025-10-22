import { ArrowLeft, ArrowRight, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from '@/redux/typeHook';

export default function ReviewInfoForm() {
  const savedPersonal = useAppSelector((s) => s.tradeForm.personal);
  const savedProfessional = useAppSelector((s) => s.tradeForm.professional);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-sm">
      {/* Title */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Review Your Information</h2>
          <p className="text-sm text-gray-500 mb-8">Please review the data you've entered before submission.</p>
        </div>
        <div>
          <SquarePen />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
          <p className="text-sm text-gray-600">Name: {savedPersonal?.firstName ?? '-'} {savedPersonal?.lastName ?? ''}</p>
          <p className="text-sm text-gray-600">Email: {savedPersonal?.email ?? '-'}</p>
          <p className="text-sm text-gray-600">Phone: {savedPersonal?.phone ?? '-'}</p>
          <p className="text-sm text-gray-600">Address: {savedPersonal?.street ?? '-'}, {savedPersonal?.city ?? '-'} {savedPersonal?.state ?? ''} {savedPersonal?.zip ?? ''}</p>
        </div>

        {/* Professional Info */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Professional Information</h3>
          <p className="text-sm text-gray-600">Business Name: {savedProfessional?.businessName ?? '-'}</p>
          <p className="text-sm text-gray-600">Category ID: {savedProfessional?.categoryId ?? '-'}</p>
          <p className="text-sm text-gray-600">Sub categories: {savedProfessional?.subCategoryIds?.join(', ') ?? '-'}</p>
          <p className="text-sm text-gray-600">Experience: {savedProfessional?.yearsExperience ?? '-'}</p>
          <p className="text-sm text-gray-600">Hourly Rate: {savedProfessional?.hourlyRate ?? '-'}</p>
          <p className="text-sm text-gray-600">Business Type: {savedProfessional?.businessType ?? '-'}</p>
        </div>

        {/* Service Area */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Service Area</h3>
          <p className="text-sm text-gray-600">Travel Distance: {savedProfessional?.travelDistanceKm ? `${savedProfessional.travelDistanceKm} km` : '-'}</p>
          <p className="text-sm text-gray-600">Center: {savedProfessional?.serviceAreaCenter ? `${savedProfessional.serviceAreaCenter.lat.toFixed(5)}, ${savedProfessional.serviceAreaCenter.lng.toFixed(5)}` : '-'}</p>
        </div>

        {/* Insurance & Credentials */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Insurance & Credentials</h3>
          <p className="text-sm text-gray-600">ID Type: {savedProfessional?.idType ?? '-'}</p>
          <p className="text-sm text-gray-600">ID Files: {savedProfessional?.idFiles?.length ?? 0} uploaded</p>
          <p className="text-sm text-gray-600">Credentials: {savedProfessional?.credentialsFiles?.length ?? 0} uploaded</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border-gray-200 border rounded-xl p-4 bg-gray-50 mb-8">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">Method: {savedProfessional?.paymentMethod ?? '-'}</p>
        <p className="text-sm text-gray-600">Card: {savedProfessional?.cardInfo?.last4 ? `**** **** **** ${savedProfessional.cardInfo.last4}` : '-'}</p>
        <p className="text-sm text-gray-600">Billing Address: {savedProfessional?.cardInfo?.billingAddress ? `${savedProfessional.cardInfo.billingAddress.street ?? ''}, ${savedProfessional.cardInfo.billingAddress.city ?? ''} ${savedProfessional.cardInfo.billingAddress.postcode ?? ''}` : '-'}</p>
      </div>

      {/* Buttons */}
      <div className="mt-16 flex justify-between">
        <Link to='/trade-person/business-details'>
          <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            <ArrowLeft size={18} />
            Previous
          </button>
        </Link>

        <Link to='/trade-login'>
          <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Continue
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}
