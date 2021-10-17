export const getApiResult = (result) => {
    if (!result.ok) {
        return Promise.reject('Server error');
    }
    return result.json();
}

export const getToken = () => {
    return localStorage.getItem("token");
}
