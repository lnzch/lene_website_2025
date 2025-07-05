import {JSX, useState} from "react";
import Style from '@/styles/InfoBubble.module.css';
import {useProjectStore} from "@/store/storeProvider";
import parse from 'html-react-parser';

export default function InfoBubble() :JSX.Element {
    const {activeProject} = useProjectStore((state) => state,)
    const [isBubbleVisible, setIsBubbleVisible] = useState<boolean>(false)

    const calculateBubbleClasses = () => {
        return [
            Style.textContainer,
            isBubbleVisible ? false : Style.notVisible,
        ].filter(e => e).join(' ')
    }

    if(activeProject) {
        return (
            <div
                className={Style.container}
                style={{backgroundColor: activeProject.color}}
                onClick={() => setIsBubbleVisible(prev => !prev)}
                // onPointerUp={() => setIsBubbleVisible(prev => !prev)}
            >
                <div className={calculateBubbleClasses()}>
                    <p>{parse(activeProject["project-text"])}</p>
                </div>
            </div>
        )
    }

    return (
        <></>
    )
}