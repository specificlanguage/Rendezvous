import { FormikValues } from "formik";
import { fetcher } from "../fetch.ts";
import { LocationInputs, TripInfo } from "../types.ts";

export interface CreateTripRequestProps extends FormikValues {
    tripName: string;
    startDate: string;
    endDate: string;
}

export async function queryCreateTrip(
    tripName: string,
    startDate: string,
    endDate: string,
) {
    return await fetcher("/trip/create", {
        method: "POST",
        body: JSON.stringify({
            tripName: tripName,
            startDate: startDate,
            endDate: endDate,
        }),
    });
}

export async function querySetLocations(
    tripID: string,
    locations: LocationInputs[],
) {
    return await fetcher("/trip/locations", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            locations,
        }),
    });
}

export async function inviteFriends(tripID: string, emails: string[]) {
    return await fetcher("/trip/invite", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            emails,
        }),
    });
}

export async function getAllTripsInfo(): Promise<TripInfo[]> {
    const tripIDs = await fetcher("/user/trips").then(
        (resp) => resp.body.trips,
    ); // contains list of [{id: ...}]
    const tripQueries = tripIDs.map(
        async (t: { id: string }) => await fetcher(`/trip?tripID=${t.id}`),
    );
    const resolvedTripQueries = await Promise.allSettled(tripQueries);
    return resolvedTripQueries.flatMap((q) => {
        if (q.status === "fulfilled" && q.value.status === 200) {
            return [q.value.body];
        }
    });
}

export async function getTripInfo(
    tripID: string,
): Promise<{ status: number; body: TripInfo }> {
    return await fetcher(`/trip?tripID=${tripID}`);
}
