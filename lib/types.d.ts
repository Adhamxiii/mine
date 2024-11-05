
export interface Skill {
    _id: string,
    skill: string,
    image: string
}

export interface Education {
    _id: string
    degree: string,
    year: string,
    college: string
}

export interface Experience {
    _id: string
    position: string,
    company: string,
    duration: string,
    location: string,
    jobprofile: string
}