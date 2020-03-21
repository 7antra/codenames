import { writable, derived } from "svelte/store";

let Store = writable([])

let codeName = {
    subscribe: Store.subscribe,
    setStore: (arr) => {
        Store.set(arr)
    },
    edit: (edited,i) => {
        Store.update( els => {
            els[i] = edited
            return els
        })
    },
}

let numUsers = writable(1);
let starter = writable('white');
let spy = writable(false);
let id = writable('');

export {codeName, numUsers, starter, spy, id}