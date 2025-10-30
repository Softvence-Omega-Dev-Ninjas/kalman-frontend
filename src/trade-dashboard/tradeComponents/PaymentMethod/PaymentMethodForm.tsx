import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/typeHook";
import type { ProfessionalInfo } from "@/redux/features/tradeForm/tradeFormSlice";
import cardimg from "../../../assets/sample_images/card.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddPaymentMethodMutation } from "@/redux/features/tradesman/tradesmanApi";
import toast from "react-hot-toast";

interface PaymentMethodFormProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PaymentMethodForm({
  isModalOpen,
  setIsModalOpen,
}: PaymentMethodFormProps) {
  const [addPaymentMethod] = useAddPaymentMethodMutation();
  const saved = useAppSelector(
    (s) => s.tradeForm.professional
  ) as ProfessionalInfo;

  type CardFormValues = {
    holderName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    saveCard?: boolean;
    billingStreet?: string;
    billingCity?: string;
    billingPostcode?: string;
    terms?: boolean;
  };

  const { register, handleSubmit, setValue, reset } = useForm<CardFormValues>({
    defaultValues: {},
  });

  useEffect(() => {
    if (saved?.cardInfo) {
      setValue("holderName", saved.cardInfo.holderName ?? "");
      setValue("expiry", saved.cardInfo.expiry ?? "");
      setValue("billingStreet", saved.cardInfo.billingAddress?.street ?? "");
      setValue("billingCity", saved.cardInfo.billingAddress?.city ?? "");
      setValue(
        "billingPostcode",
        saved.cardInfo.billingAddress?.postcode ?? ""
      );
      setValue("saveCard", saved.cardInfo.saveCard ?? false);
    }
  }, [saved, setValue]);

  const onSubmit = async (data: CardFormValues) => {
    const payload = {
      methodType: "Credit/Debit Card" as const,
      cardNumber: data.cardNumber,
      cardHolderName: data.holderName,
      expiryDate: data.expiry,
      saveCard: !!data.saveCard,
      cvv: data.cvv,
      streetAddress: data.billingStreet,
      city: data.billingCity,
      postCode: data.billingPostcode,
      agreedToTerms: data.terms,
      provider: "Visa/Mastercard/Amex",
    };
    try {
      await addPaymentMethod(payload).unwrap();
      toast.success("Card saved successfully!");
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className=" sm:max-w-lg w-full max-w-4xl h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl"
      >
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className=" p-1 sm:p-2 md:p-4 ">
            {/* Payment Details (card only) */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-3 p-5 border border-primary rounded-2xl bg-[#FFF1ED]">
                <img src={cardimg} alt="" />
                <div className="space-y-2">
                  <h1 className="font-semibold text-base">Credit/Debit Card</h1>
                  <p className="text-sm text-gray-500">
                    Visa, Mastercard, American Express
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Card holder Name
                </label>
                <input
                  {...register("holderName")}
                  type="text"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  {...register("cardNumber")}
                  type="text"
                  placeholder="1234 4321 9876 0123"
                  className="placeholder:text-gray-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    {...register("expiry")}
                    type="text"
                    placeholder="MM/YY"
                    className=" placeholder:text-gray-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    {...register("cvv")}
                    type="text"
                    placeholder="123"
                    className="placeholder:text-gray-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  {...register("saveCard")}
                  type="checkbox"
                  id="save"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="save" className="text-sm text-gray-600">
                  Save this card for future payments
                </label>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">
                Billing Address
              </h3>
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  {...register("billingStreet")}
                  type="text"
                  className=" placeholder:text-gray-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-1 ">
                    City
                  </label>
                  <input
                    {...register("billingCity")}
                    type="text"
                    className=" placeholder:text-gray-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-1">
                    Post code
                  </label>
                  <input
                    {...register("billingPostcode")}
                    type="text"
                    placeholder="12345"
                    className=" placeholder:text-gray-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  {...register("terms")}
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Agree to the{" "}
                  <span className="text-red-500">Terms Privacy</span> of and{" "}
                  <span className="text-red-500">Policy Service</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
