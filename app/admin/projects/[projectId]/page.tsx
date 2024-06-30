'use client'

import React, { useEffect, useState } from 'react'
import { Project } from '../page';
import axios from 'axios';
import Loader from '@/components/Loader';
import ProjectForm from '@/components/ProjectForm';

const ProjectDetailsPage = ({ params }: { params: { projectId: string } }) => {
    const [loading, setLoading] = useState(false);
    const [projectDetails, setProjectDetails] = useState<Project | null>(null);


    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                const res = await axios.get(`/api/project/${params.projectId}`);

                setProjectDetails(res.data.project);
                setLoading(false);
            } catch (error) {
                console.log("[project_GET]", error);
            }
        };

        getProjectDetails();
    }, [params.projectId]);

    return loading ? (
        <Loader />
    ) : (
        <ProjectForm project={projectDetails} />
    )
}

export default ProjectDetailsPage
