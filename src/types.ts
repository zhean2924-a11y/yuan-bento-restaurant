export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  tag?: string;
  jpName?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  branch: string;
  address: string;
  phone: string;
  secondaryPhone?: string;
  mapUrl: string;
  isMain: boolean;
  branchType: 'main' | 'franchise';
  typeLabel: string;
  hasFacebook: boolean;
  facebookUrl?: string;
  note?: string;
}
