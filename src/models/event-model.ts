export interface Event {
  title: string;
  description: string;
  location: Location;
  imageUrl: string;
  users: string[];
  author: string;
  startAt: number;
  endAt: number;
  date: number;
}

export interface Location {
  title: string;
  address: string;
}
