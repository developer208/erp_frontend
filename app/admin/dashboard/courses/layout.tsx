"use client";
import React, { useEffect } from "react";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <section>{children}</section>;
}
