import {createStore} from "zustand/vanilla";
import {Project} from "@/models/project";
import {returnProjectIDFromHandle} from "@/utilities/clickNavigation";

export type ProjectState = {
    projects: Project[],
    activeProjectID: number | null,
    activeProjectName: string | null,
    activeProjectByNav: number | null,
    activeProject: Project | null,
    scrollTo: string | null,
    currentElementInView: string | null,
    displayMode: DisplayMode,
    contactInfo: string,
}

type ProjectAction = {
    setActiveProject: (projectID: number) => void,
    setProjects: (projects: Project[]) => void,
    setDisplayMode: (size: number) => void,
    setScrollTo: (projectID: number) => void,
    setCurrentElementInView: (feedItemHandle: string | null) => void,
    setContactInfo: (contactInfo: string) => void,
}

type DisplayMode = 'mobil' | 'desktop' | 'loading'

export type ProjectStore = ProjectState & ProjectAction

export const defaultInitState: ProjectState = {
    projects: [],
    activeProjectName: null,
    activeProjectID: null,
    activeProjectByNav: null,
    activeProject: null,
    displayMode: 'loading',
    scrollTo: null,
    currentElementInView:  '1_0',
    contactInfo: '',
}

export const createProjectStore = (initState: ProjectState = defaultInitState) => {
    return createStore<ProjectStore>()((set) => ({
        ...initState,
        setActiveProject: (projectID) => set((state)  => {
            const projectName = state.projects.find((project) => project.ID === Number(projectID))?.title as string;
            const project = state.projects.find(project => projectID === project.ID);
            return {
                activeProjectName: projectName,
                activeProjectID: projectID,
                activeProject: project || null
            }
        }),
        setProjects: (projects) => set(() => ({projects: projects})),
        setNavProject: (projectID: number) => set(() => ({activeProjectByNav: projectID})),
        setDisplayMode: (size: number) => set(() => {
            let displayMode : DisplayMode;
            if(size > 900) {
                displayMode = 'desktop'
            } else {
                displayMode = 'mobil'
            }
            return {
                displayMode: displayMode
            }
        }),
        setScrollTo: (projectID: number) => set(() => {
            return {
                scrollTo: `${projectID}_0`,
                currentElementInView: `${projectID}_0`,
            }
        }),
        setCurrentElementInView: (feedItemHandle: string | null) => set((state) => {
            if (feedItemHandle) {
                const activeProjectID = returnProjectIDFromHandle(feedItemHandle);
                if(activeProjectID !== state.activeProjectID) {
                    const projectName = state.projects.find((project) => project.ID === Number(activeProjectID))?.title as string;
                    const project = state.projects.find(project => activeProjectID === project.ID);
                    return {
                        activeProjectName: projectName,
                        activeProjectID: activeProjectID,
                        activeProject: project || null,
                        currentElementInView: feedItemHandle,
                    }
                }
            }
            return {
                currentElementInView: feedItemHandle,
            }
        }),
        setContactInfo: (contactInfo: string) => set(() => {
            return {
                contactInfo: contactInfo,
            }
        })
    }))
}