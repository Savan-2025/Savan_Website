// app/contactus/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Link from "next/link";
import { submitContactForm } from "@/lib/api";

export default function ContactPage() {
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
    <main className="flex flex-col">
      {/* Banner Section */}
       <header className="relative w-full h-[520px] sm:h-[420px]">
        <Image src="/banner.jpg" alt="Beautiful homes banner" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute top-6 right-6 z-30 flex items-center gap-6">
          <div className="p-[3px] bg-white/40 rounded-full shadow-lg backdrop-blur-md">
            <Link
              href="/"
              className="flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-md hover:bg-gray-100 transition"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">Home</span>
            </Link>
          </div>
          <div className="p-[3px] bg-white/40 rounded-full shadow-lg backdrop-blur-md">
            <Link
              href="/contactus"
              className="flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-md hover:bg-gray-100 transition"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">Contact Us</span>
            </Link>
          </div>
        </div>
        <div className="relative z-20 container mx-auto h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
              Find Your Perfect Home
              <span className="block text-base sm:text-lg md:text-2xl font-semibold mt-2">
                Smart Search, Trusted Results
              </span>
            </h1>
            <p className="mt-4 text-white/90 text-base sm:text-lg">
              From city lofts to countryside retreats, discover a space that fits your lifestyle
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/enquirenow"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Enquire now
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Get in Touch Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Left Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <h6 className="text-gray-600 mb-8">Have questions or need more details? Our team is here to help you every step of the way. Reach out today - we'd love to hear from you!</h6>
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="flex items-center font-medium"><Phone className="h-4 w-4 mr-2" /> Phone</p>
                <p className="text-gray-600 mt-1">+91 9924555520</p>
              </div>
              <div>
                <p className="flex items-center font-medium"><Mail className="h-4 w-4 mr-2" /> Email</p>
                <p className="text-gray-600 mt-1">Info@saajra.com</p>
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="flex items-center font-medium"><MapPin className="h-4 w-4 mr-2" /> Address</p>
                <p className="text-gray-600 mt-1">Sammarth bunglows, opp.vishwam93  ,Angola road , Palanpur,385001</p>
              </div>
              {/* <div>
                <p className="flex items-center font-medium"><FaInstagram className="h-4 w-4 mr-2" /> Instagram</p>
                <p className="text-gray-600 mt-1">ddsdfdsffds</p>
              </div> */}
            </div>
            {/* Row 3 */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* <div>
                <p className="flex items-center font-medium"><FaFacebookF className="h-4 w-4 mr-2" /> Facebook</p>
                <p className="text-gray-600 mt-1">fbusername</p>
              </div> */}
              {/* <div>
                <p className="flex items-center font-medium"><FaTwitter className="h-4 w-4 mr-2" /> Twitter</p>
                <p className="text-gray-600 mt-1">twitterhandle</p>
              </div> */}
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>

            {submitStatus && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  submitStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location of Interest"
                className="w-full border rounded-lg px-4 py-2"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-white font-medium ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section
      <section className="w-full h-[400px] relative">
        <Image src="/map.png" alt="Map location" fill className="object-cover" />
      </section> */}

      {/* Footer */}
      <Footer />
    </main>
  );
}
