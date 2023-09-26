import { AbsoluteCenter, Card, Heading, Icon, Stack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { TripCardSkeleton } from "./TripViewSkeletons.tsx";

interface TripViewCardProps {
    id: string;
    tripName: string;
    tripImage: string;
    adminID: string;
    created: Date;

    // // Store accounts on those that go on the trip
    // accounts TripAccounts[]
    //
    // // Store admin data on who created the trip
    // admin Account @relation(fields: [adminID], references: [id])
    // adminID String
    //
    // // Store info on when the trip "plan" was created
    // created DateTime @default(now())
}

interface TripCardsProps {
    cardProps: TripViewCardProps[];
}

function TripViewCard(props: TripViewCardProps) {
    return <TripCardSkeleton />;
}

function CreateTripCard() {
    return (
        <button>
            <Card
                p={6}
                bg="white"
                h="200"
                variant={"outline"}
                borderStyle={"dashed"}
            >
                <AbsoluteCenter>
                    <Heading as="h4" size="xl" textColor="grey">
                        <Icon as={FaPlus} mb={2} /> New Trip
                    </Heading>
                </AbsoluteCenter>
            </Card>
        </button>
    );
}

export default function TripViewCards(props: TripCardsProps) {
    const { cardProps } = props;

    console.log(cardProps);

    return (
        <Stack spacing={10} mb={8}>
            {cardProps.map((props) => (
                <TripViewCard {...props} />
            ))}
            <TripCardSkeleton />
            <CreateTripCard />
        </Stack>
    );
}
