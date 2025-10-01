"use client"

import React from "react"
import { MapPin, Phone, Mail as MailIcon } from "lucide-react"
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="w-full bg-[#001126] text-white py-12">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
        {/* Left: Logo + Social */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <img 
            src="/logo2.png" 
            alt="Logo" 
            className="w-28 sm:w-32 mb-4"
          />
          <div className="flex gap-4 text-lg justify-center sm:justify-start">
            <a 
              href="https://www.instagram.com/saajrarealty?igsh=MWplaTA3MWJ0ZHN1Yg==" 
              aria-label="Instagram" 
              className="hover:text-sky-400"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.facebook.com/share/1F4RnTkWKH/?mibextid=wwXIfr" 
              aria-label="Facebook" 
              className="hover:text-sky-400"
            >
              <FaFacebookF />
            </a>
            {/* <a href="#" aria-label="Twitter" className="hover:text-sky-400"><FaTwitter /></a> */}
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="text-center sm:text-left">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/contactus" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div className="text-center sm:text-left">
          <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
          <p className="flex items-center justify-center sm:justify-start mb-2 text-sm sm:text-base">
            <MapPin className="h-4 w-4 mr-2 shrink-0" /> 
            Sammarth Bunglows, opp.vishwam93, Angola road, Palanpur, 385001
          </p>
          <p className="flex items-center justify-center sm:justify-start mb-2 text-sm sm:text-base">
            <Phone className="h-4 w-4 mr-2 shrink-0" /> 
            Phone: +91 9924555520
          </p>
          <p className="flex items-center justify-center sm:justify-start text-sm sm:text-base">
            <MailIcon className="h-4 w-4 mr-2 shrink-0" /> 
            Email: Info@saajra.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center border-t border-white/20 pt-6">
        <h6 className="text-sm">© 2025 Saajra Realty. All rights reserved.</h6>
      </div>
    </footer>
  )
}
