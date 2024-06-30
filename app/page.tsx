"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getEducation, getExperience, getSkills } from "@/lib/actions";
import { Education, Experience, Skill } from "@/lib/types";
import Me from "@/public/pic.jpeg";
import { ConfigProvider, Timeline } from "antd";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";


const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Adhamxiii",
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        className="w-8 h-8 text-red-500 hover:text-red-600"
      >
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adhamnasser/",
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        className="w-8 h-8 text-red-500 hover:text-red-600"
      >
        <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
      </svg>
    ),
  },
  {
    name: "Mail",
    href: "mailto:adhamxiii22@gmail.com",
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        className="w-8 h-8 text-red-500 hover:text-red-600"
      >
        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
      </svg>
    ),
  },
];

export const dynamic = "force-dynamic";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState<Experience[] | undefined>();
  const [education, setEducation] = useState<Education[] | undefined>();

  useEffect(() => {
    const getSkillsDetails = async () => {
      const { skills } = await getSkills()
      setSkills(skills)
      setLoading(false)
    }
    const getExperienceDetails = async () => {
      const { experience } = await getExperience()
      setExperience(experience)
      setLoading(false)
    }
    const getEducationDetails = async () => {
      const { education } = await getEducation()
      setEducation(education)
      setLoading(false)
    }
    getSkillsDetails()
    getExperienceDetails()
    getEducationDetails()
  }, []);

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      <div className="pt-5 pb-8 space-y-2 md:space-x-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Home
        </h1>
      </div>

      <div className="relative space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-6 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 h-fit sticky top-10 max-lg:relative max-lg:top-0">
          <Suspense
            fallback={
              <Skeleton className="w-48 h-48 rounded-full object-cover object-top" />
            }
          >
            <Image
              src={Me}
              alt="Picture of me"
              width={200}
              height={200}
              className="w-48 h-48 rounded-full object-cover object-top"
            />
          </Suspense>

          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
            Adham Nasser
          </h3>

          <p className="text-gray-500 dark:text-gray-400">Software Engineer</p>

          <div className="flex space-x-5 pt-6">
            {socialLinks.map((socialLink) => (
              <a href={socialLink.href} key={socialLink.name} target="_blank">
                {socialLink.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2">

          <p>
            Hey everyone! 👋 I'm Adham Nasser, a front-end developer with a
            knack for crafting engaging experiences using React.
          </p>

          <p>
            I'm passionate about building scalable and performant web
            applications. My journey in software development began with my love
            for web development and I've since honed my skills in the
            industry.
          </p>

          <p>
            I'm a quick learner and love to stay up-to-date with the latest
            industry trends and technologies. I'm excited to bring my
            skills and passion to your next project.
          </p>

          <div>
            <h2 className="max-lg:text-center">My <span className="text-primary">Skills</span></h2>
            {loading ? <div className="flex justify-center items-center">
              <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-500"></div>
            </div> : (
              <>
                {!skills || skills.length === 0 ? <p className="text-center">No skills found</p>
                  : <div className="scrollbar-hide overflow-x-scroll px-4">
                    <div className="flex gap-10 max-h-fit">
                      {skills.map((skill: Skill) => (
                        <div key={skill._id} className="h-fit border border-secondary-foreground dark:border-red-700 px-10 py-5 rounded-md bg-transparent text-black dark:text-white ">
                          <p className="text-center text-xl font-semibold m-0">{skill.skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>}
              </>
            )}
          </div>

          <div className="flex gap-4 flex-col">
            <div className="flex-1">
              <h2 className="max-lg:text-center">My <span className="text-primary">Experience</span></h2>
              {loading ? <div className="flex justify-center items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-500"></div>
              </div> : (
                <>
                  {!experience || experience.length === 0 ?
                    <p className="text-center">No experience found</p> :
                    <ConfigProvider
                      theme={{
                        components: {
                          Timeline: {
                            tailColor: 'rgba(255, 0, 0, 0.2)'
                          }
                        }
                      }}
                    >
                      <Timeline mode="alternate" reverse>
                        {experience.map((e: Experience) => (
                          <Timeline.Item key={e._id} color="red" >
                            <div className="border border-primary px-3 py-5 rounded-lg flex flex-col items-start text-black dark:text-white">
                              <p className="text-md my-1">{e.duration}</p>
                              <p className="text-xl font-bold my-1 text-start">{e.company}</p>
                              <p className="text-md my-1 text-start">Position: <span className="font-bold text-xl text-muted-foreground">{e.position}</span></p>
                              <p className="text-md my-1 text-start">Location: <span className="font-bold text-muted-foreground">{e.location}</span></p>
                              <p className="text-md my-1 text-start">Job Profile: <span className="font-bold text-muted-foreground">{e.jobprofile}</span></p>
                            </div>
                          </Timeline.Item>
                        ))}
                      </Timeline>
                    </ConfigProvider>
                  }
                </>
              )}

            </div>

            <div className="flex-1">
              <h2 className="max-lg:text-center">My <span className="text-primary">Education</span></h2>
              {loading ? <div className="flex justify-center items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-500"></div>
              </div> : (
                <>
                  {!education || education.length === 0 ?
                    <p className="text-center">No education found</p> :
                    <ConfigProvider
                      theme={{
                        components: {
                          Timeline: {
                            tailColor: 'rgba(255, 0, 0, 0.2)'
                          }
                        }
                      }}
                    >
                      <Timeline mode="right">
                        {education.map((e: Education) => (
                          <Timeline.Item key={e._id} color="gray" >
                            <div className="border border-gray-500 px-3 py-5 rounded-lg flex flex-col items-start text-black dark:text-white">
                              <p className="text-lg font-bold my-1">{e.college}</p>
                              <div className="flex w-full justify-between items-center">
                                <p>Year: <span className="font-bold text-muted-foreground">{e.year}</span></p>
                                <p>Degree: <span className="font-bold text-muted-foreground">{e.degree}</span></p>
                              </div>
                            </div>
                          </Timeline.Item>
                        ))}
                      </Timeline>
                    </ConfigProvider>
                  }
                </>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
