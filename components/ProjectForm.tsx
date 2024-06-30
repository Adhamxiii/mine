"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import ImageUpload from "@/components/ImageUpload";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { KeyboardEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Project } from "@/app/admin/projects/page";
import Loader from "./Loader";

const formSchema = z.object({
    image: z.string(),
    title: z
        .string()
        .min(1, { message: "Name is required" })
        .max(20, { message: "Name is too long" }),
    small_overview: z.string().min(1).max(500).trim(),
    link: z.string(),
    category: z.string(),
});

const ProjectForm = ({ project }: { project?: Project | null }) => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { projectId } = useParams();

    console.log(project)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: project?.image || "",
            title: project?.title || "",
            small_overview: project?.small_overview || "",
            link: project?.link || "",
            category: project?.category || "",
        },
    });

    const handleKeyPress = (
        e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (e.key == 'enter') {
            e.preventDefault()
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            if (project) {
                const res = await axios.put(`/api/project/${projectId}`, values);

                if (res.status === 200) {
                    setLoading(false);
                    toast.success("Project updated successfully");

                    router.push("/admin/projects");
                }
            } else {
                const res = await axios.post("/api/project", values);

                if (res.status === 200) {
                    setLoading(false);
                    toast.success("Project created successfully");

                    router.push("/admin/projects");
                }
            }

        } catch (error) {
            console.log("[Add_Project_Form]", error);
        }
    };

    return loading ? (<Loader />) : (
        <div className="p-5">
            {project ? <h1 className="text-3xl font-bold">Edit Project</h1> : <h1 className="text-3xl font-bold">Add New Project</h1>}
            <hr className="my-5" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Title"
                                            {...field}
                                            className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                            onKeyDown={handleKeyPress}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Category" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="js">JS</SelectItem>
                                                <SelectItem value="react">React</SelectItem>
                                                <SelectItem value="nextjs">NextJs</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Link"
                                        {...field}
                                        className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="small_overview"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Small Overview</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Small Overview"
                                        {...field}
                                        className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-5">
                        {project ? <Button type="submit">Update</Button> : <Button type="submit">Add</Button>}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProjectForm;
