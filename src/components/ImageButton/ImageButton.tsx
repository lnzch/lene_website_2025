import {JSX, useState} from "react";
import Style from '@/styles/ImageButton.module.css';
import InfoModal from "@/components/InfoModal/InfoModal";

export default function ImageButton(): JSX.Element {
    const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false)
    function handleClick() {
        setIsInfoOpen(prev => !prev);
    }
    return (
        <div className={Style.main}>
            <img src={'/lene_kopf.png'} alt={'profil picture'} onClick={handleClick}/>
            {isInfoOpen && <InfoModal />}
        </div>
    )
}