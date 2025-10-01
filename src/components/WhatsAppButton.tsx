"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "+919924555520", // Replace with your actual WhatsApp number
  message = "Hello! I'm interested in your properties. Could you please provide more information?",
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group">
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 
                   w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
                   bg-green-500 hover:bg-green-600 active:bg-green-700 
                   text-white rounded-full 
                   flex items-center justify-center
                   shadow-lg hover:shadow-xl 
                   transition-all duration-300 ease-in-out
                   transform hover:scale-110 active:scale-95 lg:hover:scale-115
                   focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50
                   animate-pulse
                   cursor-pointer
                   select-none"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 relative z-10" />
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></span>
        
        {/* Tooltip for larger screens */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 
                        bg-gray-900 text-white text-xs sm:text-sm 
                        rounded-lg shadow-lg
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 
                        whitespace-nowrap hidden sm:block pointer-events-none
                        transform translate-x-2">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;