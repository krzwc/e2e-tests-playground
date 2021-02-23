export enum LOCATION {
  all = "All",
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
  companyId: string;
  description: string;
  skills: string[];
  markets: string[];
  jobType: string;
  location: LOCATION;
}

export interface Company {
  key: string;
  companyName: string;
  logotype: string;
  about: string;
}
