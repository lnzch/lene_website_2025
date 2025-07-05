import { type Project, type ProjectTitle} from "@/models/project";

function getProjectTitles(projects: Project[]): ProjectTitle[] {
    return projects.map((project: Project) => ({
        title: project.title,
        ID: project.ID
    }))
}

export { getProjectTitles }