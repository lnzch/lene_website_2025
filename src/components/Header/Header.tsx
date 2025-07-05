import {JSX, useState} from "react";
import Logo from '../Logo/Logo';
import Navigation from "@/components/Navigation/Navigation";
import ImageButton from "@/components/ImageButton/ImageButton";
import Style from '@/styles/Header.module.css';
import {useProjectStore} from "@/store/storeProvider";

export default function Header(): JSX.Element {
    const {displayMode } = useProjectStore((state) => state,);

    return (
        <div className={Style.main}>
            <div className={Style.firstRow}>
                <Logo />
                {displayMode === 'desktop' && <Navigation />}
                <ImageButton />
            </div>

        </div>
    )
}