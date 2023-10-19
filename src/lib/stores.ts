import { create } from "zustand";
import { TripInfo } from "./types.ts";

interface TripStore {
    trip: TripInfo | undefined;
    setTrip: (tr: TripInfo) => void;
}

export const tripStore = create<TripStore>((set) => ({
    trip: undefined,
    setTrip: (by) => set(() => ({ trip: by })),
}));
