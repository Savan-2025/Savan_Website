// app/enquirenow/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Mail, MapPin, Tag, IndianRupee, Ruler, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { submitContactForm } from "@/lib/api";

export default function EnquireNowPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await submitContactForm({
        ...formData,
        budget: parseInt(formData.budget) || 0,
      });
      setSubmitStatus({ success: true, message: response.message });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        budget: "",
        location: "",
      });
    } catch (error) {
      setSubmitStatus({ success: false, message: error instanceof Error ? error.message : "Failed to submit form" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to find your dream property?</h2>
            <h6 className="text-gray-500 text-base md:text-lg mb-6">
              Fill out our smart enquiry form and our experts will get back to you within 24 hours with personalized property recommendations.
            </h6>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-base text-gray-700">
                <CheckCircle className="text-green-500 h-5 w-5" /> Free property consultation
              </li>
              <li className="flex items-center gap-3 text-base text-gray-700">
                <CheckCircle className="text-green-500 h-5 w-5" /> Instant WhatsApp updates
              </li>
              <li className="flex items-center gap-3 text-base text-gray-700">
                <CheckCircle className="text-green-500 h-5 w-5" /> Dedicated Relationship Manager
              </li>
            </ul>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-6">Get Started Today</h3>

            {submitStatus && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  submitStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div> 
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter budget range"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location of Interest</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div> */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-white font-semibold shadow-md hover:scale-105 transition-transform ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
