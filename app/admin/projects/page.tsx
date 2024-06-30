"use client";

import { DataTable } from "@/components/DataTable";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Project {
  _id: string;
  title: string;
  small_overview: string;
  link: string;
  category: string;
  image: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const getProjects = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/project`);
      console.log(res.data.projects)
      setProjects(res.data.projects)
      setLoading(false)
    } catch (error) {
      console.log('[projects_GET]', error)
    }
  }

  useEffect(() => {
    getProjects()

  }, []);

  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`/api/project?id=${id}`);

      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (projectId: string) => {
    router.push(`/admin/projects/${projectId}`)
  };

  const columns: ColumnDef<Record<string, unknown>>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <>{row.index + 1}</>;
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "small_overview",
      header: "Small Overview",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <p className="line-clamp-2 text-ellipsis overflow-hidden">{row.original.small_overview as string}</p>
          </div>
        );
      }
    },
    {
      accessorKey: "link",
      header: "Link",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <Link href={row.original.link as string} target="_blank">
              <Button variant="outline">View</Button>
            </Link>
          </div>
        );
      }
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return (
          <>
            {new Date(row.original.createdAt as string).toLocaleDateString(
              "en-GB",
            )}
          </>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              className="text-xs font-medium text-primary/50 hover:text-primary"
              onClick={() => editHandler(row.original._id as string)}
            >
              <Edit2 className="h-4 w-4" />
              <span className="hidden transition-all group-hover:ms-0.5">
                &rarr;
              </span>
            </button>
            <button
              type="button"
              className="text-xs font-medium text-primary/50 hover:text-primary"
              onClick={() => deleteHandler(`${row.original._id}`)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden transition-all group-hover:ms-0.5">
                &rarr;
              </span>
            </button>
          </div>
        );
      },
    },
  ];

  return loading ? <Loader /> : (
    <div className="rounded-lg border bg-card p-5 shadow-sm dark:bg-background">
      <DataTable searchKey="title" data={projects} columns={columns} />
    </div>
  );
}
