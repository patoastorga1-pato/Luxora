export type ExperienceIntent = {
  icon: string;
  title: string;
  copy: string;
};

export type AssetCategory = {
  icon: string;
  name: string;
  status: "Activa" | "Proximamente";
};

export type Aircraft = {
  name: string;
  location: string;
  image: string;
  price: string;
  capacity: string;
  range: string;
  speed: string;
  luxury: string;
};

export type FilterOption = {
  label: string;
};

export type OwnerStep = {
  label: string;
  index: number;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};
