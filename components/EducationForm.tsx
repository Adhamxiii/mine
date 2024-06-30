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
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    college: z.string().min(2),
    year: z.string(),
    degree: z.string()
})

export default function EducationForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            college: "",
            year: "",
            degree: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            const res = await axios.post("/api/education", values);
            if (res.status === 200) {
                setLoading(false)
                form.reset()
                toast.success("Education added successfully")
                window.location.href = '/admin/experience'
            }
        } catch (error) {
            console.log("[Add_Education_Form]", error);

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
                <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>College</FormLabel>
                            <FormControl>
                                <Input placeholder="college" {...field} className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                                <Input placeholder="year" {...field} className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                                <Input placeholder="Degree" {...field} className="focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
