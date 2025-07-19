export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "barber";
  avatar?: string;
}

export interface BarberShop {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  image: string;
  services: Service[];
  barbers: Barber[];
  queueLength: number;
  isOpen: boolean;
  distance?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  category: string; // Add this line
}

export interface Barber {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: string[];
  isAvailable: boolean;
  experience: string; // Added experience field
}

export interface QueueEntry {
  id: string;
  customerId: string;
  customerName: string;
  shopId: string;
  barberId?: string;
  serviceId: string;
  position: number;
  estimatedWaitTime: number;
  status: "waiting" | "in-progress" | "completed" | "cancelled";
  joinedAt: Date;
  notificationSent: boolean;
}

export interface Notification {
  id: string;
  type: "queue-update" | "turn-coming" | "ready" | "delay";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface BarberSignupData {
  // Step 1: Basic Information
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  // Step 2: Verification
  otp: string;
  verificationType: "email" | "phone";

  // Step 3: Shop Details
  shopName: string;
  address: string;
  googleLocation: string;
  gstNumber: string;
  services: string[];
  workingHours: {
    start: string;
    end: string;
  };
}

export interface SignupStep {
  step: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface BarberLoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  otp?: string;
  verificationType?: "email" | "phone";
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    shopName: string;
    phone: string;
  };
  message?: string;
  requiresOTP?: boolean;
  verificationType?: "email" | "phone";
}

export interface LoginStep {
  step: 1 | 2; // 1: credentials, 2: OTP
  title: string;
  description: string;
}
