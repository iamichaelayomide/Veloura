import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CheckoutDetails } from "@/types";

const initialDetails: CheckoutDetails = {
  firstName: "Amaka",
  lastName: "Adeniyi",
  email: "amaka@email.com",
  phone: "+234 803 555 0178",
  city: "Lagos",
  state: "Lagos",
  address: "12 Admiralty Way, Lekki Phase 1",
  note: "Please confirm lace tint before dispatch and share tracking on WhatsApp.",
  fulfillmentMethod: "delivery",
};

interface CheckoutState {
  details: CheckoutDetails;
  setField: <K extends keyof CheckoutDetails>(field: K, value: CheckoutDetails[K]) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      details: initialDetails,
      setField: (field, value) =>
        set((state) => ({
          details: {
            ...state.details,
            [field]: value,
          },
        })),
      reset: () => set({ details: initialDetails }),
    }),
    {
      name: "veloura-checkout-storage",
    },
  ),
);
