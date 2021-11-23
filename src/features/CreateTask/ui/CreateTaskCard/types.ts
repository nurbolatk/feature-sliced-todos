export interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement,
    completed: HTMLInputElement
}

export interface TaskCardFormElement extends HTMLFormElement {
    elements: FormElements
}