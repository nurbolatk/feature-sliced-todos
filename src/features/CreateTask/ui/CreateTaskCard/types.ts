export interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement,
    completed: RadioNodeList
}

export interface TaskCardFormElement extends HTMLFormElement {
    elements: FormElements
}