import React from "react";
import { Navbar } from "..";
import Footer from "../Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="bg-white w-full min-h-screen grid grid-cols-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
