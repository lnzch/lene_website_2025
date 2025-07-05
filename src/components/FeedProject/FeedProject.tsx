import {JSX, memo, useRef} from "react";
import Style from '@/styles/FeedProject.module.css'
import {Project} from "@/models/project";
import FeedItem from "@/components/FeedItem/FeedItem";
import {useProjectStore} from "@/store/storeProvider";

interface FeedProjectProps {
    usableHeight: number | null,
    project: Project,
    handleProjectLoaded: () => void,
    firstProject: boolean,
}

const FeedProject = memo(function FeedProject({usableHeight, project, handleProjectLoaded, firstProject} : FeedProjectProps) : JSX.Element {
    const {setActiveProject, activeProjectID} = useProjectStore((state) => state,)
    let picturesLoadedRef = useRef<number>(0)
    const handlePictureLoaded = () => {
        // console.log('picture loaded', picturesLoadedRef.current, project.title);
        picturesLoadedRef.current = picturesLoadedRef.current + 1;
        if (picturesLoadedRef.current === project.images.length) {
            handleProjectLoaded();
            if(firstProject) setActiveProject(project.ID);
        }
    }

    function handleSetActiveProject() {
        if(activeProjectID !== project.ID) {
            setActiveProject(project.ID)
        }
    }

    const stylingClasses = () => {
        return [
            Style.container,
            activeProjectID === project.ID ? false : Style.inActive,
        ].filter(e => e).join(' ')
    }

    return (
        <div
            className={stylingClasses()}
            // onMouseEnter={handleSetActiveProject}
            // onPointerDown={handleSetActiveProject}
            // onTouchStart={handleSetActiveProject}
            id={`project_${project.ID}`}
        >
            {project.images.map((image, index) => {
                return <FeedItem
                    type={'image'}
                    data={image}
                    key={index}
                    usableHeight={usableHeight}
                    handleLoaded={handlePictureLoaded}
                    isFirst={index === 0 || index === 1}
                    projectID={project.ID}
                    itemCount={index}
                />
            })}
        </div>
    )
},checkPropEquality)


function checkPropEquality(oldProps: FeedProjectProps, newProps: FeedProjectProps) : boolean {
    if (oldProps.project.ID !== newProps.project.ID) {
        return false
    }
    if(oldProps.usableHeight !== newProps.usableHeight) {
        return false
    }
    return oldProps.handleProjectLoaded.toString() === newProps.handleProjectLoaded.toString();
}
export default FeedProject;