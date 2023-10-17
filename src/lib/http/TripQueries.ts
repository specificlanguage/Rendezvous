import { FormikValues } from "formik";
import { fetcher } from "../fetch.ts";
import { LocationInputs } from "../types.ts";

export interface CreateTripRequestProps extends FormikValues {
    tripName: string;
    startDate: string;
    endDate: string;
}

export function queryCreateTrip(
    tripName: string,
    startDate: string,
    endDate: string,
) {
    return fetcher("/trip/create", {
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
    return fetcher("/trip/locations", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            locations,
        }),
    });
}

export async function inviteFriends(tripID: string, emails: string[]) {
    return fetcher("/trip/invite", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            emails,
        }),
    });
}

export async function getAllTripsInfo() {
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
