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

export function querySetLocations(tripID: string, locations: LocationInputs[]) {
    return fetcher("/trip/locations", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            locations,
        }),
    });
}

export function inviteFriends(tripID: string, emails: string[]) {
    return fetcher("/trip/invite", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            emails,
        }),
    });
}
