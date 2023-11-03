import { addMonths, differenceInMonths, differenceInYears } from "date-fns";

const getStringBetween = (str: string, start: string, end: string) => {
  const startIdx = str.indexOf(start) + start.length;
  const endIdx = str.indexOf(end);
  return str.substring(startIdx, endIdx);
};

const getAllStringsBetweenTagsAndReturnArray = (
  str: string,
  start: string,
  end: string
) => {
  const regex = new RegExp(`\\${start}(.+?)\\${end}`, "g");
  const matches = str.match(regex);
  return (
    matches?.map((match) =>
      match.substring(start.length, match.length - end.length)
    ) ?? []
  );
};

const getYearsAndRemainingMonths = (startDate: string, endDate?: string) => {
  let start = new Date(`${startDate}`);
  // make sure that start date from begining of the month
  start = new Date(start.getFullYear(), start.getMonth(), 1);

  let end = endDate ? new Date(`${endDate} EDT`) : new Date();
  // make sure that end date finish at the end of the month
  end = new Date(end.getFullYear(), end.getMonth() + 1, 0);

  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, addMonths(start, years * 12)) + 1;
  if (months === 0) return `${years} years`;
  return `${years} years and ${months} months`;
};

export {
  getStringBetween,
  getAllStringsBetweenTagsAndReturnArray,
  getYearsAndRemainingMonths,
}