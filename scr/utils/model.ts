import {StatusType} from './type';

export interface IDriver {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export interface IUser {
  id: string;
  name: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
    description: string;
  };
  destination: {
    latitude: number; // Latitude of the destination
    longitude: number; // Longitude of the destination },
    description: string;
  };
}

export interface IRideResponse {
  id: string;
  userId: string;
  driverId: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  status: StatusType;
  pickupTime: Date;
  timeStamp: Date;
}

export interface IRide {
  id: number; // Unique identifier for the ride
  userId: string; // ID of the user requesting the ride
  driverId: string | null; // ID of the driver accepting the ride

  pickupLocation: {
    latitude: number; // Latitude of the pickup location longitude: number, // Longitude of the pickup location
    longitude: number; // Longitude of the destination },
  };
  destination: {
    latitude: number; // Latitude of the destination
    longitude: number; // Longitude of the destination },
  };
  status:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off'; // Status of the ride request
  pickupTime?: string; // Time when the ride is scheduled for pickup
  timestamp?: string; // Timestamp of when the ride request was made }
}
