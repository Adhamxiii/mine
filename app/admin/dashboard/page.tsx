"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Project } from "../projects/page";
import { getProjects, getSkills } from "@/lib/actions";
import { BriefcaseBusiness, FolderKanban, Lightbulb } from "lucide-react";
import Loader from "@/components/Loader";


const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjectsData = async () => {
      const res = await getProjects();
      setProjects(res.projects);
      setLoading(false)
    };
    const getSkillsData = async () => {
      const res = await getSkills();
      setSkills(res.skills);
      setLoading(false)
    };
    getProjectsData();
    getSkillsData()
  }, []);

  console.log(projects)


  return loading ? <Loader /> : (
    <div className="px-8 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <Card className="border border-red-500 shadow-md">
          <CardHeader className="flex items-center flex-row justify-between">
            <CardTitle>No. Projects</CardTitle>
            <FolderKanban size={24} />
          </CardHeader>
          <CardContent>
            {!projects ||projects.length === 0 ? (
              <p className="text-xl">There is no project</p>
            ) : (
              <p className="text-xl">{projects.length}</p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-yellow-500 shadow-md">
          <CardHeader className="flex items-center flex-row justify-between">
            <CardTitle>No. Skills</CardTitle>
            <Lightbulb size={24} />
          </CardHeader>
          <CardContent>
            {skills.length === 0 ? (
              <p className="text-xl">There is no skils</p>
            ) : (
              <p className="text-xl">{skills.length}</p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-green-500 shadow-md">
          <CardHeader className="flex items-center flex-row justify-between">
            <CardTitle>Years of Experience</CardTitle>
            <BriefcaseBusiness size={24} />
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              {new Date().getFullYear() - 2023} since 2023
            </p>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default DashboardPage;
