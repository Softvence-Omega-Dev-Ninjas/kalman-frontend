import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/typeHook";
import { useEffect, useState, useCallback, useMemo } from "react";
import tradePersonSignupFormData from "@/lib/tradeFormData";
import { useTradeSignUpMutation } from "@/redux/features/tradeForm/tradeSignUp";
import { resetTradeForm } from "@/redux/features/tradeForm/tradeFormSlice";

export default function ReviewInfoForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedPersonal = useAppSelector((s) => s.tradeForm.personal);
  const savedProfessional = useAppSelector((s) => s.tradeForm.professional);
  const [tradeSignUp, { isLoading }] = useTradeSignUpMutation();
  const [error, setError] = useState<string>("");
  console.log("[ReviewInfoForm] Loaded personal info:", savedPersonal);
  console.log("[ReviewInfoForm] Loaded professional info:", savedProfessional);
  console.log("[ReviewInfoForm] ID Files check:", savedProfessional?.idFiles);
  console.log(
    "[ReviewInfoForm] Credential Files check:",
    savedProfessional?.credentialsFiles
  );

  useEffect(() => {
    try {
      const fd = tradePersonSignupFormData({
        personal: savedPersonal,
        professional: savedProfessional,
      });
      const entries: Array<[string, string]> = [];
      fd.forEach((value, key) => {
        entries.push([key, String(value)]);
      });
      console.log("[ReviewInfoForm] FormData preview:", entries);
    } catch (err) {
      console.error("[ReviewInfoForm] Failed building FormData preview", err);
    }
  }, [savedPersonal, savedProfessional]);

  // helper to convert dataUrl to base64 payload
  const dataUrlToBase64 = useCallback((dataUrl?: string) => {
    if (!dataUrl) return null;
    const parts = dataUrl.split(",");
    return parts.length > 1 ? parts[1] : parts[0];
  }, []);

  const fileToBinaryObject = useCallback(
    (
      f:
        | { dataUrl?: string; name?: string; type?: string; size?: number }
        | undefined
    ) => {
      if (!f || !f.dataUrl) return null;
      const b64 = dataUrlToBase64(f.dataUrl);
      return {
        filename: f.name ?? undefined,
        contentType: f.type ?? undefined,
        size: f.size ?? undefined,
        $binary: b64,
      };
    },
    [dataUrlToBase64]
  );

  const tradePersonSignupData = useMemo(
    () => ({
      doc: savedProfessional.idFiles,
      docs: {
        type: savedProfessional.idType,
      },
      credential: savedProfessional.credentialsFiles,
      firstName: savedPersonal.firstName,
      lastName: savedPersonal.lastName,
      email: savedPersonal.email,
      phoneNumber: savedPersonal.phone,
      dateOfBirth: savedPersonal.dob,
      address: savedPersonal.street,
      city: savedPersonal.city,
      state: savedPersonal.state,
      zipCode: savedPersonal.zip,
      categoryId: savedProfessional.categoryId,
      subCategories: savedProfessional.subCategoryIds,
      businessDetail: {
        businessName: savedProfessional.businessName,
        yearsOfExperience: savedProfessional.yearsExperience,
        businessType: savedProfessional.businessType,
        hourlyRate: savedProfessional.hourlyRate,
        services: savedProfessional.services,
        professionalDescription: savedProfessional.description,
      },
      serviceArea: {
        address: savedProfessional.serviceAreaCenter?.address,
        latitude: savedProfessional.serviceAreaCenter?.lat,
        longitude: savedProfessional.serviceAreaCenter?.lng,
        radius: savedProfessional.travelDistanceKm,
      },
      paymentMethod: {
        expiryDate: savedProfessional.cardInfo?.expiry,
        cvv: savedProfessional.cardInfo?.cvv,
        cardHolderName: savedProfessional.cardInfo?.holderName,
        city: savedProfessional.cardInfo?.billingAddress?.city,
        saveCard: savedProfessional.cardInfo?.saveCard,
        postCode: savedProfessional.cardInfo?.billingAddress?.postcode,
        provider: "Visa/Mastercard/Amex",
        streetAddress: savedProfessional.cardInfo?.billingAddress?.street,
        agreedToTerms: true,
        cardNumber: savedProfessional.cardInfo?.last4,
        methodType: "Credit/Debit Card",
      },
    }),
    [savedPersonal, savedProfessional]
  );

  console.log("signup data:", tradePersonSignupData);

  useEffect(() => {
    try {
      const fd = new FormData();

      // append simple fields
      Object.entries(tradePersonSignupData).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        // handle doc and credential specially below
        if (k === "doc" || k === "credential") return;
        if (typeof v === "object") {
          fd.append(k, JSON.stringify(v));
        } else {
          fd.append(k, String(v));
        }
      });

      // doc: can be single or array
      const docs = tradePersonSignupData.doc as unknown;
      if (docs) {
        const arr = Array.isArray(docs)
          ? (docs as Array<unknown>)
          : [docs as unknown];
        arr.forEach((f) => {
          const obj = fileToBinaryObject(
            f as {
              dataUrl?: string;
              name?: string;
              type?: string;
              size?: number;
            }
          );
          if (obj) fd.append("doc", JSON.stringify(obj));
        });
      }

      // credential
      const creds = tradePersonSignupData.credential as unknown;
      if (creds) {
        const arr = Array.isArray(creds)
          ? (creds as Array<unknown>)
          : [creds as unknown];
        arr.forEach((f) => {
          const obj = fileToBinaryObject(
            f as {
              dataUrl?: string;
              name?: string;
              type?: string;
              size?: number;
            }
          );
          if (obj) fd.append("credential", JSON.stringify(obj));
        });
      }

      const entries: Array<[string, string]> = [];
      fd.forEach((value, key) => entries.push([key, String(value)]));
      console.log(
        "[ReviewInfoForm] tradePersonSignupData -> FormData:",
        entries
      );
    } catch (err) {
      console.error(
        "[ReviewInfoForm] Failed to convert signup data to FormData",
        err
      );
    }
  }, [tradePersonSignupData, fileToBinaryObject]);

  const handleContinue = async () => {
    try {
      setError("");

      // Validate that documents are uploaded
      const docs = tradePersonSignupData.doc as unknown;
      const hasDocFiles = docs && Array.isArray(docs) && docs.length > 0;

      if (!hasDocFiles) {
        setError("Please upload your identity documents before submitting.");
        console.error(
          "[ReviewInfoForm] No doc files found in tradePersonSignupData"
        );
        return;
      }

      const fd = new FormData();

      // Helper to convert dataURL to Blob/File
      const dataUrlToFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      };

      // Append simple fields (skip doc, docs, credential)
      Object.entries(tradePersonSignupData).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        if (k === "doc" || k === "credential" || k === "docs") return;
        if (typeof v === "object") {
          fd.append(k, JSON.stringify(v));
        } else {
          fd.append(k, String(v));
        }
      });

      // Append docs metadata
      if (tradePersonSignupData.docs) {
        fd.append("docs", JSON.stringify(tradePersonSignupData.docs));
      }

      // Convert and append doc files as actual File objects
      if (docs && Array.isArray(docs)) {
        console.log("[ReviewInfoForm] Processing doc files:", docs.length);
        docs.forEach((f: { dataUrl?: string; name?: string }) => {
          if (f?.dataUrl && f?.name) {
            try {
              const file = dataUrlToFile(f.dataUrl, f.name);
              fd.append("doc", file);
              console.log("[ReviewInfoForm] Added doc file:", f.name);
            } catch (err) {
              console.error(
                "[ReviewInfoForm] Failed to convert doc file:",
                f.name,
                err
              );
            }
          }
        });
      }

      // Convert and append credential files as actual File objects
      const creds = tradePersonSignupData.credential as unknown;
      if (creds && Array.isArray(creds)) {
        console.log(
          "[ReviewInfoForm] Processing credential files:",
          creds.length
        );
        creds.forEach((f: { dataUrl?: string; name?: string }) => {
          if (f?.dataUrl && f?.name) {
            try {
              const file = dataUrlToFile(f.dataUrl, f.name);
              fd.append("credential", file);
              console.log("[ReviewInfoForm] Added credential file:", f.name);
            } catch (err) {
              console.error(
                "[ReviewInfoForm] Failed to convert credential file:",
                f.name,
                err
              );
            }
          }
        });
      }

      // Log FormData contents
      const entries: Array<[string, string]> = [];
      fd.forEach((value, key) => {
        if (value instanceof File) {
          entries.push([key, `[File: ${value.name}]`]);
        } else {
          entries.push([key, String(value)]);
        }
      });
      console.log("[ReviewInfoForm] Submitting FormData:", entries);

      const res = await tradeSignUp(fd).unwrap();

      console.log("[ReviewInfoForm] tradeSignUp response:", res);

      if (res.success) {
        console.log("[ReviewInfoForm] Signup successful, navigating...");
        dispatch(resetTradeForm());
        setError("");
        window.open(res.data.onboardingUrl, "_blank");
        // navigate(`${res.data.onboardingUrl}`);
      } else {
        setError(res.message || "Signup failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("[ReviewInfoForm] tradeSignUp error:", err);
      const message =
        (err as { data?: { message?: string } })?.data?.message ||
        "An error occurred during signup.";
      setError(message);
    }
  };

  const handleClear = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all form data? This action cannot be undone."
      )
    ) {
      console.log("[ReviewInfoForm] Clearing all trade form data");
      dispatch(resetTradeForm());
      setError("");
      navigate("/trade-person/personal-info");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-sm">
      {/* Title */}
      <div className="flex justify-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Review Your Information
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Please review the data you've entered before submission.
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">
            Personal Information
          </h3>
          <p className="text-sm text-gray-600">
            Name: {savedPersonal?.firstName ?? "-"}{" "}
            {savedPersonal?.lastName ?? ""}
          </p>
          <p className="text-sm text-gray-600">
            Email: {savedPersonal?.email ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Phone: {savedPersonal?.phone ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Address: {savedPersonal?.street ?? "-"},{" "}
            {savedPersonal?.city ?? "-"} {savedPersonal?.state ?? ""}{" "}
            {savedPersonal?.zip ?? ""}
          </p>
        </div>

        {/* Professional Info */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">
            Professional Information
          </h3>
          <p className="text-sm text-gray-600">
            Business Name: {savedProfessional?.businessName ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Category ID: {savedProfessional?.categoryId ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Sub categories:{" "}
            {savedProfessional?.subCategoryIds?.join(", ") ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Experience: {savedProfessional?.yearsExperience ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Hourly Rate: {savedProfessional?.hourlyRate ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            Business Type: {savedProfessional?.businessType ?? "-"}
          </p>
        </div>

        {/* Service Area */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Service Area</h3>
          <p className="text-sm text-gray-600">
            Travel Distance:{" "}
            {savedProfessional?.travelDistanceKm
              ? `${savedProfessional.travelDistanceKm} km`
              : "-"}
          </p>
          <p className="text-sm text-gray-600">
            Center:{" "}
            {savedProfessional?.serviceAreaCenter
              ? `${savedProfessional.serviceAreaCenter.lat.toFixed(
                  5
                )}, ${savedProfessional.serviceAreaCenter.lng.toFixed(5)}`
              : "-"}
          </p>
        </div>

        {/* Insurance & Credentials */}
        <div className="border-gray-200 border rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">
            Insurance & Credentials
          </h3>
          <p className="text-sm text-gray-600">
            ID Type: {savedProfessional?.idType ?? "-"}
          </p>
          <p className="text-sm text-gray-600">
            ID Files: {savedProfessional?.idFiles?.length ?? 0} uploaded
          </p>
          <p className="text-sm text-gray-600">
            Credentials: {savedProfessional?.credentialsFiles?.length ?? 0}{" "}
            uploaded
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border-gray-200 border rounded-xl p-4 bg-gray-50 mb-8">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">
          Method: {savedProfessional?.paymentMethod ?? "-"}
        </p>
        <p className="text-sm text-gray-600">
          Card:{" "}
          {savedProfessional?.cardInfo?.last4
            ? `**** **** **** ${savedProfessional.cardInfo.last4}`
            : "-"}
        </p>
        <p className="text-sm text-gray-600">
          Billing Address:{" "}
          {savedProfessional?.cardInfo?.billingAddress
            ? `${savedProfessional.cardInfo.billingAddress.street ?? ""}, ${
                savedProfessional.cardInfo.billingAddress.city ?? ""
              } ${savedProfessional.cardInfo.billingAddress.postcode ?? ""}`
            : "-"}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-16 flex justify-between items-center">
        <div className="flex gap-3">
          <Link to="/trade-person/business-details">
            <button
              className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              disabled={isLoading}
            >
              <ArrowLeft size={18} />
              Previous
            </button>
          </Link>

          <button
            onClick={handleClear}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 border border-red-300 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear All Data
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Continue"}
          {!isLoading && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
