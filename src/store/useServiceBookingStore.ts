"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ServiceBookingState = {
  serviceSlug: string;
  serviceName: string;
  servicePrice: number;
  slotId: string;
  date: string;
  dayLabel: string;
  time: string;
  stylist: string;
  customerName: string;
  email: string;
  phone: string;
  note: string;
  paymentMethod: "paystack" | "transfer";
};

type BookingStore = {
  booking: ServiceBookingState;
  setBooking: (input: Partial<ServiceBookingState>) => void;
  clearBooking: () => void;
};

const initialBooking: ServiceBookingState = {
  serviceSlug: "",
  serviceName: "",
  servicePrice: 0,
  slotId: "",
  date: "",
  dayLabel: "",
  time: "",
  stylist: "",
  customerName: "",
  email: "",
  phone: "",
  note: "",
  paymentMethod: "paystack",
};

export const useServiceBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking: initialBooking,
      setBooking: (input) =>
        set((state) => ({
          booking: { ...state.booking, ...input },
        })),
      clearBooking: () => set({ booking: initialBooking }),
    }),
    {
      name: "veloura-service-booking",
    },
  ),
);
