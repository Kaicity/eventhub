export interface AddressModel {
  title: string;
  id: string;
  resultType: string;
  houseNumberType: string;
  address: Address;
  position: Position;
  access: Access[];
  distance: number;
  mapView: MapView;
}

export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  county: string;
  city: string;
  street: string;
  postalCode: string;
  houseNumber: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Access {
  lat: number;
  lng: number;
}

export interface MapView {
  west: number;
  south: number;
  east: number;
  north: number;
}
