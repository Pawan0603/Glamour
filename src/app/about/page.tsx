"use client";
import { motion } from "framer-motion";
import { Heart, Users, Award, Sparkles, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Happy Clients", value: "50K+", icon: Heart },
  { label: "Partner Salons", value: "500+", icon: MapPin },
  { label: "Appointments Booked", value: "200K+", icon: Calendar },
  { label: "Awards Won", value: "15+", icon: Award },
];

const team = [
  { name: "Pawan Thakre", role: "Founder & CEO", img: "/pawan3.jpg" },
  { name: "Ashwin Wadaskar", role: " Co-founder", img: "ashwin.png" },
  { name: "Achal Sharma", role: "Lead Designer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" },
  { name: "David Kim", role: "Engineering Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
];

const values = [
  { icon: Sparkles, title: "Quality First", desc: "We partner only with top-rated salons that meet our strict quality standards." },
  { icon: Heart, title: "Customer Love", desc: "Every feature we build starts with our customers' needs and feedback." },
  { icon: Users, title: "Community Driven", desc: "We empower local beauty professionals and help them grow their businesses." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              About Glamour
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Making Beauty{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Accessible
              </span>{" "}
              to Everyone
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              We're on a mission to connect people with the best beauty professionals in their area, making it effortless to look and feel amazing.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Glamour was born from a simple frustration — finding and booking a great salon shouldn't be hard. In 2025, our founder Pawan spent hours searching for a reliable hairstylist in a new city.
                </p>
                <p>
                  That experience sparked an idea: what if there was a platform that curated the best beauty professionals, showed real reviews, and let you book instantly?
                </p>
                <p>
                  Today, Glamour connects thousands of clients with top-rated salons every day, and we're just getting started.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-elevated"
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=500&fit=crop"
                alt="Inside a modern beauty salon"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
            >
              What We Stand For
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-sm text-center"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-5">
                    <v.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
            >
              Meet the Team
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-border">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{member.name}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
