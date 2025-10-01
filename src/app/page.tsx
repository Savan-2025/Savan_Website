"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Mail, MapPin, Tag, IndianRupee, Ruler, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { fetchProjects, fetchAllProperties, submitContactForm, LOCAL_BASE_URL } from "@/lib/api";
import { Project, Property } from "@/types";





export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  console.log("qqqqqqqqqqqqqq...",projects[0]?.images[0]?.url);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [propertiesLoading, setPropertiesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [propertiesError, setPropertiesError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const loadProperties = async () => {
      try {
        setPropertiesLoading(true);
        const response = await fetchAllProperties(1, 10, selectedCategory);
        setProperties(response.properties);
      } catch (err) {
        setPropertiesError("Failed to load properties. Please try again later.");
      } finally {
        setPropertiesLoading(false);
      }
    };

    loadProjects();
    loadProperties();
  }, [selectedCategory]);

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

  const formatBudget = (budget: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(budget);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? undefined : category);
  };

  return (
    <div>
      {/* Hero Banner */}
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
      {/* Our Projects Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-left"
          >
            Our Projects
          </motion.h2>
          <Link href="/products">
            <motion.h6
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
            >
              See all →
            </motion.h6>
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link href={`/propertylist?projectId=${project._id}`} key={project._id}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
                >
                  <div className="relative h-56 w-full">
                    <Image
    src={
      project.images && project.images.length > 0
        ? project.images[0].url
        : "/banner.jpg"
    }
    alt={project.projectName || "Project Image"}
    fill
    className="object-cover"
  />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-semibold">{project.projectName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {project.city}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Tag className="h-4 w-4" /> {project.category}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
      {/* Find the Right Properties Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Find the Right Properties</h2>
          <h6 className="text-muted-foreground text-base md:text-lg max-w-xl">
            Find properties that match your purpose – whether it's for living, investing, farming, or commercial use.
          </h6>
        </div>
        <div className="flex flex-wrap gap-3 mb-12">
          {["All", "Residential", "Commercial", "Industrial", "Agricultural"].map((label) => (
            <button
              key={label}
              onClick={() => handleCategoryChange(label)}
              className={`px-5 py-2 rounded-full border border-gray-300 text-sm font-medium transition ${
                selectedCategory === (label === 'All' ? undefined : label)
                  ? 'bg-sky-500 text-white'
                  : 'bg-white hover:bg-sky-500 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {propertiesLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading properties...</p>
          </div>
        ) : propertiesError ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{propertiesError}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{selectedCategory ? `No ${selectedCategory} Properties Found` : 'No Properties Found'}</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-white"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={property.imageUrl ? `${LOCAL_BASE_URL}${property.imageUrl}` : "/banner.jpg"}
                    alt={property.propertyName}
                    fill
                    className="object-cover"
                  />
                </div>
              <div className="p-5 space-y-3">
  <h3 className="text-lg font-semibold">{property.propertyName}</h3>

  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <MapPin className="h-4 w-4" /> {property.location}
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <IndianRupee className="h-4 w-4" /> {formatBudget(property.budget)}
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Ruler className="h-4 w-4" /> {property.propertyArea}
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Tag className="h-4 w-4" /> {property.category}
  </div>

  {/* Keep space reserved even if projectId is missing */}
  <div className="flex items-center gap-2 text-sm text-muted-foreground min-h-[24px]">
    {property.projectId && (
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
        {property.projectId.projectName || "N/A"}
      </span>
    )}
  </div>

  <div className="pt-3">
    <Link
      href="/enquirenow"
      className="inline-flex items-center justify-center w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 transition-transform"
    >
      Enquire now
    </Link>
  </div>
</div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      {/* Our Properties Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Our Properties</h2>
          <h6 className="text-muted-foreground text-base md:text-lg max-w-xl">
            Find properties that match your purpose – whether it's for living, investing, farming, or commercial use.
          </h6>
        </div>
        {propertiesLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading properties...</p>
          </div>
        ) : propertiesError ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{propertiesError}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{selectedCategory ? `No ${selectedCategory} Properties Found` : 'No Properties Found'}</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-white"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={property.imageUrl ? `${LOCAL_BASE_URL}${property.imageUrl}` : "/banner.jpg"}
                    alt={property.propertyName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold">{property.propertyName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {property.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IndianRupee className="h-4 w-4" /> {formatBudget(property.budget)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Ruler className="h-4 w-4" /> {property.propertyArea}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" /> {property.category}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground min-h-[28px]">
  {property.projectId?.projectName && (
    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
      {property.projectId.projectName}
    </span>
  )}
</div>
                  <div className="pt-3">
                    <Link
                      href="/enquirenow"
                      className="inline-flex items-center justify-center w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 transition-transform"
                    >
                      Enquire now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      {/* Ready to Find Your Dream Property Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-white font-semibold shadow-md ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105 transition-transform"
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