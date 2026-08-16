import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export function getStripe() {
  if (!publishableKey) {
    throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.");
  }

  return loadStripe(publishableKey);
}
