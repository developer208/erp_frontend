import StudNavbar from "@/app/components/Navbar/studentNavbar";
import React from "react";

type Props = {};

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <StudNavbar />
      {children}
    </section>
  );
}
