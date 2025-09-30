import { Suspense } from "react";
import Footer from "@/components/Footer";
import PropertyListClient from "./PropertyListClient";

export default function PropertyListPage() {
  return (
    <div>
      {/* Wrap client component with Suspense */}
      <Suspense fallback={<p className="text-center py-20">Loading properties...</p>}>
        <PropertyListClient />
      </Suspense>
      <Footer />
    </div>
  );
}
