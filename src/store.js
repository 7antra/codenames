import { writable } from "svelte/store";

let mobile = writable(false);

let Store = writable([])

let humanity = {
    subscribe: Store.subscribe,

    setPopulation: arr => {
        Store.set(arr)
    },

    add: newHuman => {
        Store.update(humans => {
            return [...humans, newHuman]
        })
    },

    edit: edited => {
        Store.update( els => {
            let i = els.findIndex(el => el.id === edited.id)
            els[i] = edited
            return els
        })
    }
}

export {mobile, humanity}