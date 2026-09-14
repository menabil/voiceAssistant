import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Settings", path: "/settings" },
    { name: "About", path: "/about" },
  ];

  return (
    <header style={{ width: "100%", backgroundColor: "#020617", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        
        {/* বাম পাশ: লোগো ও ব্র্যান্ড নেম */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#22d3ee", fontSize: "18px" }}>
            🤖
          </div>
          <div>
            <h1 style={{ fontSize: "14px", fontWeight: "bold", color: "#f1f5f9", margin: 0 }}>
              FRIDAY <span style={{ color: "#22d3ee", fontWeight: "normal" }}>AI</span>
            </h1>
            <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>Voice Companion</p>
          </div>
        </div>

        {/* ডান পাশ: নেভিগেশন লিংকগুলো একটার পর একটা (Horizontal Row) এবং স্ট্যাটাস */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          
          {/* ডেস্কটপ মেনু লিংক */}
          <nav style={{ display: "none", alignItems: "center", gap: "20px" }} className="md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: "13px",
                  fontWeight: "500",
                  textDecoration: "none",
                  color: isActive ? "#22d3ee" : "#94a3b8",
                  transition: "color 0.2s",
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* অনলাইন স্ট্যাটাস */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "9999px", fontSize: "11px", color: "#94a3b8" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }}></span>
            <span>Online</span>
          </div>

          {/* মোবাইল রেসপন্সিভ টগল বাটন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            style={{ padding: "8px", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", color: "#f1f5f9", cursor: "pointer" }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div style={{ backgroundColor: "#020617", borderBottom: "1px solid #1e293b", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px" }} className="md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => ({
                fontSize: "14px",
                textDecoration: "none",
                color: isActive ? "#22d3ee" : "#94a3b8",
                fontWeight: isActive ? "600" : "400",
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}