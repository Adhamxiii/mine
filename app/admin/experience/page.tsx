'use client'

import EducationForm from "@/components/EducationForm"
import ExperienceForm from "@/components/ExperienceForm"
import Loader from "@/components/Loader"
import SkillForm from "@/components/SkillForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Education, Experience, Skill } from "@/lib/types"
import axios from "axios"
import { Trash, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const ExperiencePage = () => {
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme()

  const getSkills = async () => {
    try {
      const res = await axios.get(`/api/skill`);
      setSkills(res.data.skills)
      setLoading(false)
    } catch (error) {
      console.log('[skills_GET]', error)
    }
  }

  const getEducation = async () => {
    try {
      const res = await axios.get(`/api/education`);
      setEducation(res.data.education)
      setLoading(false)
    } catch (error) {
      console.log('[education_GET]', error)
    }
  }

  const getExperience = async () => {
    try {
      const res = await axios.get(`/api/experience`);
      setExperience(res.data.experience)
      setLoading(false)
    } catch (error) {
      console.log('[experience_GET]', error)
    }
  }

  useEffect(() => {
    getSkills()
    getEducation()
    getExperience()
  }, []);

  const deleteEducationHandler = async (id: string) => {
    try {
      await axios.delete(`/api/education?id=${id}`);
      setEducation(education.filter((e: Education) => e._id !== id));
      toast.success('Education deleted successfully')
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExperienceHandler = async (id: string) => {
    try {
      await axios.delete(`/api/experience?id=${id}`);
      setExperience(experience.filter((e: Experience) => e._id !== id));
      toast.success('Experience deleted successfully')
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSkillHandler = async (id: string) => {
    try {
      await axios.delete(`/api/skill?id=${id}`);
      setSkills(skills.filter((skill: Skill) => skill._id !== id));
      toast.success('Skill deleted successfully')
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? <Loader /> : (
    <div className="gap-10 grid grid-cols-2 max-lg:flex max-lg:flex-col">
      <Card className="col-span-2 shadow-lg bg-transparent h-fit">
        <CardHeader className="flex items-center flex-row justify-between">
          <CardTitle>Skills</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={resolvedTheme === 'light' ? 'default' : 'ghost'} size="sm">Add</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Skill</DialogTitle>
                <DialogDescription>
                  <SkillForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </CardHeader>
        <CardContent >
          {!skills || skills.length === 0 ? (
            <p className="text-center">No skills found</p>
          ) :
            (
              <>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill: Skill) => (
                    <Badge key={skill._id} className="border border-dotted border-muted-foreground bg-muted bg-opacity-20 text-black dark:text-white flex justify-between">
                      {skill.skill}
                      <Button
                        className="ml-2 p-0 flex size-4 items-center rounded-full outline-none hover:bg-red-1"
                        onClick={() => deleteSkillHandler(skill._id)}
                        type="button"
                        size="sm"
                      >
                        <X className="size-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </>
            )}
        </CardContent>
      </Card>

      <div className="px-3 h-fit py-5 border border-muted-foreground rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Experience</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={resolvedTheme === 'light' ? 'default' : 'ghost'} size="sm">Add</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Experience</DialogTitle>
                <DialogDescription>
                  <ExperienceForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {!experience || experience.length === 0 ? (
          <p className="text-center">No experience found</p>
        ) :
          (
            <div className="grid grid-cols-1 gap-4">
              {experience.map((e: Experience) => (
                <Card className="mt-4 shadow-lg" key={e._id}>
                  <CardHeader className="">
                    <p className="text-md mb-3">{e.duration}</p>
                    <div className="flex items-center flex-row justify-between">
                      <CardTitle>{e.company}</CardTitle>
                      <Trash size={18} className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteExperienceHandler(e._id)} />
                    </div>
                  </CardHeader>
                  <CardContent >
                    <p className="max-md:text-center">Position: <span className="font-bold">{e.position}</span></p>
                    <p className="max-md:text-center">Location: <span className="font-bold">{e.location}</span></p>
                    <p className="max-md:text-center">Job Profile: <span className="font-bold">{e.jobprofile}</span></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        }
      </div>

      <div className="px-3 h-fit py-5 border border-muted-foreground rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Education</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={resolvedTheme === 'light' ? 'default' : 'ghost'} size="sm">Add</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Education</DialogTitle>
                <DialogDescription>
                  <EducationForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {!education || education.length === 0 ? (
          <p className="text-center">No education found</p>
        ) :
          (
            <div className="grid grid-cols-1 gap-4">
              {education.map((e: Education) => (
                <Card className="mt-4 shadow-lg" key={e._id}>
                  <CardHeader className="flex items-center flex-row justify-between">
                    <CardTitle className="max-w-[calc(100%-18px)]">{e.college}</CardTitle>
                    <Trash size={18} className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteEducationHandler(e._id)} />
                  </CardHeader>
                  <CardContent className="flex items-center justify-between max-md:flex-col" >
                    <p className="max-md:text-center">Year: <span className="font-bold">{e.year}</span></p>
                    <p className="max-md:text-center">Degree: <span className="font-bold">{e.degree}</span></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        }
      </div>
    </div >
  )
}

export default ExperiencePage
