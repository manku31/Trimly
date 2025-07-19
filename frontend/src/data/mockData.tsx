import type { BarberShop, Service, Barber, QueueEntry } from "../types/index";

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Classic Haircut",
    price: 25,
    duration: 30,
    description: "Traditional haircut with styling",
  },
  {
    id: "2",
    name: "Beard Trim",
    price: 15,
    duration: 20,
    description: "Professional beard shaping and trimming",
  },
  {
    id: "3",
    name: "Hair Wash & Cut",
    price: 35,
    duration: 45,
    description: "Complete service with wash, cut, and style",
  },
  {
    id: "4",
    name: "Hot Towel Shave",
    price: 30,
    duration: 40,
    description: "Traditional hot towel shave experience",
  },
];

export const mockBarbers: Barber[] = [
  {
    id: "1",
    name: "Mike Johnson",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.8,
    specialties: ["Classic Cuts", "Beard Styling"],
    isAvailable: true,
    experience: "5+ years", // Added experience field
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    avatar:
      "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.9,
    specialties: ["Modern Cuts", "Hot Shaves"],
    isAvailable: true,
    experience: "8+ years", // Added experience field
  },
  {
    id: "3",
    name: "Alex Thompson",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.7,
    specialties: ["Fade Cuts", "Hair Styling"],
    isAvailable: false,
    experience: "3+ years", // Added experience field
  },
];

export const mockBarberShops: BarberShop[] = [
  {
    id: "1",
    name: "Elite Cuts Barbershop",
    address: "123 Main Street, Downtown",
    rating: 4.8,
    reviewCount: 127,
    image:
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=500",
    services: mockServices,
    barbers: mockBarbers,
    queueLength: 3,
    isOpen: true,
    distance: 0.8,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    name: "Classic Gentleman",
    address: "456 Oak Avenue, Midtown",
    rating: 4.6,
    reviewCount: 89,
    image:
      "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=500",
    services: mockServices.slice(0, 3),
    barbers: mockBarbers.slice(0, 2),
    queueLength: 1,
    isOpen: true,
    distance: 1.2,
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: "3",
    name: "Modern Styles Studio",
    address: "789 Pine Street, Uptown",
    rating: 4.9,
    reviewCount: 203,
    image:
      "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=500",
    services: mockServices,
    barbers: mockBarbers,
    queueLength: 5,
    isOpen: true,
    distance: 2.1,
    coordinates: { lat: 40.7831, lng: -73.9712 },
  },
];

export const mockQueueEntries: QueueEntry[] = [
  // Active Services (in-progress)
  {
    id: "active-1",
    customerId: "user3",
    customerName: "Michael Davis",
    shopId: "1",
    barberId: "1", // Mike Johnson
    serviceId: "1", // Classic Haircut
    position: 0,
    estimatedWaitTime: 0,
    status: "in-progress",
    joinedAt: new Date(Date.now() - 20 * 60 * 1000), // Started 20 minutes ago
    notificationSent: true,
  },
  {
    id: "active-2",
    customerId: "user4",
    customerName: "Emma Wilson",
    shopId: "1",
    barberId: "2", // Carlos Rodriguez
    serviceId: "3", // Hair Wash & Cut
    position: 0,
    estimatedWaitTime: 0,
    status: "in-progress",
    joinedAt: new Date(Date.now() - 15 * 60 * 1000), // Started 15 minutes ago
    notificationSent: true,
  },
  {
    id: "active-3",
    customerId: "user5",
    customerName: "Robert Brown",
    shopId: "1",
    barberId: "3", // Alex Thompson
    serviceId: "4", // Hot Towel Shave
    position: 0,
    estimatedWaitTime: 0,
    status: "in-progress",
    joinedAt: new Date(Date.now() - 25 * 60 * 1000), // Started 25 minutes ago
    notificationSent: true,
  },

  // Waiting Queue
  {
    id: "1",
    customerId: "user1",
    customerName: "John Smith",
    shopId: "1",
    barberId: "1",
    serviceId: "1",
    position: 1,
    estimatedWaitTime: 15,
    status: "waiting",
    joinedAt: new Date(Date.now() - 10 * 60 * 1000),
    notificationSent: false,
  },
  {
    id: "2",
    customerId: "user2",
    customerName: "Sarah Johnson",
    shopId: "1",
    barberId: "2",
    serviceId: "3",
    position: 2,
    estimatedWaitTime: 40,
    status: "waiting",
    joinedAt: new Date(Date.now() - 5 * 60 * 1000),
    notificationSent: false,
  },
  {
    id: "queue-3",
    customerId: "user6",
    customerName: "David Martinez",
    shopId: "1",
    barberId: undefined, // Not assigned yet
    serviceId: "2", // Beard Trim
    position: 3,
    estimatedWaitTime: 25,
    status: "waiting",
    joinedAt: new Date(Date.now() - 2 * 60 * 1000),
    notificationSent: false,
  },

  // Completed Services (for earnings calculation)
  {
    id: "completed-1",
    customerId: "user7",
    customerName: "Jennifer Lee",
    shopId: "1",
    barberId: "1",
    serviceId: "1",
    position: 0,
    estimatedWaitTime: 0,
    status: "completed",
    joinedAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    notificationSent: true,
  },
  {
    id: "completed-2",
    customerId: "user8",
    customerName: "Thomas Anderson",
    shopId: "1",
    barberId: "2",
    serviceId: "4",
    position: 0,
    estimatedWaitTime: 0,
    status: "completed",
    joinedAt: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    notificationSent: true,
  },
];
