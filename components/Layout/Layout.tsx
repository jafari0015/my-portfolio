// components/Layout.tsx
"use client";

import React from "react";
import Navbar from "@/components/Navigation/DesktopNav";
import Footer from "@/components/footer/Footer";
// import ScrollProgress from "@/components/UI/ScrollProgress";
import Background from "@/components/Background/Background";
import MobileNavbar from "../Navigation/MobileNav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <MobileNavbar  />
      {/* <ScrollProgress /> */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
