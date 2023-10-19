import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import { TripInfo } from "../../../lib/types.ts";

export interface TripHomeViewProps {
    tripData: TripInfo;
}

function DashboardBasicInfoCard(props: TripHomeViewProps) {
    const { tripData } = props;

    return (
        <Card>
            <CardHeader>
                <Heading as="h2" size="lg">
                    {tripData.tripName}
                </Heading>
            </CardHeader>
            <CardBody></CardBody>
        </Card>
    );
}

export default function TripDashboardView(props: TripHomeViewProps) {
    return (
        <div>
            <Heading as={"h2"}>Dashboard</Heading>
            <SimpleGrid columns={[1, null, 2]} spacing={"40px"}>
                <DashboardBasicInfoCard tripData={props.tripData} />
            </SimpleGrid>
        </div>
    );
}
