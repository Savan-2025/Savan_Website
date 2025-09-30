"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Mail, MapPin, Tag, IndianRupee, Ruler } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchAllProperties, LOCAL_BASE_URL } from "@/lib/api";
import { Property } from "@/types";

export default function PropertyListClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<string>("Property List");
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const limit = 10;

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const response = await fetchAllProperties(currentPage, limit, selectedCategory, projectId || "");
        setProperties(response.properties);
        setTotalProperties(response.total);

        if (projectId && response.properties.length > 0) {
          setPageTitle(`Properties in ${response.properties[0].projectId?.projectName || "Project"}`);
        } else if (projectId && response.properties.length === 0) {
          setPageTitle("No Properties Found for Project");
        } else if (selectedCategory && response.properties.length === 0) {
          setPageTitle(`No ${selectedCategory} Properties Found`);
        } else if (selectedCategory) {
          setPageTitle(`${selectedCategory} Properties`);
        } else {
          setPageTitle("Property List");
        }
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [projectId, currentPage, selectedCategory]);

  const formatBudget = (budget: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(budget);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === "All" ? undefined : category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
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

      {/* Properties Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{pageTitle}</h2>
          <h6 className="text-muted-foreground text-base md:text-lg max-w-xl">
            {totalProperties} properties found
          </h6>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">
              {selectedCategory
                ? `No ${selectedCategory} Properties Found`
                : projectId
                ? "No Properties Found for Project"
                : "No Properties Found"}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
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
                  {property.projectId && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {property.projectId.projectName}
                      </span>
                    </div>
                  )}
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

        {/* Pagination */}
        {totalProperties > limit && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {Math.ceil(totalProperties / limit)}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= Math.ceil(totalProperties / limit)}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
