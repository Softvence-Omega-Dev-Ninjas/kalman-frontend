import { baseApi } from "@/redux/api/baseApi";

interface PaymentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Payment[];
}

export interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  tradesMan: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  job: {
    title: string;
    location: string;
    price: number;
  };
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<PaymentResponse, void>({
      query: () => ({
        url: "/admin/all-paymets",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentApi;
