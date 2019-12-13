import {writable} from 'svelte/store';


let store = writable([])


const customStore = {
    subscribe: Store.subscribe,
    setStore: (arr) => {
        Store.set(arr)
    },
    add: elNew => {    
        Store.update(el => {
            return [elNew, ...el];
        })
    },
    remove: id => {
        Store.update(els => els.filter(el => el.id !== id))
    },
    edit: edited => {
        Store.update( els => {
            let i = els.findIndex(el => el.id === edited.id)
            els[i] = edited
            return els
        })
    },
    total: () => {
        console.log(Store)
        //return Store.map(li => li.plus).reduce((a, b) => a + b, 0) + Store.length
    }
}

export default customStore