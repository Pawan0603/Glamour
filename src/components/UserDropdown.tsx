import { motion } from "framer-motion";
import { User, CalendarDays, Store, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/contexts/AuthContext";

const UserDropdown = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const menuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: CalendarDays, label: "My Appointments", href: "/my-appointments" },
    { icon: Store, label: "Register My Salon", href: "/register-salon" },
  ];

  if (user.role === "salon_owner" && user.salonId) {
    menuItems.push({
      icon: LayoutDashboard,
      label: "Salon Dashboard",
      href: "/owner/dashboard",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-muted transition-colors outline-none"
        >
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
            {user.name.split(" ")[0]}
          </span>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl p-1.5 bg-popover border border-border shadow-elevated z-50"
      >
        <div className="px-3 py-2.5 mb-1">
          <p className="text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild className="rounded-lg cursor-pointer">
            <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="rounded-lg cursor-pointer text-destructive focus:text-destructive px-3 py-2.5"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span className="text-sm">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
