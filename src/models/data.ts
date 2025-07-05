import {Contact, Project} from "@/models/project";

export interface Data {
    'lene-who': string,
    contact: Contact,
    projects: Project[],
}