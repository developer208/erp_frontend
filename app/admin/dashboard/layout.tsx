"use client";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />

      {children}
    </section>
  );
}
