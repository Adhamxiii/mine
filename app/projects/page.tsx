"use client";

import Loader from "@/components/Loader";
import { getProjects } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  small_overview: string;
  image: string;
  link: string;
  category: string;
  type: string;
  company_name: string;
}

export const dynamic = "force-dynamic";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();
      setProjects(
        res.projects.sort((a: any, b: any) => (a.id > b.id ? 1 : -1)),
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const jsStyle =
    "capitalize text-amber-500 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-500";
  const reactStyle =
    "capitalize text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-500";
  const nextStyle =
    "capitalize text-transparent selection:text-white bg-clip-text bg-gradient-to-r from-gray-600 via-gray-600 to-gray-300 dark:from-gray-600 dark:via-gray-300 dark:to-gray-600";
  const mernStyle =
    "uppercase text-transparent selection:text-white bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 to-green-200";

  const disabledStyle = "cursor-not-allowed opacity-50";

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  return loading ? (
    <Loader />
  ) : (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="flex items-center justify-between gap-4 space-y-2 pb-8 pt-6 max-md:flex-col md:space-y-5">
        <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
          Projects
        </h1>

        {/* <Tabs defaultValue="all" className="w-fit" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="freelance">Freelance</TabsTrigger>
          </TabsList>
        </Tabs> */}
      </div>

      <div className="grid gap-y-8 pb-6 pt-8 sm:grid-cols-2 sm:gap-6 md:gap-6 lg:grid-cols-3 lg:gap-10">
        {!filteredProjects ||
          (filteredProjects.length === 0 && (
            <p className="text-xl">There is no project</p>
          ))}
        {filteredProjects.map((project: Project) => (
          <article
            key={project._id}
            className={`${
              project.title === "HeroTodo" && disabledStyle
            } overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg shadow-red-100 dark:border-zinc-600 dark:bg-black dark:shadow-gray-700`}
          >
            <div className="relative h-56 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex justify-between">
                <Link href={project.link} target="_blank">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                </Link>

                {project.company_name && (
                  <p className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-sm font-medium text-transparent dark:from-purple-300 dark:to-blue-300">
                    {project.company_name}
                  </p>
                )}

                <p
                  className={`${
                    project.category === "js"
                      ? jsStyle
                      : project.category === "react"
                        ? reactStyle
                        : project.category === "nextjs"
                          ? nextStyle
                          : mernStyle
                  }}`}
                >
                  {project.category}
                </p>
              </div>

              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
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
