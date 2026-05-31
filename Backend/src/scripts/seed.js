/**
 * Seed Script — Inserts dummy data for testing the dashboard endpoint.
 *
 * Usage:  node src/scripts/seed.js
 *
 * ⚠️  This will DROP existing data in: users, destinations, trips, tripdestinations
 *     Run only on a development database.
 */

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Destination from "../models/destination.model.js";
import Trip from "../models/trip.model.js";
import TripDestination from "../models/tripdestination.model.js";

const SALT_ROUNDS = 10;
const DEFAULT_PASSWORD = "Test@123";

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // ── Clear existing data ──────────────────────────────────
        await Promise.all([
            User.deleteMany({}),
            Destination.deleteMany({}),
            Trip.deleteMany({}),
            TripDestination.deleteMany({}),
        ]);
        console.log("🗑️  Cleared all collections");

        // ── 1. Users (1 regular + 3 guides) ─────────────────────
        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);

        const users = await User.insertMany([
            {
                fullName: "Rupesh Kumar",
                email: "rupesh@test.com",
                password: hashedPassword,
                phone: "9876543210",
                role: "user",
            },
            {
                fullName: "Arjun Mehta",
                email: "arjun@test.com",
                password: hashedPassword,
                phone: "9876543211",
                role: "guide",
                ProfilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
                fullName: "Priya Sharma",
                email: "priya@test.com",
                password: hashedPassword,
                phone: "9876543212",
                role: "guide",
                ProfilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
                fullName: "Vikram Singh",
                email: "vikram@test.com",
                password: hashedPassword,
                phone: "9876543213",
                role: "guide",
                ProfilePicture: "https://randomuser.me/api/portraits/men/65.jpg",
            },
        ]);

        const mainUser = users[0];
        console.log(`👤 Created ${users.length} users (login: rupesh@test.com / ${DEFAULT_PASSWORD})`);

        // ── 2. Destinations (10 Indian spots) ───────────────────
        const destinations = await Destination.insertMany([
            {
                name: "Taj Mahal",
                city: "agra",
                state: "uttar pradesh",
                country: "india",
                description: "One of the Seven Wonders of the World, a white marble mausoleum built by Mughal Emperor Shah Jahan.",
                images: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800"],
                bestTimeToVisit: "October to March",
                estimatedBudget: 2000,
                category: "heritage",
                tags: ["monument", "heritage", "wonder"],
            },
            {
                name: "Jaipur City Palace",
                city: "jaipur",
                state: "rajasthan",
                country: "india",
                description: "A stunning blend of Rajasthani and Mughal architecture, home to the royal family.",
                images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800"],
                bestTimeToVisit: "November to February",
                estimatedBudget: 3000,
                category: "heritage",
                tags: ["palace", "heritage", "rajasthan"],
            },
            {
                name: "Backwaters of Alleppey",
                city: "alleppey",
                state: "kerala",
                country: "india",
                description: "Serene network of canals, lagoons and lakes lined with palm trees.",
                images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"],
                bestTimeToVisit: "September to March",
                estimatedBudget: 5000,
                category: "nature",
                tags: ["backwaters", "houseboat", "kerala"],
            },
            {
                name: "Varanasi Ghats",
                city: "varanasi",
                state: "uttar pradesh",
                country: "india",
                description: "One of the oldest living cities in the world, famous for its ghats along the Ganges.",
                images: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800"],
                bestTimeToVisit: "October to March",
                estimatedBudget: 1500,
                category: "spiritual",
                tags: ["spiritual", "ganga", "heritage"],
            },
            {
                name: "Leh Ladakh",
                city: "leh",
                state: "ladakh",
                country: "india",
                description: "High-altitude desert with breathtaking landscapes, monasteries, and adventure routes.",
                images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"],
                bestTimeToVisit: "June to September",
                estimatedBudget: 15000,
                category: "adventure",
                tags: ["mountains", "adventure", "road-trip"],
            },
            {
                name: "Goa Beaches",
                city: "panaji",
                state: "goa",
                country: "india",
                description: "India's beach paradise with golden sands, nightlife, and Portuguese heritage.",
                images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"],
                bestTimeToVisit: "November to February",
                estimatedBudget: 8000,
                category: "beach",
                tags: ["beach", "nightlife", "water-sports"],
            },
            {
                name: "Munnar Tea Gardens",
                city: "munnar",
                state: "kerala",
                country: "india",
                description: "Rolling hills covered in tea plantations, a perfect hill station retreat.",
                images: ["https://images.unsplash.com/photo-1625633716457-b5487e7f9998?w=800"],
                bestTimeToVisit: "September to May",
                estimatedBudget: 4000,
                category: "nature",
                tags: ["tea", "hills", "nature"],
            },
            {
                name: "Hampi Ruins",
                city: "hampi",
                state: "karnataka",
                country: "india",
                description: "UNESCO World Heritage Site with ancient Vijayanagara Empire ruins and boulder landscapes.",
                images: ["https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800"],
                bestTimeToVisit: "October to February",
                estimatedBudget: 2500,
                category: "heritage",
                tags: ["ruins", "heritage", "unesco"],
            },
            {
                name: "Rishikesh Adventure",
                city: "rishikesh",
                state: "uttarakhand",
                country: "india",
                description: "The yoga capital of the world, also famous for river rafting and bungee jumping.",
                images: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800"],
                bestTimeToVisit: "September to November",
                estimatedBudget: 3500,
                category: "adventure",
                tags: ["yoga", "rafting", "adventure"],
            },
            {
                name: "Udaipur Lake Palace",
                city: "udaipur",
                state: "rajasthan",
                country: "india",
                description: "The City of Lakes with romantic palaces floating on serene waters.",
                images: ["https://images.unsplash.com/photo-1585135497273-1a86d9471b8e?w=800"],
                bestTimeToVisit: "September to March",
                estimatedBudget: 6000,
                category: "heritage",
                tags: ["lake", "palace", "romantic"],
            },
        ]);

        console.log(`📍 Created ${destinations.length} destinations`);

        // ── 3. Trips (2 past + 2 upcoming) ──────────────────────
        const now = new Date();

        const trips = await Trip.insertMany([
            // Past trip 1 — Rajasthan Heritage Tour (ended 2 months ago)
            {
                title: "Rajasthan Heritage Tour",
                description: "Exploring the royal palaces and forts of Rajasthan",
                category: "heritage",
                bannerImage: "https://images.unsplash.com/photo-1510133744874-0968eb3aa0db?q=80&w=2070&auto=format&fit=crop",
                startDate: new Date(now.getFullYear(), now.getMonth() - 3, 10),
                endDate: new Date(now.getFullYear(), now.getMonth() - 2, 5),
                totalBudget: 25000,
                createdBy: mainUser._id,
                destinations: [destinations[1]._id, destinations[9]._id],
            },
            // Past trip 2 — Kerala Backwaters (ended 1 month ago)
            {
                title: "Kerala Backwaters Escape",
                description: "Houseboat stay and tea garden visit in God's Own Country",
                category: "nature",
                bannerImage: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
                startDate: new Date(now.getFullYear(), now.getMonth() - 2, 15),
                endDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
                totalBudget: 18000,
                createdBy: mainUser._id,
                destinations: [destinations[2]._id, destinations[6]._id],
            },
            // Upcoming trip 1 — starts next month
            {
                title: "Ladakh Road Trip",
                description: "Bike trip through the highest motorable roads in the world",
                category: "adventure",
                bannerImage: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop",
                startDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
                endDate: new Date(now.getFullYear(), now.getMonth() + 1, 15),
                totalBudget: 35000,
                createdBy: mainUser._id,
                destinations: [destinations[4]._id],
            },
            // Upcoming trip 2 — starts in 2 months
            {
                title: "Goa Beach Vacation",
                description: "Sun, sand, and seafood on the western coast",
                category: "relaxation",
                bannerImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
                startDate: new Date(now.getFullYear(), now.getMonth() + 2, 10),
                endDate: new Date(now.getFullYear(), now.getMonth() + 2, 17),
                totalBudget: 20000,
                createdBy: mainUser._id,
                destinations: [destinations[5]._id],
            },
        ]);

        console.log(`✈️  Created ${trips.length} trips (2 past + 2 upcoming)`);

        // ── 4. TripDestinations (linking trips ↔ destinations) ──
        const tripDestinations = await TripDestination.insertMany([
            // Rajasthan Heritage Tour
            {
                trip: trips[0]._id,
                destination: destinations[1]._id, // Jaipur
                arrivalDate: trips[0].startDate,
                departureDate: new Date(now.getFullYear(), now.getMonth() - 3, 20),
                estimatedBudget: 12000,
                notes: "Visit City Palace, Hawa Mahal, Amber Fort",
                order: 1,
                essentialGear: ["Comfortable Shoes", "Sunglasses", "Water Bottle"],
                itinerary: [
                    {
                        dayNumber: 1,
                        theme: "Arrival & City Palace",
                        date: trips[0].startDate,
                        activities: [
                            {
                                time: "10:00 AM",
                                title: "Hotel Check-in & Refresh",
                                description: "Arrive at the heritage hotel and settle in.",
                                activityType: "Leisure"
                            },
                            {
                                time: "01:00 PM",
                                title: "City Palace Exploration",
                                description: "A guided tour of the royal residence.",
                                activityType: "Group Activity",
                                imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800"
                            }
                        ]
                    }
                ]
            },
            {
                trip: trips[0]._id,
                destination: destinations[9]._id, // Udaipur
                arrivalDate: new Date(now.getFullYear(), now.getMonth() - 3, 21),
                departureDate: trips[0].endDate,
                estimatedBudget: 13000,
                notes: "Lake Pichola boat ride, City Palace",
                order: 2,
                essentialGear: ["Camera", "Light Jacket", "Walking Shoes"],
                itinerary: [
                    {
                        dayNumber: 1,
                        theme: "City of Lakes",
                        date: new Date(now.getFullYear(), now.getMonth() - 3, 21),
                        activities: [
                            {
                                time: "04:00 PM",
                                title: "Boat Ride on Lake Pichola",
                                description: "Enjoy a serene boat ride viewing the floating palaces during sunset.",
                                activityType: "Leisure",
                                imageUrl: "https://images.unsplash.com/photo-1585135497273-1a86d9471b8e?w=800"
                            },
                            {
                                time: "07:30 PM",
                                title: "Dinner at Ambrai Ghat",
                                description: "Traditional Rajasthani dinner overlooking the lake.",
                                activityType: "Dining"
                            }
                        ]
                    }
                ]
            },
            // Kerala Backwaters Escape
            {
                trip: trips[1]._id,
                destination: destinations[2]._id, // Alleppey
                arrivalDate: trips[1].startDate,
                departureDate: new Date(now.getFullYear(), now.getMonth() - 2, 22),
                estimatedBudget: 10000,
                notes: "Overnight houseboat stay",
                order: 1,
                essentialGear: ["Mosquito Repellent", "Light Cotton Clothes", "Camera"],
                itinerary: [
                    {
                        dayNumber: 1,
                        theme: "Backwater Cruising",
                        date: trips[1].startDate,
                        activities: [
                            {
                                time: "12:00 PM",
                                title: "Board Houseboat",
                                description: "Check into the traditional houseboat and enjoy a welcome drink.",
                                activityType: "Leisure",
                                imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"
                            },
                            {
                                time: "01:30 PM",
                                title: "Kerala Style Lunch",
                                description: "Enjoy freshly caught fish and traditional Kerala meals on board.",
                                activityType: "Dining"
                            }
                        ]
                    }
                ]
            },
            {
                trip: trips[1]._id,
                destination: destinations[6]._id, // Munnar
                arrivalDate: new Date(now.getFullYear(), now.getMonth() - 2, 23),
                departureDate: trips[1].endDate,
                estimatedBudget: 8000,
                notes: "Tea garden tour, Eravikulam National Park",
                order: 2,
                essentialGear: ["Warm Jacket", "Trekking Shoes", "Binoculars"],
                itinerary: [
                    {
                        dayNumber: 1,
                        theme: "Tea Gardens & Hills",
                        date: new Date(now.getFullYear(), now.getMonth() - 2, 23),
                        activities: [
                            {
                                time: "09:00 AM",
                                title: "Visit Tea Museum",
                                description: "Learn about the history of tea making in Munnar.",
                                activityType: "Group Activity"
                            },
                            {
                                time: "11:30 AM",
                                title: "Eravikulam National Park",
                                description: "Spot the endangered Nilgiri Tahr.",
                                activityType: "Nature Trail",
                                imageUrl: "https://images.unsplash.com/photo-1625633716457-b5487e7f9998?w=800"
                            }
                        ]
                    }
                ]
            },
            // Ladakh Road Trip
            {
                trip: trips[2]._id,
                destination: destinations[4]._id, // Leh Ladakh
                arrivalDate: trips[2].startDate,
                departureDate: trips[2].endDate,
                estimatedBudget: 35000,
                notes: "Khardung La, Pangong Lake, Nubra Valley",
                order: 1,
                essentialGear: ["Heavy Woolens", "Oxygen Canister", "Sunscreen", "Sturdy Boots"],
                itinerary: [
                    {
                        dayNumber: 1,
                        theme: "Acclimatization",
                        date: trips[2].startDate,
                        activities: [
                            {
                                time: "10:00 AM",
                                title: "Arrival in Leh",
                                description: "Complete rest day to acclimatize to the high altitude.",
                                activityType: "Leisure",
                                imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
                            }
                        ]
                    },
                    {
                        dayNumber: 2,
                        theme: "Local Sightseeing",
                        date: new Date(now.getFullYear(), now.getMonth() + 1, 2),
                        activities: [
                            {
                                time: "09:00 AM",
                                title: "Shanti Stupa Visit",
                                description: "Visit the white-domed stupa for panoramic views of Leh.",
                                activityType: "Sightseeing"
                            }
                        ]
                    }
                ]
            },
            // Goa Beach Vacation
            {
                trip: trips[3]._id,
                destination: destinations[5]._id, // Goa
                arrivalDate: trips[3].startDate,
                departureDate: trips[3].endDate,
                estimatedBudget: 20000,
                notes: "Baga Beach, Old Goa churches, water sports",
                order: 1,
                essentialGear: ["Swimwear", "Sunscreen", "Flip Flops", "Hat"],
                itinerary: [
                    {
                        dayNumber: 1,
                        theme: "Beach & Chill",
                        date: trips[3].startDate,
                        activities: [
                            {
                                time: "11:00 AM",
                                title: "Baga Beach Relaxation",
                                description: "Enjoy the sun, sand, and shacks.",
                                activityType: "Leisure",
                                imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
                            },
                            {
                                time: "04:00 PM",
                                title: "Water Sports",
                                description: "Parasailing and jet skiing.",
                                activityType: "Adventure"
                            }
                        ]
                    }
                ]
            },
        ]);

        console.log(`🔗 Created ${tripDestinations.length} trip-destination links`);

        // ── Summary ─────────────────────────────────────────────
        console.log("\n========================================");
        console.log("🌱 SEED COMPLETE — Summary");
        console.log("========================================");
        console.log(`  Users:             ${users.length} (1 user + 3 guides)`);
        console.log(`  Destinations:      ${destinations.length}`);
        console.log(`  Trips:             ${trips.length} (2 past + 2 upcoming)`);
        console.log(`  TripDestinations:  ${tripDestinations.length}`);
        console.log("========================================");
        console.log(`\n🔑 Login credentials:`);
        console.log(`   Email:    rupesh@test.com`);
        console.log(`   Password: ${DEFAULT_PASSWORD}`);
        console.log("\n📊 Expected dashboard stats:");
        console.log(`   upcomingTrips:       2`);
        console.log(`   destinationsVisited: 4  (Jaipur, Udaipur, Alleppey, Munnar)`);
        console.log(`   savedPlaces:         5  (above 4 + Leh Ladakh + Goa = 6 unique)`);
        console.log(`   suggestedGuides:     3  (Arjun, Priya, Vikram)`);
        console.log(`   recentTrips:         4`);
        console.log("========================================\n");

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
}

seed();
