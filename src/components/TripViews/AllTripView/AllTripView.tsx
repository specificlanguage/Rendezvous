import { fetcher } from "../../../lib/fetch.ts";
import useSWR from "swr";
import { Divider, Heading } from "@chakra-ui/react";

import TripsSkeleton from "./TripViewSkeletons.tsx";
import TripViewCards from "./TripViewCards.tsx";

export default function AllTripView() {
    const { data, error, isLoading } = useSWR("/trip/", fetcher);

    return (
        <>
            <Heading as="h2" size="xl">
                Upcoming Trips
            </Heading>
            <Divider mt={4} />
            {!data ? (
                <TripsSkeleton />
            ) : (
                <TripViewCards cardProps={data.body.trips} />
            )}
            <Divider mt={4} />
        </>
    );
}
