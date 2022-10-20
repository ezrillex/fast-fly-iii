
import { is_empty } from 'svelte/internal';
import { writable } from 'svelte/store';


let templates = []
let stored = JSON.parse(localStorage.getItem("templates"));

if (stored === null || is_empty(stored)) {
    localStorage.setItem("templates", JSON.stringify(templates));
}
else{
    templates = stored
}

export const templateStore = writable( templates );

templateStore.subscribe((value) => {
    localStorage.setItem("templates", JSON.stringify(value))
})