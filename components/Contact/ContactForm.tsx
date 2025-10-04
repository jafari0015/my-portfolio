import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Sending your message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Email received successfully! We'll be in touch soon.", {
          id: toastId,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="backImage lightBackImage border-[1px] border-stone-300 p-6 rounded-2xl mt-10 dark:border-stone-700 
                    lg:max-w-[700px] 2xl:max-w-[800px]"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:w-[350px] xl:w-[500px]"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-slate-400 bg-transparent border-gray-300 dark:border-stone-700 dark:text-stone-100 ${
            errors.name ? "border-red-700" : ""
          }`}
        />
        {errors.name && <p className="text-red-700 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-slate-400 bg-transparent border-gray-300 dark:border-stone-700 dark:text-stone-100 ${
            errors.email ? "border-red-700" : ""
          }`}
        />
        {errors.email && <p className="text-red-700 text-sm">{errors.email}</p>}

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg border h-32 min-h-[128px] resize-none focus:outline-none focus:ring-1 focus:ring-slate-400 bg-transparent border-gray-300 dark:border-stone-600 dark:text-stone-100 ${
            errors.message ? "border-red-700" : ""
          }`}
        />
        {errors.message && (
          <p className="text-red-700 text-sm">{errors.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full dark:bg-[#c8f31d] bg-green-800 text-stone-950 font-semibold p-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
