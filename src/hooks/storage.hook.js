const useStorage = () => {
    function getItem(key) {
        const result = localStorage.getItem(key);
        return JSON.parse(result) ?? null;
    }

    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function removeItem(key) {
        localStorage.setItem(key);
    }

    return {
        getItem,
        setItem,
        removeItem
    }
}

export default useStorage;