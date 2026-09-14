import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Rootlayouts() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* হেডার */}
      <Header />

      {/* মূল পেজ কনটেন্ট */}
      <Outlet />

      {/* ফুটার */}
      <Footer />
    </div>
  );
}
