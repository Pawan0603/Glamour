"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scissors } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";


type NavLink = {
  name: string;
  href: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  
  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Salons", href: "/salons" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if(pathname === "/auth" || pathname === "/owner/dashboard" || pathname === "/owner/services" || pathname === "/owner/barbers" || pathname === "/owner/appointments" || pathname === "/owner/profile") {
    return null; // Do not render Navbar on /auth page
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled
        ? "bg-[#ffffffdb] backdrop-blur-lg border-b border-border shadow-sm"
        : "bg-[#ffffff94] backdrop-blur-md border-b border-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between max-w-7xl m-auto h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                <Scissors className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="font-display text-lg md:text-2xl font-semibold">
                Glamour
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.2 }}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                    ? "text-[#FF6633] bg-[#FF6633]/10"
                    : "text-[#140a2d] hover:text-foreground hover:bg-[#1e145f]/3"
                    }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/auth">
                <Button variant="ghost" className="font-medium hover:bg-[#fc7d52] hover:text-white cursor-pointer">Login</Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/auth">
                <Button className="gradient-primary shadow-soft font-medium text-white">
                  Register
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted touch-target"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors ${pathname === link.href
                        ? "text-[#FF6633] bg-[#FF6633]/10"
                        : "text-[#140a2d] hover:text-foreground hover:bg-[#1e145f]/3"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 flex flex-col gap-2 border-t border-border mt-2">
                  <Link href="/auth">
                    <Button variant="outline" className="w-full h-12">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="w-full h-12 gradient-primary shadow-soft">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
