export interface Visa {
  id: string;
  country: string;
  type: string;
  duration: string;
  price: number;
  requirements: string;
  validFrom: string;
  validUntil: string;
}

export interface FlightPackage {
  id: string;
  destination: string;
  origin: string;
  departureDate: string;
  returnDate: string;
  airline: string;
  priceSingle: number;
  priceDouble: number;
  priceChildWithBed: number;
  priceChildWithoutBed: number;
  priceInfant: number;
  class: 'Economy' | 'Business' | 'First';
  commission: number;
  includedServices: string[];
  notes: string;
}

export interface Airline {
  id: string;
  name: string;
  code: string;
  department: string;
  commission: number;
}

export interface AppData {
  visas: Visa[];
  flightPackages: FlightPackage[];
  airlines: Airline[];
}

export interface FormErrors {
  [key: string]: string;
}

export interface ImportResult {
  success: boolean;
  message?: string;
  data?: AppData;
}
