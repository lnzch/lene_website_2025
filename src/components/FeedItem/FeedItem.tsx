import {JSX, memo, useMemo, useState, MouseEvent, useEffect, useRef} from "react";
import {ImageInterface} from "@/models/project";
import {calculateImageSize} from "@/utilities/imageUtils";
import {calculatedImageInformation} from "@/models/Image";
import  Image from 'next/image';
import {getElementToScrollTo} from "@/utilities/clickNavigation";
import {useProjectStore} from "@/store/storeProvider";

interface FeedItemProps {
    type: 'image' | 'video',
    data: ImageInterface,
    usableHeight: number | null,
    handleLoaded: () => void,
    isFirst: boolean,
    projectID: number,
    itemCount: number,
}
const FeedItem =  memo(
    function FeedItem({
                          data,
                          usableHeight,
                          handleLoaded,
                          isFirst,
                          type,
                          projectID,
                          itemCount
    } : FeedItemProps) : JSX.Element {

        const {setActiveProject} = useProjectStore((state) => state,);
    const [calcImgInfo, setCalcImgInfo ] = useState<calculatedImageInformation>({width: 0, height: 0, calculatedWidth: 0});
    const imageRef = useRef(null);
    const imageInformation = useMemo(async () => {
        if(usableHeight && data.type === 'image') {
            const imagedata = await calculateImageSize(data.url, usableHeight);
            if(typeof imagedata === 'object') {
                setCalcImgInfo(imagedata);
                handleLoaded();
            }
        }
    }, [data.url, usableHeight, handleLoaded]);

    useEffect(() => {
        if(imageRef.current) {
            const callbackFunc = (e: any) => {
                // console.log('observe', e, data.alternativeText);
                if(e[0].isIntersecting) {
                    // console.log(projectID, data.alternativeText, 'is intersecting');
                    setActiveProject(projectID);
                }
            }

            let options = {
                root: document.querySelector("#scrollArea"),
                rootMargin: "0px",
                threshold: 1.0,
            };

            let observer = new IntersectionObserver(callbackFunc, options);
            observer.observe(imageRef.current);
        }
    }, [])

    const imageID = useMemo(() => {
        return `${projectID}_${itemCount}`
    },[projectID,itemCount]);

    function handleClick(event: MouseEvent) {
        // console.log(event)
        // const eventTarget = event.target as HTMLElement
        // const eventParent = eventTarget.parentElement as HTMLElement
        // getElementToScrollTo(event.clientX, eventParent);
    }

    if(data.type === 'image') {
        if (usableHeight !== null && usableHeight > 0 && type === 'image') {
            return (
                <div id={imageID} onClick={handleClick}>
                    <Image
                        src={`/${data.url}`}
                        width={calcImgInfo.calculatedWidth}
                        height={usableHeight}
                        alt={data.alternativeText}
                        priority={isFirst}
                    />
                </div>
            )
        }

        return (
            <div id={imageID}>
                <Image
                    ref={imageRef}
                    src={`/${data.url}`}
                    width={900}
                    height={900}
                    alt={data.alternativeText}
                    priority={isFirst}
                    onLoad={handleLoaded}
                />
            </div>
        )
    }
    if(data.type === 'video') {
        if(usableHeight !== null && usableHeight > 0){
            return (
                <div id={imageID} onClick={handleClick}>
                    <video
                        src={data.url}
                        height={usableHeight}
                        onLoadedData={handleLoaded}
                        autoPlay={true}
                        loop={true}
                        playsInline={true}
                        muted
                        style={{height: usableHeight}}
                    ></video>
                </div>
            )
        }
        return (
            <div id={imageID}>
                <video
                    ref={imageRef}
                    src={data.url}
                    onLoadedData={handleLoaded}
                    loop={true}
                    muted
                    playsInline={true}
                    autoPlay={true}
                ></video>
            </div>
        )
    }

    return <div></div>

},checkPropsEquality)

function checkPropsEquality(oldProps: FeedItemProps, newProps: FeedItemProps) {
    if (oldProps.handleLoaded.toString() !== newProps.handleLoaded.toString()) return false;
    if (oldProps.type !== newProps.type) return false;
    if (oldProps.data.url !== newProps.data.url) return false;
    return oldProps.usableHeight === newProps.usableHeight;
}

export default FeedItem