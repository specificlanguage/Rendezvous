export interface LocationInputs {
    description: string;
    place_id: string;
}

export interface TripInfo {
    id: string;
    tripName: string;
    tripImage?: string;
    adminID: string;
    created: Date;
    startDate: Date;
    endDate: Date;
    locations: string[];
    users: string[];
}
