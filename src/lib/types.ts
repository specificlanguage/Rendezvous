export interface LocationInputs {
    description: string;
    place_id: string;
}

export interface TripInfo {
    id: string;
    tripName: string;
    tripImage?: string;
    adminID: string;
    created: string;
    startDate: string;
    endDate: string;
    locations: string[];
    users: UserInfo[];
    numUsers?: number;
}

export interface UserInfo {
    id: string;
    name: string;
    imageURL?: string;
}
