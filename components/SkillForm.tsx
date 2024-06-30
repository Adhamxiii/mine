"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUpload from "./ImageUpload"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    skill: z.string().min(2),
    image: z.string()
})

export default function SkillForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            skill: "",
            image: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            const res = await axios.post("/api/skill", values);
            if (res.status === 200) {
                setLoading(false)
                form.reset()
                toast.success("Skill added successfully")
                window.location.href = '/admin/experience'
            }
        } catch (error) {
            console.log("[Add_Skill_Form]", error);

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
                {/* <FormField
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
                /> */}

                <FormField
                    control={form.control}
                    name="skill"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skill</FormLabel>
                            <FormControl>
                                <Input placeholder="Skill" className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Add</Button>
            </form>
        </Form>
    )
}
