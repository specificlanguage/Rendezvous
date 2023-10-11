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
    console.log(locations);
    return fetcher("/trip/locations", {
        method: "POST",
        body: JSON.stringify({
            tripID,
            locations,
        }),
    });
}
