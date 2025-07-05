import {calculatedImageInformation, ImageRect} from "@/models/Image";

export const getImageInformation = (src: string) => {
    return new Promise<ImageRect>((resolve) => {
        const tempImage = new Image()
        tempImage.src = src;
        tempImage.onload = () => {
            const imageInfoObject = {
                width: tempImage.width,
                height: tempImage.height,
            }
            resolve(imageInfoObject);
        }
        tempImage.onerror = () => {
            throw new Error('Bild konnte nicht geladen werden');
        }
    })
}

// export const getVideoInformation = (src: string) => {
//     return new Promise<ImageRect>((resolve) => {
//         const newVideo = new Video()
//     })
// }

export const calculateImageSize = async (src : string, containerHeight: number) : Promise<calculatedImageInformation | string>=> {
    try {
        const imageRect = await getImageInformation(src);
        return {
            ...imageRect,
            calculatedWidth: imageRect.width / imageRect.height * containerHeight,
        }
    } catch(e) {
        console.log(e)
        return 'Es ist etwas schief gelaufen';
    }
}