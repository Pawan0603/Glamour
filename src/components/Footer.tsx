"use client";

import { motion } from "framer-motion";
import {
  Scissors,
  Facebook,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";
import Link from "next/link";

type FooterLink = {
  name: string;
  href: string;
};

type FooterLinks = {
  company: FooterLink[];
  support: FooterLink[];
  business: FooterLink[];
  legal: FooterLink[];
};

export default function Footer() {
  const footerLinks: FooterLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Community", href: "/community" },
    ],
    business: [
      { name: "For Salon Owners", href: "/business" },
      { name: "Partner With Us", href: "/partner" },
      { name: "Pricing", href: "/pricing" },
      { name: "Success Stories", href: "/stories" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-3 lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                <Scissors className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl md:text-2xl font-semibold">
                Glamour
              </span>
            </Link>

            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Your one-stop destination for discovering and booking the best
              beauty services in your area.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-semibold mb-4 capitalize text-sm md:text-base">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-px bg-border my-10"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2024 Glamour. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/accessibility"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
