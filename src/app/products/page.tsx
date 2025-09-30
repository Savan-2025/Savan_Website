// app/productpage/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Mail, MapPin, Tag } from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { fetchProjects, LOCAL_BASE_URL } from "@/lib/api";
import { Project } from "@/types";

export default function Productpage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(1, 6); // Fetch 6 projects for the product page
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

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
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-left mb-12"
        >
          Our Projects
        </motion.h2>

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
              <Link href={`/projects/${project._id}`} key={project._id}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={project?.imageUrl ? `${LOCAL_BASE_URL}${project.imageUrl}` : "/banner.jpg"}
                      alt={project.projectName}
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

      <Footer />
    </div>
  );
}
