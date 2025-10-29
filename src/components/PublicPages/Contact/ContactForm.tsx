import { Button } from "@/components/ui/button";
import { usePostContactMutation } from "@/redux/features/contact/contactApi";
import React, { useState } from "react";
import toast from "react-hot-toast";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  acceptedTerms: boolean;
};

const ContactSection: React.FC = () => {
  const [postContact, { isLoading }] = usePostContactMutation();

  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    message: "",
    acceptedTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, type, value, checked } = target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else if (target instanceof HTMLTextAreaElement) {
      const { name, value } = target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postContact(formData).unwrap();
      setFormData({ name: "", email: "", message: "", acceptedTerms: false });
      toast.success(res?.message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Map */}
        <div className="w-full h-96 md:h-full">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2681.3870169798357!2d17.107748315592637!3d48.15868107922571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c893456f91e37%3A0x400f7d1c697f460!2sBratislava%2C%20Slovakia!5e0!3m2!1sen!2s!4v1634148349926!5m2!1sen!2s"
            className="w-full h-full rounded-md"
            loading="lazy"
          ></iframe>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or need help? Contact our team today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                id="terms"
                name="acceptedTerms"
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I accept the{" "}
                <a href="#" className="text-gray-800 underline">
                  Terms
                </a>
              </label>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-36 bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            >
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
