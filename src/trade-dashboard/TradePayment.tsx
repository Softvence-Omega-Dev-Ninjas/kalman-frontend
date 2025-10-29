import { useState } from "react";
import { CreditCard, Plus, Trash2, Lock, FileText, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentMethodForm from "./tradeComponents/PaymentMethod/PaymentMethodForm";
import { useGetTradesmanProfileQuery } from "@/redux/features/tradesman/tradesmanApi";

interface PaymentMethod {
  id: number;
  cardNumber: string;
  isDefault: boolean;
  expiryDate: string;
}

interface PaymentHistoryItem {
  id: number;
  title: string;
  status: "Shortlisted" | "Received";
  date: string;
  visaLastFour: string;
  amount: number;
}

const initialPaymentHistory: PaymentHistoryItem[] = [
  {
    id: 1,
    title: "Kitchen Cabinet Installation",
    status: "Shortlisted",
    date: "15/02/2024",
    visaLastFour: "4255",
    amount: 20.0,
  },
  {
    id: 2,
    title: "Wedding Photography",
    status: "Received",
    date: "15/02/2024",
    visaLastFour: "8255",
    amount: 110.0,
  },
];

export default function TradePayment() {
  const { data } = useGetTradesmanProfileQuery(undefined);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    data?.data?.paymentMethod
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const handleSetAsDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  return (
    <div className="pt-8 pb-28 max-w-5xl mx-auto">
      {/* Payment Methods Section */}
      <div className="bg-[#F8F9FA] border border-[#D9D9D9]/30 rounded-md p-4 overflow-hidden mb-5">
        <div>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Methods
              </h2>
            </div>
            <button
              onClick={handleOpenModal}
              className="flex items-center space-x-2 bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
            >
              <Plus size={16} />
              <span className="text-sm">Add Payment Method</span>
            </button>
          </div>
          <div className="space-y-4 mt-4">
            <PaymentMethodForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between  bg-white border border-[#D9D9D9]/30 rounded-md p-4 flex-wrap gap-3"
              >
                <div className="flex items-center space-x-4 ">
                  <CreditCard className="text-gray-500" size={24} />
                  <div>
                    <p className="font-medium text-gray-700">
                      Visa *****{method.cardNumber?.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expire date : {method.expiryDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault ? (
                    <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-md">
                      Default
                    </span>
                  ) : (
                    <Button
                      onClick={() => handleSetAsDefault(method.id)}
                      className=""
                    >
                      Set as Default
                    </Button>
                  )}
                  {!method.isDefault && (
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Notice Section */}
      <div className="bg-[#FFF1ED] border-l-4 border-primary rounded-lg p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Lock className="text-primary" size={20} />
          <h3 className="font-semibold text-primary">
            Your payments are secure
          </h3>
        </div>
        <ul className="text-sm text-gray-700 space-y-2 list-inside list-disc marker:text-primary">
          <li>
            All payments are processed securely through our trusted payment
            partners
          </li>
          <li>
            Funds are held in escrow until work is completed to your
            satisfaction
          </li>
          <li>We never store your full payment information on our servers</li>
          <li>All transactions are encrypted and PCI compliant</li>
        </ul>
      </div>

      {/* Payment History Section */}
      <div className="bg-[#F8F9FA] border border-[#D9D9D9]/30 rounded-[10px] p-4 overflow-hidden mt-5">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Folder className="text-gray-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              Payment History
            </h2>
          </div>

          <div className="divide-y-5 divide-gray-200">
            {initialPaymentHistory.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-[#D9D9D9]/30 rounded-md p-4 mb-5"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-medium text-gray-700 flex items-center space-x-2">
                    <span>{item.title}</span>
                    <span
                      className={`text-xs font-semibold px-5 py-2 rounded-md text-white ${
                        item.status === "Shortlisted"
                          ? "bg-green-500 text-green-700"
                          : "bg-primary text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Date : {item.date} &nbsp; Visa ********{item.visaLastFour}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-800">
                    ${item.amount.toFixed(2)}
                  </span>
                  <button className="flex items-center bg-primary-txt space-x-2 text-white hover:bg-gray-800 transition-colors duration-200 px-3 py-1.5 rounded-md cursor-pointer">
                    <FileText size={16} />
                    <span className="text-sm">Download statement</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
