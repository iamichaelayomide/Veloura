"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ServiceBookingState = {
  id: string;
  serviceSlug: string;
  serviceName: string;
  servicePrice: number;
  slotId: string;
  date: string;
  dayLabel: string;
  time: string;
  stylistId: string;
  stylist: string;
  customerName: string;
  email: string;
  phone: string;
  note: string;
  paymentMethod: "paystack" | "transfer";
  bookedAt: string;
  status: "pending_payment" | "confirmed";
};

type BookingStore = {
  booking: ServiceBookingState;
  appointments: ServiceBookingState[];
  setBooking: (input: Partial<ServiceBookingState>) => void;
  confirmBooking: () => void;
  clearBooking: () => void;
};

const initialBooking: ServiceBookingState = {
  id: "",
  serviceSlug: "",
  serviceName: "",
  servicePrice: 0,
  slotId: "",
  date: "",
  dayLabel: "",
  time: "",
  stylistId: "",
  stylist: "",
  customerName: "",
  email: "",
  phone: "",
  note: "",
  paymentMethod: "paystack",
  bookedAt: "",
  status: "pending_payment",
};

export const useServiceBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking: initialBooking,
      appointments: [],
      setBooking: (input) =>
        set((state) => ({
          booking: { ...state.booking, ...input },
        })),
      confirmBooking: () =>
        set((state) => {
          if (!state.booking.id) {
            return state;
          }

          const confirmedBooking = { ...state.booking, status: "confirmed" as const };
          const existingIndex = state.appointments.findIndex((appointment) => appointment.id === confirmedBooking.id);
          const nextAppointments = [...state.appointments];

          if (existingIndex >= 0) {
            nextAppointments[existingIndex] = confirmedBooking;
          } else {
            nextAppointments.unshift(confirmedBooking);
          }

          return {
            booking: confirmedBooking,
            appointments: nextAppointments,
          };
        }),
      clearBooking: () => set({ booking: initialBooking }),
    }),
    {
      name: "veloura-service-booking",
    },
  ),
);
