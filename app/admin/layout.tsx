"use client";

import type { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

/**
 * Layout component for the admin panel providing a top bar and responsive sidebar navigation.
 *
 * The sidebar supports open/close on small screens and collapse/expand on large screens; the
 * collapsed preference is persisted to localStorage under the key "admin-sidebar-collapsed".
 *
 * @param children - Content to render in the main panel area to the right of the sidebar
 * @returns The admin layout element containing the header, navigation sidebar, and main content
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin-sidebar-collapsed");
      if (saved === "true") {
        setSidebarCollapsed(true);
      }
    } catch (error) {
      console.warn("localStorage is not available:", error);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("admin-sidebar-collapsed", String(newState));
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/lab-manuals", label: "Lab Manuals" },
    { href: "/admin/qps", label: "Question Papers" },
    { href: "/admin/textbooks", label: "Textbooks" },
    { href: "/admin/syllabus", label: "Syllabus" },
    { href: "/admin/announcements", label: "Announcements" },
    { href: "/admin/analytics", label: "Analytics" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="fixed inset-0 grid-bg pointer-events-none -z-10" />
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <h1 className="text-lg sm:text-xl font-semibold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              onClick={handleSignOut}
              size="sm"
              className="bg-black text-white hover:bg-black/90 border border-black"
              disabled={isSigningOut}
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside
            className={`
              ${sidebarOpen ? "block" : "hidden"}
              lg:block
              ${sidebarCollapsed ? "lg:w-16" : "lg:w-56"}
              shrink-0
              transition-all duration-300
              bg-card border border-border rounded-lg
              p-4 lg:p-0 lg:bg-transparent lg:border-0
              space-y-2 text-sm
              relative lg:sticky lg:top-24 h-fit
            `}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex absolute -right-3 top-4 bg-background border border-border shadow-sm hover:bg-muted z-10"
              onClick={toggleSidebar}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-3 py-2 rounded-md transition-colors
                    ${sidebarCollapsed ? "lg:px-2 lg:text-center" : ""}
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className={sidebarCollapsed ? "lg:hidden" : ""}>
                    {item.label}
                  </span>
                  {sidebarCollapsed && (
                    <span
                      className="hidden lg:block text-xs truncate"
                      title={item.label}
                    >
                      {item.label.charAt(0)}
                    </span>
                  )}
                </Link>
              );
            })}
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
