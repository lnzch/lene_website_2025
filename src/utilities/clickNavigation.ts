
export function getElementToScrollTo(xCoordinate: number, clickedElement: HTMLElement, currentElementInViewHandle: string | null) {
    //use previous and next element sibling
    const viewWidth: number = window.innerWidth;
    // console.log(currentElementInViewHandle, 'current handler');
    // console.log(clickedElement.getAttribute('id'), 'pressed item');
    const clickedElementHandle = clickedElement.getAttribute('id') as string
    if(currentElementInViewHandle) {
        // console.log(currentElementInViewHandle, clickedElementHandle, 'error log')
        if(!compareHandles(currentElementInViewHandle, clickedElementHandle)) {
            scrollElementIntoView(clickedElement);
            return clickedElementHandle;
        }
        returnIndexProjectNumbers(currentElementInViewHandle);
        // console.log(currentElementInViewHandle)
        const currentElementInView = document.getElementById(currentElementInViewHandle);
        // console.log(currentElementInView, 'log from handler');
        if(currentElementInView) {
            if(xCoordinate > (viewWidth / 2)) {
                //getNextElement
                // console.log(currentElement, 'next')
                if(currentElementInView.nextElementSibling) {
                    scrollElementIntoView(currentElementInView.nextElementSibling);
                    return updateHandle(currentElementInViewHandle, 'item_up');
                }
                else {
                    //check for sibling from different project
                    const nextProjectHandle = updateHandle(currentElementInViewHandle, 'project_up');
                    const nextProjectItem = document.getElementById(nextProjectHandle);
                    if(nextProjectItem) {
                        scrollElementIntoView(nextProjectItem);
                        return nextProjectHandle;
                    } else {
                        return currentElementInViewHandle;
                    }
                }
            } else {
                //get previous Element
                // console.log(currentElement, 'previous')
                if (currentElementInViewHandle === '1_0') return '1_0';
                if(currentElementInView.previousElementSibling) {
                    scrollElementIntoView(currentElementInView.previousElementSibling);
                    return updateHandle(currentElementInViewHandle, 'item_down');
                } else {
                    //check for sibling from different project
                    const previousItemHandle = updateHandle(currentElementInViewHandle, 'project_down');
                    const previousItem = document.getElementById(previousItemHandle);
                    if(previousItem) {
                        scrollElementIntoView(previousItem);
                        return previousItemHandle;
                    }
                }
            }
        }
    }
}

function updateHandle(handle: string, method: 'item_up' | 'item_down' | 'project_up' | 'project_down') {
    const {projectIndex, itemIndex} = returnIndexProjectNumbers(handle);
    if(method === 'item_up') {
        const newItemIndex = itemIndex + 1;
        return `${projectIndex}_${newItemIndex}`;
    }
    if(method === 'item_down') {
        const newItemIndex = itemIndex - 1;
        return `${projectIndex}_${newItemIndex}`;
    }
    if(method === 'project_up') {
        const newProjectIndex = projectIndex + 1;
        return `${newProjectIndex}_0`;
    }
    if(method === 'project_down') {
        const newProjectIndex = projectIndex - 1;
        const previousItem = document.getElementById(`project_${newProjectIndex}`)?.lastElementChild
        if(previousItem) {
            return previousItem.getAttribute('id') as string;

        }
        return `${newProjectIndex}_0`
    }
    return ''
}

function returnIndexProjectNumbers(handle: string) {
    const tempArray = handle.split('_');
    // console.log(tempArray)
    return {
        projectIndex: Number(tempArray[0]),
        itemIndex: Number(tempArray[1]),
    }
}

function returnIndexProjectNumbersArray(handle: string) {
    const tempArray = handle.split('_');
    // console.log(tempArray)
    return [
        Number(tempArray[0]),
        Number(tempArray[1])
    ]
}

function scrollElementIntoView(element: Element) {
    element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'})
}

function compareHandles(current: string, clicked: string) {
    if(!current || !clicked) return true;
    const [currentProject, currentItem] = returnIndexProjectNumbersArray(current);
    const [clickedProject, clickedItem] = returnIndexProjectNumbersArray(clicked);

    if((currentProject + 1) < clickedProject ) return false

    return true;
}

export function getScreenSide(xCoordinate: number) : 'left' | 'right' {
    const viewWidth: number = window.innerWidth;
    return xCoordinate > (viewWidth / 2) ? 'right' : 'left';
}

export function returnProjectIDFromHandle(handle: string) : number {
    const tempArray = handle.split('_');
    return Number(tempArray[0]);
}

