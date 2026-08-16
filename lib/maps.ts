export const googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  defaultCenter: {
    lat: 19.3371,
    lng: -99.566,
  },
  defaultZoom: 5,
};
