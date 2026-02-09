import { AppData, Visa, FlightPackage, ImportResult, Airline } from '../types';

export function validateVisaData(visa: unknown): visa is Visa {
  if (!visa || typeof visa !== 'object') return false;
  const v = visa as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.country === 'string' &&
    typeof v.type === 'string' &&
    typeof v.duration === 'string' &&
    typeof v.price === 'number' &&
    typeof v.requirements === 'string' &&
    typeof v.validFrom === 'string' &&
    typeof v.validUntil === 'string'
  );
}

export function validateFlightPackageData(pkg: unknown): pkg is FlightPackage {
  if (!pkg || typeof pkg !== 'object') return false;
  const p = pkg as Record<string, unknown>;
  const validClasses = ['Economy', 'Business', 'First'];
  return (
    typeof p.id === 'string' &&
    typeof p.destination === 'string' &&
    typeof p.origin === 'string' &&
    typeof p.departureDate === 'string' &&
    typeof p.returnDate === 'string' &&
    typeof p.airline === 'string' &&
    typeof p.priceSingle === 'number' &&
    typeof p.priceDouble === 'number' &&
    typeof p.priceChildWithBed === 'number' &&
    typeof p.priceChildWithoutBed === 'number' &&
    typeof p.priceInfant === 'number' &&
    validClasses.includes(p.class as string) &&
    typeof p.commission === 'number' &&
    Array.isArray(p.includedServices) &&
    typeof p.notes === 'string'
  );
}

export function validateAirlineData(airline: unknown): airline is Airline {
  if (!airline || typeof airline !== 'object') return false;
  const a = airline as Record<string, unknown>;
  return (
    typeof a.id === 'string' &&
    typeof a.name === 'string' &&
    typeof a.code === 'string' &&
    typeof a.department === 'string' &&
    typeof a.commission === 'number'
  );
}

export function validateAppData(data: unknown): data is AppData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    Array.isArray(d.visas) &&
    Array.isArray(d.flightPackages) &&
    Array.isArray(d.airlines) &&
    d.visas.every((v) => validateVisaData(v)) &&
    d.flightPackages.every((p) => validateFlightPackageData(p)) &&
    d.airlines.every((a) => validateAirlineData(a))
  );
}

export function exportToJSON(data: AppData, filename: string = 'travel-data.json'): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importFromJSON(file: File): Promise<ImportResult> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!validateAppData(data)) {
      return {
        success: false,
        message: 'Invalid data structure. Please ensure the JSON contains valid visas, flightPackages, and airlines arrays.',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: 'Invalid JSON format. Please check your file and try again.',
      };
    }
    return {
      success: false,
      message: 'Error reading file. Please try again.',
    };
  }
}

export function exportVisasOnly(visas: Visa[]): void {
  const data = { visas, flightPackages: [], airlines: [] };
  exportToJSON(data, 'visas.json');
}

export function exportFlightsOnly(flightPackages: FlightPackage[]): void {
  const data = { visas: [], flightPackages, airlines: [] };
  exportToJSON(data, 'flights.json');
}
