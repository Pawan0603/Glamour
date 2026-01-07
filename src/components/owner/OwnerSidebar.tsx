'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { NavLink, useLocation } from "react-router-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Scissors,
  Users,
  Calendar,
  User,
  Menu,
  X,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
  { title: "Services", href: "/owner/services", icon: Scissors },
  { title: "Barbers", href: "/owner/barbers", icon: Users },
  { title: "Appointments", href: "/owner/appointments", icon: Calendar },
  { title: "Profile", href: "/owner/profile", icon: User },
];

export function OwnerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = usePathname();

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ justifyContent: isCollapsed && !mobile ? "center" : "flex-start" }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Scissors className="w-5 h-5 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {(!isCollapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-display text-xl font-semibold text-foreground overflow-hidden whitespace-nowrap"
              >
                Glamour
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setIsMobileOpen(false)}
            >
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {(!isCollapsed || mobile) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium overflow-hidden whitespace-nowrap"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <motion.button
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            isCollapsed && !mobile && "justify-center"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {(!isCollapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium overflow-hidden whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex flex-col bg-card border-r border-border h-screen sticky top-0"
        variants={sidebarVariants}
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <SidebarContent />
        
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors touch-target"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </button>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-lg border-b border-border z-40 flex items-center px-4 safe-top">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="touch-target"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Scissors className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold">Glamour</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] sm:w-72 bg-card z-50 safe-top safe-bottom"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 touch-target"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
