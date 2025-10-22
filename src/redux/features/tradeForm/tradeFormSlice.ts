import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type PersonalInfo = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export type ProfessionalInfo = {
  categoryId?: string | null;
  subCategoryIds?: string[];
  services?: string[];
  description?: string;
  yearsExperience?: string;
  businessType?: string;
  hourlyRate?: string;
  businessName?: string;
  // Identity verification fields
  idType?: string;
  idFiles?: Array<{ name?: string; size?: number; type?: string; dataUrl?: string }>;
  // Service area fields
  serviceAreaCenter?: { lat: number; lng: number };
  travelDistanceKm?: number;
  // Payment info (card only)
  paymentMethod?: 'card';
  cardInfo?: {
    holderName?: string;
    last4?: string;
    expiry?: string;
    saveCard?: boolean;
    billingAddress?: { street?: string; city?: string; postcode?: string };
  };
  // Credential uploads
  credentialsFiles?: Array<{ name?: string; size?: number; type?: string; dataUrl?: string }>;
};

export type TradeFormState = {
  personal: PersonalInfo;
  professional: ProfessionalInfo;
};

const initialState: TradeFormState = {
  personal: {},
  professional: {},
};

const slice = createSlice({
  name: 'tradeForm',
  initialState,
  reducers: {
    savePersonal(state, action: PayloadAction<Partial<PersonalInfo>>) {
      state.personal = { ...state.personal, ...action.payload };
    },
    saveProfessional(state, action: PayloadAction<Partial<ProfessionalInfo>>) {
      state.professional = { ...state.professional, ...action.payload };
    },
    resetTradeForm() {
      return initialState;
    },
  },
});

export const { savePersonal, saveProfessional, resetTradeForm } = slice.actions;
export default slice.reducer;
