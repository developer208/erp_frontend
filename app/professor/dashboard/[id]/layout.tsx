"use client";
import ProfNavbar from "@/app/components/Navbar/profNavbar";
import React, { useEffect } from "react";

type Props = {};

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="bg-[#DDDCDC]">
      <ProfNavbar />
      {children}
    </section>
  );
}
