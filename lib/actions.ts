import axios from "axios";

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