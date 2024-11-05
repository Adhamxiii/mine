import { Project } from "@/app/projects/page";
import axios from "axios";

import { getSession } from "next-auth/react";

export const getProjects = async () => {
    try {
        const response = await axios.get('/api/project');
        console.log(response.data.projects)
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const getSkills = async () => {
    try {
        const response = await axios.get('/api/skill');
        console.log(response.data.skills)
        return response.data;
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
};

export const getExperience = async () => {
    try {
        const response = await axios.get('/api/experience');
        console.log(response.data.experience)
        return response.data;
    } catch (error) {
        console.error("Error fetching experience:", error);
        return [];
    }
};

export const getEducation = async () => {
    try {
        const response = await axios.get('/api/education');
        console.log(response.data.education)
        return response.data;
    } catch (error) {
        console.error("Error fetching education:", error);
        return [];
    }
};

export const updateProject = async (projectId: string, updateData: any) => {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error('You must be logged in to update a project.');
        }

        const response = await axios.put(`/api/project/${projectId}`, {
            isPined: updateData.isPined // Send only isPined
    });

        return response.data;
    } catch (error: any) {
        console.error('Error updating project:', error.response ? error.response.data : error.message);
        throw error;
    }
};