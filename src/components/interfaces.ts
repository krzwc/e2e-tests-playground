export enum LOCATION {
  earth = "Earth",
  moon = "Moon",
  mercury = "Mercury",
  venus = "Venus",
  mars = "Mars",
  jupiter = "Jupiter",
  saturn = "Saturn",
  uranus = "Uranus",
  neptune = "Neptune",
  pluto = "Pluto",
  remote = "Remote",
}

export interface JobOffer {
  key: string;
  jobTitle: string;
  companyName: string;
  description: string;
  skills: string[];
  markets: string[];
  jobType: string;
  location: LOCATION;
}
