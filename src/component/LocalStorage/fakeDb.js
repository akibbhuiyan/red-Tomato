const getUser = () => {
    const existingUser = sessionStorage.getItem('userId');
    if (existingUser) {
        return existingUser;
    } else {
        const newUser = 'user-' + new Date().getTime();
        sessionStorage.setItem('userId', newUser)
        return newUser;
    }
}


const getDataKey = () => {
    const userId = getUser();
    return `redTomato/foodinfo/${userId}`
}
//Push to localstorage
const getDatabaseCart = () => {
    const dataId = getDataKey();
    const data = localStorage.getItem(dataId) || "{}";
    return JSON.parse(data)
}
const addToDatabaseCart = (id, count) => {
    const currentCart = getDatabaseCart();
    currentCart[id] = count;
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}
const removeFromDatabaseCart = id => {
    const currentCart = getDatabaseCart();
    delete currentCart[id];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}
const proccessOrder = (food) => {
    localStorage.removeItem(getDataKey())
}
export { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, proccessOrder }

//polly

const localStorage = window.localStorage || (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key]
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {}
        }
    };
})()
const sessionStorage = window.sessionStorage || (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key]
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {}
        }
    }
})()