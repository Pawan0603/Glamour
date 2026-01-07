'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import SalonCard from '@/components/salon/SalonCard';

const mockSalons = [
    {
        id: "1",
        name: "Elite Cuts Studio",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
        location: "Koramangala, Bangalore",
        description: "Premium unisex salon offering cutting-edge styles and luxurious treatments.",
        rating: 4.8,
        category: "Unisex",
    },
    {
        id: "2",
        name: "Glamour & Grace",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
        location: "Indiranagar, Bangalore",
        description: "Exclusive women's beauty parlour specializing in bridal and party makeup.",
        rating: 4.9,
        category: "Women",
    },
    {
        id: "3",
        name: "The Gentlemen's Lounge",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
        location: "HSR Layout, Bangalore",
        description: "Classic barbershop experience with modern grooming services for men.",
        rating: 4.7,
        category: "Men",
    },
    {
        id: "4",
        name: "Style Avenue",
        image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800",
        location: "Whitefield, Bangalore",
        description: "Contemporary salon with expert stylists and organic beauty products.",
        rating: 4.6,
        category: "Unisex",
    },
    {
        id: "5",
        name: "Beauty Bliss",
        image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800",
        location: "JP Nagar, Bangalore",
        description: "Full-service beauty destination for all your pampering needs.",
        rating: 4.5,
        category: "Women",
    },
    {
        id: "6",
        name: "Urban Barbers",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800",
        location: "MG Road, Bangalore",
        description: "Trendy barbershop with skilled barbers and relaxed atmosphere.",
        rating: 4.8,
        category: "Men",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    const filteredSalons = mockSalons.filter((salon) => {
        const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            salon.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = salon.location.toLowerCase().includes(locationQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || salon.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesLocation && matchesCategory;
    });
    
    return (
        <div className="min-h-screen bg-background">

            {/* Hero Section */}
            <section className="pt-20 md:pt-24 pb-6 md:pb-8 px-4 sm:px-6 bg-gradient-to-b from-primary/5 to-background">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center mb-6 md:mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 md:mb-4">
                            Find Salons Near You
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-2">
                            Discover the best salons and beauty parlours in your area
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="sticky top-16 md:top-20 z-40 glass rounded-2xl shadow-card p-4 md:p-6"
                    >
                        <div className="flex flex-col gap-3 md:gap-4">
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Search salons or services..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 h-11 md:h-12 text-sm md:text-base"
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Enter location..."
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                        className="pl-10 h-11 md:h-12 text-sm md:text-base"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 sm:gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none h-11 md:h-12 px-4 md:px-6 touch-target"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    <span className="hidden xs:inline">Filters</span>
                                </Button>
                                <Button className="flex-1 sm:flex-none h-11 md:h-12 px-6 md:px-8 touch-target">
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Filter Panel */}
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 pt-4 border-t border-border"
                            >
                                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 md:gap-6">
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block">Category</Label>
                                        <RadioGroup
                                            value={selectedCategory}
                                            onValueChange={setSelectedCategory}
                                            className="flex flex-wrap gap-3 md:gap-4"
                                        >
                                            {["all", "men", "women", "unisex"].map((cat) => (
                                                <div key={cat} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={cat} id={cat} />
                                                    <Label htmlFor={cat} className="capitalize cursor-pointer text-sm">
                                                        {cat === "all" ? "All" : cat}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    {(selectedCategory !== "all" || searchQuery || locationQuery) && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedCategory("all");
                                                setSearchQuery("");
                                                setLocationQuery("");
                                            }}
                                            className="text-muted-foreground"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Clear filters
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Salon Grid */}
            <section className="py-8 md:py-12 px-4 sm:px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex justify-between items-center mb-6 md:mb-8">
                        <p className="text-sm md:text-base text-muted-foreground">
                            <span className="font-semibold text-foreground">{filteredSalons.length}</span> salons found
                        </p>
                    </div>

                    {filteredSalons.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                        >
                            {filteredSalons.map((salon) => (
                                <motion.div key={salon.id} variants={itemVariants}>
                                    <SalonCard {...salon} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 md:py-16"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">No salons found</h3>
                            <p className="text-sm md:text-base text-muted-foreground">Try adjusting your search or filters</p>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}