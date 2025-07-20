import type { BarberShop, Service, Barber, QueueEntry } from "../types/index";

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Classic Haircut",
    price: 25,
    duration: 30,
    description: "Traditional haircut with styling",
    category: "haircuts", // Add this
  },
  {
    id: "2",
    name: "Beard Trim",
    price: 15,
    duration: 20,
    description: "Professional beard shaping and trimming",
    category: "grooming", // Add this
  },
  {
    id: "3",
    name: "Hair Wash & Cut",
    price: 35,
    duration: 45,
    description: "Complete service with wash, cut, and style",
    category: "haircuts", // Add this
  },
  {
    id: "4",
    name: "Hot Towel Shave",
    price: 30,
    duration: 40,
    description: "Traditional hot towel shave experience",
    category: "grooming", // Add this
  },
];

export const mockBarbers: Barber[] = [
  {
    id: "1",
    name: "Mike Johnson",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.7,
    specialties: ["Modern Styles", "Fades"],
    isAvailable: true,
    experience: "5 years exp", // Added experience field
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
  {
    id: "4",
    name: "John Smith",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.9,
    specialties: ["Classic Cuts", "Beard Grooming"],
    isAvailable: true,
    experience: "8 years exp", // Added experience field
  },
  {
    id: "5",
    name: "David Wilson",
    avatar:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.8,
    specialties: ["Hair Styling", "Color"],
    isAvailable: true,
    experience: "6 years exp", // Added experience field
  },
];

// Make sure all shop objects have the services property
export const mockBarberShops: BarberShop[] = [
  {
    id: "1",
    name: "Classic Cuts Barbershop",
    address: "123 Main Street, Downtown, New York, NY 10001",
    image:
      "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviewCount: 127,
    isOpen: true,
    queueLength: 3,
    distance: 0.5,
    coordinates: { lat: 40.7128, lng: -74.006 },
    services: [
      {
        id: "s1",
        name: "Classic Haircut",
        description: "Traditional haircut with styling",
        price: 25,
        duration: 30,
      },
      {
        id: "s2",
        name: "Beard Trimming",
        description: "Professional beard grooming",
        price: 15,
        duration: 20,
      },
      {
        id: "s3",
        name: "Hair Wash & Style",
        description: "Complete hair wash and styling",
        price: 35,
        duration: 45,
      },
    ],
    barbers: [
      {
        id: "b1",
        name: "John Smith",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
        rating: 4.9,
        experience: "8 years exp",
        specialties: ["Classic Cuts", "Beard Grooming"],
        isAvailable: true,
      },
    ],
  },
  {
    id: "2",
    name: "Modern Style Studio",
    address: "456 Oak Avenue, Midtown, New York, NY 10017",
    image:
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    queueLength: 5,
    distance: 1.2,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    services: [
      {
        id: "s1",
        name: "Classic Haircut",
        description: "Traditional haircut with styling",
        price: 25,
        duration: 30,
      },
      {
        id: "s2",
        name: "Beard Trimming",
        description: "Professional beard grooming",
        price: 15,
        duration: 20,
      },
      {
        id: "s3",
        name: "Hair Wash & Style",
        description: "Complete hair wash and styling",
        price: 35,
        duration: 45,
      },
    ],
    barbers: [
      {
        id: "b2",
        name: "Carlos Rodriguez",
        avatar:
          "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150",
        rating: 4.9,
        experience: "8+ years",
        specialties: ["Modern Cuts", "Hot Shaves"],
        isAvailable: true,
      },
    ],
  },
  {
    id: "3",
    name: "Gentleman's Choice",
    address: "789 Pine Street, Upper East Side, New York, NY 10075",
    image:
      "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviewCount: 203,
    isOpen: false,
    queueLength: 0,
    distance: 2.1,
    coordinates: { lat: 40.7831, lng: -73.9712 },
    services: [
      {
        id: "s1",
        name: "Classic Haircut",
        description: "Traditional haircut with styling",
        price: 25,
        duration: 30,
      },
      {
        id: "s2",
        name: "Beard Trimming",
        description: "Professional beard grooming",
        price: 15,
        duration: 20,
      },
      {
        id: "s3",
        name: "Hair Wash & Style",
        description: "Complete hair wash and styling",
        price: 35,
        duration: 45,
      },
    ],
    barbers: [
      {
        id: "b3",
        name: "Alex Thompson",
        avatar:
          "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
        rating: 4.7,
        experience: "3+ years",
        specialties: ["Fade Cuts", "Hair Styling"],
        isAvailable: false,
      },
    ],
  },
  {
    id: "4",
    name: "The Barber's Den",
    address: "321 Elm Road, Brooklyn, NY 11201",
    image:
      "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    reviewCount: 156,
    isOpen: true,
    queueLength: 2,
    distance: 3.4,
    coordinates: { lat: 40.6782, lng: -73.9442 },
    services: [
      {
        id: "s1",
        name: "Classic Haircut",
        description: "Traditional haircut with styling",
        price: 25,
        duration: 30,
      },
      {
        id: "s2",
        name: "Beard Trimming",
        description: "Professional beard grooming",
        price: 15,
        duration: 20,
      },
      {
        id: "s3",
        name: "Hair Wash & Style",
        description: "Complete hair wash and styling",
        price: 35,
        duration: 45,
      },
    ],
    barbers: [
      {
        id: "b4",
        name: "David Wilson",
        avatar:
          "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
        rating: 4.8,
        experience: "6 years exp",
        specialties: ["Hair Styling", "Color"],
        isAvailable: true,
      },
    ],
  },
  {
    id: "5",
    name: "Trim & Style Co.",
    address: "654 Maple Drive, Queens, NY 11375",
    image:
      "https://images.pexels.com/photos/2040627/pexels-photo-2040627.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    reviewCount: 94,
    isOpen: true,
    queueLength: 4,
    distance: 4.8,
    coordinates: { lat: 40.7282, lng: -73.7949 },
    services: [
      {
        id: "s1",
        name: "Classic Haircut",
        description: "Traditional haircut with styling",
        price: 25,
        duration: 30,
      },
      {
        id: "s2",
        name: "Beard Trimming",
        description: "Professional beard grooming",
        price: 15,
        duration: 20,
      },
      {
        id: "s3",
        name: "Hair Wash & Style",
        description: "Complete hair wash and styling",
        price: 35,
        duration: 45,
      },
    ],
    barbers: [
      {
        id: "b5",
        name: "Mike Johnson",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        rating: 4.7,
        experience: "5 years exp",
        specialties: ["Modern Styles", "Fades"],
        isAvailable: true,
      },
    ],
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
