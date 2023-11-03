import { Divider } from "@/ui/components/Divider";

import linkedin from "./linkedin.json";
import { format } from "date-fns";
import {
  getAllStringsBetweenTagsAndReturnArray,
  getStringBetween,
  getYearsAndRemainingMonths,
} from "@/domains/about/utils";

const { work, skills, certificates, basics } = linkedin;

const Page = () => (
  <div>
    <p className="sm:text-justify text-lg font-light mt-4 text-gray-300">
      {basics.summary}
    </p>
    <Divider />
    <h2 className="text-3xl pb-4">Experience</h2>
    <div className="grid gap-8">
      {work.map((job) => (
        <div className="grid sm:grid-cols-[160px,auto] gap-4 border-b-[1px] pb-8 border-gray-700">
          <div className="flex">
            <time className="text-gray-400 text-sm">
              {format(new Date(job.startDate), "MMM yyyy")} --{`>`}{" "}
              {job.endDate
                ? format(new Date(job.endDate), "MMM yyyy")
                : "Present"}{" "}
              <br />
              {getYearsAndRemainingMonths(job.startDate, job.endDate)}{" "}
            </time>
          </div>
          <div>
            <h3 className="text-2xl font-normal">{job.position}</h3>
            <a
              href={job.url}
              className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
              target="_blank"
            >
              {job.name}
            </a>
            <p className="py-4 text-justify text-gray-300">
              {getStringBetween(job.summary, "[i]", "[/i]")}
            </p>
            <strong className="py-2 pt-4 font-semibold sm:text-justify">
              {
                // responsibilities
                getAllStringsBetweenTagsAndReturnArray(
                  job.summary,
                  "[t]",
                  "[/t]"
                )?.[0]
              }
            </strong>
            <ol className="list-disc list-image-none py-4 pl-4 grid gap-4 text-gray-300">
              {getAllStringsBetweenTagsAndReturnArray(
                job.summary,
                "[kr]",
                "[/kr]"
              )?.map((item) => (
                <li className="list-item" key={item}>
                  {item}
                </li>
              ))}
            </ol>
            <strong className="py-2 pt-4 font-semibold text-justify">
              {
                // technologies
                getAllStringsBetweenTagsAndReturnArray(
                  job.summary,
                  "[t]",
                  "[/t]"
                )?.[1]
              }
            </strong>
            <ol className="list-disc list-image-none pt-4 pl-4 grid gap-4 text-gray-300">
              {getAllStringsBetweenTagsAndReturnArray(
                job.summary,
                "[kt]",
                "[/kt]"
              )?.map((item) => (
                <li className="list-item" key={item}>
                  {item}
                </li>
              ))}
            </ol>
            <p className="pt-4 text-gray-300">
              <strong>Skills: </strong>
              {getAllStringsBetweenTagsAndReturnArray(
                job.summary,
                "[s]",
                "[/s]"
              )?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
    <div className="pt-8">
      <h2 className="text-3xl pb-2">Skills</h2>
      <div className="flex flex-wrap gap-2 text-justify">
        {skills.map((skill) => (
          <span className="p-1 rounded-md hover:text-pink-600">
            {skill.name} -{" "}
          </span>
        ))}
      </div>
    </div>
    <Divider />
    <div>
      <h2 className="text-3xl pb-2">Certifications</h2>
      <div className="grid gap-8">
        <>
          {certificates.map((cert) => (
            <div className="grid">
              <div>
                <h3 className="text-1xl font-normal">{cert.name}</h3>
                <div className="flex gap-2">
                  <span className="text-gray-400 text-sm">
                    {cert.issuer} -{" "}
                  </span>
                  <time className="text-gray-400 text-sm">
                    {format(new Date(cert.startDate), "MMMM yyyy")}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  </div>
);
export default Page;
