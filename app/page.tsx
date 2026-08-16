import type { Metadata } from "next";
import { LuxoraPlatform } from "./LuxoraPlatform.tsx";

export const metadata: Metadata = {
  title: "Luxora | Reserva aviacion privada y experiencias de lujo",
  description:
    "Marketplace premium para reservar jets privados y escalar hacia yates, villas, autos de lujo, helicopteros y experiencias exclusivas.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LuxoraPlatform />;
}
