import {JSX} from "react";
import parse from 'html-react-parser'
import {useProjectStore} from "@/store/storeProvider";
import Style from '@/styles/InfoModal.module.css'

export default function InfoModal() : JSX.Element {
    const {contactInfo} = useProjectStore((state) => state,)
    return (
        <div className={Style.main}>
            <p className={Style.text}>{parse(contactInfo)}</p>
        </div>
    )
}