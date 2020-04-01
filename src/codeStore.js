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

const count = derived(
    codeName,
    $codeName => {
        let blue = 0;

        let extractBlue = $codeName.filter(el => {
            if(el.color === 'blue' && el.decouvert) {
                return el;
            }
        })

        let extractRed = $codeName.filter(el => {
            if(el.color === 'red' && el.decouvert) {
                return el;
            }
        })

        return {red: extractRed.length, blue: extractBlue.length}
    }
)

let loading = writable(false);

export {codeName, numUsers, starter, spy, count, loading}