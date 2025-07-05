import {JSX, MouseEvent, useEffect, useRef, useState} from "react";
import Style from '@/styles/Feed.module.css';
import { useProjectStore } from "@/store/storeProvider";
import FeedProject from "@/components/FeedProject/FeedProject";
import {Project} from "@/models/project";
import InfoBubble from "@/components/InfoBubble/InfoBubble";
import {getElementToScrollTo, getScreenSide} from "@/utilities/clickNavigation";
import Navigation from "@/components/Navigation/Navigation";

export default function Feed(): JSX.Element {
    const {projects, displayMode, scrollTo, currentElementInView, setCurrentElementInView } = useProjectStore((state) => state,);
    let nextProjectToLoad = useRef<number>(0)
    const [projectsToLoad, setProjectsToLoad] = useState<Project[]>([]);
    const [projectLoaded, setProjectLoaded] = useState<boolean>(true);
    const [containerHeight, setContainerHeight] = useState<number>(0)
    const feedContainerRef = useRef(null);
    const [cursor, setCursor] = useState<'left' | 'right'>('right');

    useEffect(() => {
        if(feedContainerRef.current) {
            const containerElement: HTMLDivElement = feedContainerRef.current;
            setContainerHeight(containerElement.offsetHeight);
        }
    },[]);

    useEffect(() => {
        if(scrollTo) {
            const element: HTMLElement | null = document.getElementById(scrollTo);
            if(element && displayMode === 'desktop') {
                element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
            }
            if(element && displayMode === 'mobil') {
                element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
            }
        }
    },[scrollTo, displayMode]);

    useEffect(() => {
        // console.log(nextProjectToLoad, projectLoaded, 'next project to load');
        if(projects.length > 0) {
            setProjectsToLoad(prev => [...prev, projects[0]])
            nextProjectToLoad.current = nextProjectToLoad.current +1
        }
    },[projects]);

    const handleProjectLoaded = () => {
        setProjectLoaded(true);
        if (nextProjectToLoad.current < projects.length) loadAnotherProject();

    }

    const loadAnotherProject = () => {
        const nextProject = projects[nextProjectToLoad.current];
        setProjectsToLoad(prev => [...prev, nextProject]);
        setProjectLoaded(false);
        nextProjectToLoad.current = nextProjectToLoad.current +1;
    }

    function handleClick(event: MouseEvent) {
        const eventTarget = event.target as HTMLElement
        const eventParent = eventTarget.parentElement as HTMLElement
        const newHandle = getElementToScrollTo(event.clientX, eventParent, currentElementInView) as string;
        setCurrentElementInView(newHandle);
        // set active Project here with the new handle
    }

    function handleCursorDisplay(event: MouseEvent) {
        const side = getScreenSide(event.clientX);
        if (side !== cursor) setCursor(side);
    }

    function getCursor() {
        if(!cursor) return 'auto';
        if(cursor === 'left') return 'w-resize';
        if(cursor === 'right') return 'e-resize';
    }

    if(displayMode === 'loading') {
        return <div className={Style.container} ref={feedContainerRef}/>
    }

    if(projectsToLoad.length > 0) {
        if(displayMode === 'mobil') {
            return (
                <div className={Style.container} ref={feedContainerRef}>
                    {projectsToLoad.map((project: Project, index: number) => {
                        if(index === 1) {
                            return (
                                <div key={project.ID}>
                                    <Navigation />
                                    <FeedProject usableHeight={containerHeight} project={project} handleProjectLoaded={handleProjectLoaded} firstProject={false}/>
                                </div>
                            )
                        }
                        return <FeedProject key={project.ID} usableHeight={containerHeight} project={project} handleProjectLoaded={handleProjectLoaded} firstProject={index === 0}/>
                    })}
                    <InfoBubble />
                </div>
            )
        }
        return (
            <>
                <div className={Style.container} ref={feedContainerRef} onClick={handleClick} onMouseMove={handleCursorDisplay} style={{cursor: getCursor()}}>
                    {projectsToLoad.map((project: Project, index) => {
                        return <FeedProject key={project.ID} usableHeight={containerHeight} project={project} handleProjectLoaded={handleProjectLoaded} firstProject={index === 0}/>
                    })}

                </div>
                <InfoBubble />
            </>

        )
    }

    return <div className={Style.container} ref={feedContainerRef}/>
}

