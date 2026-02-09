import React, { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';
import { Visa, FlightPackage, AppData, Airline } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface Store {
  visas: Visa[];
  flightPackages: FlightPackage[];
  airlines: Airline[];
  addVisa: (visa: Omit<Visa, 'id'>) => Visa;
  updateVisa: (id: string, visa: Omit<Visa, 'id'>) => boolean;
  deleteVisa: (id: string) => boolean;
  addFlightPackage: (pkg: Omit<FlightPackage, 'id'>) => FlightPackage;
  updateFlightPackage: (id: string, pkg: Omit<FlightPackage, 'id'>) => boolean;
  deleteFlightPackage: (id: string) => boolean;
  addAirline: (airline: Omit<Airline, 'id'>) => Airline;
  updateAirline: (id: string, airline: Omit<Airline, 'id'>) => boolean;
  deleteAirline: (id: string) => boolean;
  setVisas: (visas: Visa[]) => void;
  setFlightPackages: (pkgs: FlightPackage[]) => void;
  setAirlines: (airlines: Airline[]) => void;
  setAllData: (data: AppData) => void;
  getAllData: () => AppData;
  clearAll: () => void;
}

const useAppStore = create<Store>((set, get) => ({
  visas: [],
  flightPackages: [],
  airlines: [],

  addVisa: (visa) => {
    const newVisa = { ...visa, id: uuidv4() };
    set((state) => ({ visas: [...state.visas, newVisa] }));
    return newVisa;
  },

  updateVisa: (id, visa) => {
    const found = get().visas.find((v) => v.id === id);
    if (!found) return false;
    set((state) => ({
      visas: state.visas.map((v) => (v.id === id ? { ...visa, id } : v)),
    }));
    return true;
  },

  deleteVisa: (id) => {
    const found = get().visas.find((v) => v.id === id);
    if (!found) return false;
    set((state) => ({ visas: state.visas.filter((v) => v.id !== id) }));
    return true;
  },

  addFlightPackage: (pkg) => {
    const newPkg = { ...pkg, id: uuidv4() };
    set((state) => ({ flightPackages: [...state.flightPackages, newPkg] }));
    return newPkg;
  },

  updateFlightPackage: (id, pkg) => {
    const found = get().flightPackages.find((p) => p.id === id);
    if (!found) return false;
    set((state) => ({
      flightPackages: state.flightPackages.map((p) =>
        p.id === id ? { ...pkg, id } : p
      ),
    }));
    return true;
  },

  deleteFlightPackage: (id) => {
    const found = get().flightPackages.find((p) => p.id === id);
    if (!found) return false;
    set((state) => ({
      flightPackages: state.flightPackages.filter((p) => p.id !== id),
    }));
    return true;
  },

  addAirline: (airline) => {
    const newAirline = { ...airline, id: uuidv4() };
    set((state) => ({ airlines: [...state.airlines, newAirline] }));
    return newAirline;
  },

  updateAirline: (id, airline) => {
    const found = get().airlines.find((a) => a.id === id);
    if (!found) return false;
    set((state) => ({
      airlines: state.airlines.map((a) => (a.id === id ? { ...airline, id } : a)),
    }));
    return true;
  },

  deleteAirline: (id) => {
    const found = get().airlines.find((a) => a.id === id);
    if (!found) return false;
    set((state) => ({ airlines: state.airlines.filter((a) => a.id !== id) }));
    return true;
  },

  setVisas: (visas) => set({ visas }),
  setFlightPackages: (flightPackages) => set({ flightPackages }),
  setAirlines: (airlines) => set({ airlines }),

  setAllData: (data) =>
    set({
      visas: data.visas,
      flightPackages: data.flightPackages,
      airlines: data.airlines || [],
    }),

  getAllData: () => ({
    visas: get().visas,
    flightPackages: get().flightPackages,
    airlines: get().airlines,
  }),

  clearAll: () => set({ visas: [], flightPackages: [], airlines: [] }),
}));

interface AppContextType {
  store: Store;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useAppStore();
  return (
    <AppContext.Provider value={{ store }}>{children}</AppContext.Provider>
  );
};

export const useApp = (): Store => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context.store;
};
