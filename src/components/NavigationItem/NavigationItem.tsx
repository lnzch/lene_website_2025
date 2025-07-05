import React from 'react';
import Style from '@/styles/Navigation.module.css';
import {MouseEvent} from "react";

interface NavigationItemProps {
    projectTitle: string,
    projectID: number,
    handleClick: (event: MouseEvent, projectID: number) => void,
    lastItem: boolean,
    isActive: boolean,
}

export default function NavigationItem({projectTitle, projectID, handleClick, lastItem, isActive}: NavigationItemProps) {

    const defineClasses = () => {
        return [
            Style.navigationListItem,
            isActive ? Style.navigationListItemActive : false,
        ].filter((e) => e).join(' ');
    }

    return (
        <>
            <a className={defineClasses()} onClick={(e) => handleClick(e, projectID)}>{projectTitle}</a>
            {!lastItem && <span>&nbsp;/&nbsp;</span>}
        </>
    )
}