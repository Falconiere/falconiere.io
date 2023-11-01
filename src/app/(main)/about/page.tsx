import { Divider } from "@/ui/components/Divider";

import linkedin from "./linkedin.json";
import { format } from "date-fns";
import { Metadata } from "next";

const { work, skills, certificates } = linkedin;

const Page = () => (
  <div>
    <p className="text-white text-justify text-lg font-light mt-4">
      Hello, I'm Falconiere R. Barbosa, a seasoned software developer boasting
      over nine years of dedicated experience in the dynamic realms of web and
      mobile development. My journey has led me through diverse technologies and
      frameworks, with a strong focus on React Native, React.js, and Node.js.
      While I've honed my skills primarily in mobile front-end development with
      a deep appreciation for UX/UI, my background includes substantial back-end
      development expertise. I'm passionate about crafting exceptional digital
      experiences and have a proven track record of turning ideas into reality.
    </p>
    <Divider />
    <h2 className="text-3xl pb-4">Experience</h2>
    <div className="grid gap-8">
      {work.map((job) => (
        <div className="grid sm:grid-cols-[200px,auto] gap-4 border-b-[1px] pb-8 border-gray-700">
          <div className="flex">
            <time className="text-gray-400 text-sm">
              {format(new Date(job.startDate), "MMMM yyyy")} --{`>`}{" "}
              {job.endDate
                ? format(new Date(job.endDate), "MMMM yyyy")
                : "Present"}
            </time>
          </div>
          <div>
            <h3 className="text-1xl font-normal">{job.position}</h3>
            <a
              href={job.url}
              className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
              target="_blank"
            >
              {job.name}
            </a>
            <p className="whitespace-pre-line pt-4 text-justify">
              {job.summary}
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
