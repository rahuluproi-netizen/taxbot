"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on desktop
  const navStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "var(--surface)",
    borderTop: "1px solid var(--border)",
    display: "flex",
    justifyContent: "space-around",
    padding: "0.75rem 0",
    zIndex: 900,
    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
  };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "0.7rem",
    color: active ? "var(--primary)" : "var(--text-secondary)",
    textDecoration: "none",
    gap: "4px",
  });

  return (
    <nav
      aria-label="Mobile Navigation"
      className="mobile-only"
      style={navStyle}
    >
      <Link
        href="/dashboard"
        aria-current={pathname === "/dashboard" ? "page" : undefined}
        style={linkStyle(pathname === "/dashboard")}
      >
        <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
          🏠
        </span>
        <span>Home</span>
      </Link>
      <Link
        href="/chat"
        aria-current={pathname === "/chat" ? "page" : undefined}
        style={linkStyle(pathname === "/chat")}
      >
        <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
          💬
        </span>
        <span>AI Assistant</span>
      </Link>
      <Link
        href="/login"
        aria-current={pathname === "/login" ? "page" : undefined}
        onClick={() => localStorage.clear()}
        style={linkStyle(pathname === "/login")}
      >
        <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
          👤
        </span>
        <span>Profile</span>
      </Link>
    </nav>
  );
}
