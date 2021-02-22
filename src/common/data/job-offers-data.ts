import { LOCATION, JobOffer } from "../interfaces";

export const jobOffersData: JobOffer[] = [
  {
    key: "1",
    jobTitle: "Frontend developer",
    companyId: "1",
    description:
      "Build human-centric UX using web technologies like React, Next.js, TypeScript, Express.js, and Jest.",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "2",
    jobTitle: "Radiation Effects Engineer",
    companyId: "2",
    description:
      "Support a cross-discipline team of design and system engineers, while providing radiation test and analysis results, advice on requirements flow down, modeling and analysis reports, and recommendations for mitigating radiation effects",
    skills: ["coding", "radiation analysis", "testing"],
    markets: ["engineering", "space exploration"],
    jobType: "onsite",
    location: LOCATION.mercury,
  },
  {
    key: "3",
    jobTitle: "Space suit test engineer",
    companyId: "2",
    description:
      "Design and troubleshoot test solutions for in-house developed and externally sourced avionics hardware products which will be worn and used by the crew during flight",
    skills: ["electrical engineering", "mechanical engineering", "matlab"],
    markets: ["engineering", "space exploration"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "4",
    jobTitle: "Chief Engineer",
    companyId: "3",
    description:
      "This position is the focal point in preparing missions involving flight assets to achieve Airworthiness Certification",
    skills: ["engineering consultation", "professional engineer license"],
    markets: ["engineering", "space exploration"],
    jobType: "onsite",
    location: LOCATION.pluto,
  },
  {
    key: "5",
    jobTitle: "Astronaut",
    companyId: "3",
    description: "Serve as a commander or crew member aboard a spacecraft",
    skills: ["good physical health", "open mind", "persistence"],
    markets: ["space exploration"],
    jobType: "remote",
    location: LOCATION.remote,
  },
  {
    key: "6",
    jobTitle: "HAL 9000 series maintenance engineer",
    companyId: "4",
    description:
      "Installing software patches, diagnosing and repairing problems, monitoring networks, repairing server errors, resolving hard disk failures, configuring software and drivers, performing regular system upgrades",
    skills: ["computer skills", "diagnosing", "software configuration"],
    markets: ["it", "engineering"],
    jobType: "onsite",
    location: LOCATION.moon,
  },
  {
    key: "7",
    jobTitle: "USS Enterprise captain",
    companyId: "5",
    description: "Management of the Federation of Planets flag ship",
    skills: ["management", "celestial navigation"],
    markets: ["management", "space travel", "space exploration"],
    jobType: "remote",
    location: LOCATION.remote,
  },
];
