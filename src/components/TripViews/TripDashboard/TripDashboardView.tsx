import { Card } from "@chakra-ui/react";
import { TripInfo } from "../../../lib/types.ts";

export interface TripHomeViewProps {
    tripData: TripInfo;
}

export default function TripDashboardView(props: TripHomeViewProps) {
    const { tripData } = props;

    return <Card>{tripData.id}</Card>;
}
