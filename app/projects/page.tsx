'use client'

import Loader from "@/components/Loader";
import { getProjects } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  small_overview: string;
  image: string;
  link: string;
  category: string;
}

export const dynamic = "force-dynamic";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();
      setProjects(res.projects.sort((a: any, b: any) => a.id > b.id ? 1 : -1));
      setLoading(false);
    };
    fetchData();
  }, []);

  const jsStyle =
    "capitalize text-amber-500 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-500";
  const reactStyle =
    "capitalize text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-500";
  const nextStyle =
    "capitalize text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500";

  const disabledStyle = "cursor-not-allowed opacity-50";

  return loading ? <Loader /> : (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
      </div>

      <div className="grid gap-y-8 sm:gap-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8 pb-6">
        {!projects || projects.length === 0 && <p className="text-xl">There is no project</p>}
        {projects.map((project: Project) => (
          <article
            key={project._id}
            className={`${project.title === "HeroTodo" && disabledStyle
              } overflow-hidden dark:border-zinc-600 rounded-lg border border-gray-100 bg-white shadow-lg dark:bg-black dark:shadow-gray-700 shadow-red-100`}
          >
            <div className="h-56 w-full relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex justify-between">
                <a href={project.link} target="_blank">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                </a>

                <p
                  className={`${project.category === "js"
                    ? jsStyle
                    : project.category === "react"
                      ? reactStyle
                      : nextStyle
                    }}`}
                >
                  {project.category}
                </p>
              </div>

              <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {project.small_overview}
              </p>

              <a
                href={project.link}
                target="_blank"
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-500"
              >
                View Project
                <span className="block transition-all group-hover:ms-0.5">
                  &rarr;
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
