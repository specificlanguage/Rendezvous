import { Divider, Heading } from "@chakra-ui/react";

import TripsSkeleton from "./TripViewSkeletons.tsx";
import TripViewCards from "./TripViewCards.tsx";
import { getAllTripsInfo } from "../../../lib/http/TripQueries.ts";
import { useEffect, useState } from "react";
import { TripInfo } from "../../../lib/types.ts";

export default function AllTripView() {
    const [data, setData] = useState<TripInfo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const info = await getAllTripsInfo();
            console.log(info);
            setData(info);
        };

        fetchData().catch((e) => console.log(e));
    }, []);

    return (
        <>
            <Heading as="h2" size="xl">
                Upcoming Trips
            </Heading>
            <Divider mt={4} />
            {data.length == 0 ? (
                <TripsSkeleton />
            ) : (
                <TripViewCards cardProps={data} />
            )}
            <Divider mt={4} />
        </>
    );
}
