import {JSX} from "react";
import Style from '@/styles/Logo.module.css'
import {useProjectStore} from "@/store/storeProvider";

export default function Logo(): JSX.Element {
    const {setScrollTo } = useProjectStore((state) => state);
    return (
        <div className={Style.main} onClick={() => setScrollTo(1)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Logo"/>
        </div>
    )
}