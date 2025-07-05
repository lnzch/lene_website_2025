export interface Project {
    title: string,
    'project-text': string,
    ID: number,
    color: 'string',
    images: ImageInterface[]
}

export interface ProjectTitle {
    title: string,
    ID: number,
}

export interface ImageInterface {
    'url': string,
    isVertical: boolean,
    alternativeText: string,
    heightInPercent: number,
    type: 'video' | 'image',
}

export interface Contact {
    insta: string,
    mail: string,
}