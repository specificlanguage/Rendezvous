// function TripSkeleton() {
import {
    Card,
    SimpleGrid,
    SkeletonCircle,
    SkeletonText,
    Stack,
} from "@chakra-ui/react";

export function TripCardSkeleton() {
    return (
        <Card p={6} size={"lg"} bg="white" h="200">
            <SimpleGrid columns={2} spacing={5}>
                <div>
                    <SkeletonText
                        noOfLines={3}
                        mb={10}
                        spacing="4"
                        skeletonHeight="4"
                    />
                    <SkeletonCircle size="10" />
                </div>
            </SimpleGrid>
        </Card>
    );
}

export default function TripsSkeleton() {
    return (
        <Stack spacing={10} mb={8}>
            <TripCardSkeleton />
            <TripCardSkeleton />
        </Stack>
    );
}
