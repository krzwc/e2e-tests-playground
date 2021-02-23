import { JobOffer, Company } from "common/interfaces";

export function assertExpectedArrayShape<T>(
  arg: any,
  check: (val: any) => val is T
): asserts arg is T[] {
  if (!Array.isArray(arg))
    throw new Error(`Not an array: ${JSON.stringify(arg)}`);
  if (arg.some((item) => !check(item)))
    throw new Error(`Violators found: ${JSON.stringify(arg)}`);
}

export function isCompanyArr(arg: any): arg is Company[] {
  return companyPredicate(arg);
}

const companyPredicate = (arg: Record<string, any>) =>
  typeof arg.key === "string" &&
  typeof arg.companyName === "string" &&
  typeof arg.logotype === "string" &&
  typeof arg.about === "string";

export function isJobOfferArr(arg: any): arg is JobOffer[] {
  return jobOfferPredicate(arg);
}

const jobOfferPredicate = (arg: Record<string, any>) =>
  typeof arg.key === "string" &&
  typeof arg.jobTitle === "string" &&
  typeof arg.companyId === "string" &&
  typeof arg.description === "string" &&
  typeof arg.jobType === "string" &&
  typeof arg.location === "string" &&
  Array.isArray(arg.skills) &&
  Array.isArray(arg.markets);
