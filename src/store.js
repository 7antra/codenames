import { writable, derived } from "svelte/store";

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

let infected = derived(humanity,
    $humanity => {
        let total = 0;
        $humanity.forEach(human=>{
            if(human.sick) {
                total++
            }
        })

        return total;
    })

export {mobile, humanity, infected}