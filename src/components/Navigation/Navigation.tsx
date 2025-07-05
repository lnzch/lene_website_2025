import Style from '@/styles/Navigation.module.css';
import { useProjectStore } from "@/store/storeProvider";
import {useMemo} from "react";
import {getProjectTitles} from "@/utilities/handleProjects";
import NavigationItem from "@/components/NavigationItem/NavigationItem";
import {MouseEvent} from "react";

export default function Navigation() {
    const { setActiveProject, projects, activeProjectID,setScrollTo } = useProjectStore((state) => state);

    const projectTitles = useMemo(() => {
        return getProjectTitles(projects)
    }, [projects]);



    const onClickHandler = (event: MouseEvent, projectID: number) => {
        event.preventDefault();
        setScrollTo(projectID);
        setActiveProject(projectID);
    }


    return (
        <div className={Style.container}>
            <ul>
                {projectTitles.map((project, index) => {
                    return <NavigationItem
                            key={project.ID}
                            projectTitle={project.title}
                            projectID={project.ID}
                            handleClick={onClickHandler}
                            lastItem={index === (projectTitles.length - 1)}
                            isActive={activeProjectID === project.ID}
                    />
                })}
            </ul>
        </div>
    )
}