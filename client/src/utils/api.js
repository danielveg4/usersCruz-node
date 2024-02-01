import { fetchData } from "./fetchData";
import { HEADERS } from '../constants/headers';
import { METHODS } from '../constants/methods';

export const getData = async (url) => {
    const data = await fetchData(url, {
        method: METHODS.GET
    });
    return data;
}

export const patchData = async (url, body = {}) => {
    const data = await fetchData(url, {
        method: METHODS.PATCH,
        body: JSON.stringify(body),
        headers: HEADERS
    });
    return data;
}

export const postData = async (url, body = {}) => {
    const data = await fetchData(url, {
        method: METHODS.POST,
        body: JSON.stringify(body),
        headers: HEADERS
    });
    return data;
}

export const deleteData = async (url, body = {}) => {
    const data = await fetchData(url, {
        method: METHODS.DELETE,
        body: JSON.stringify(body),
        headers: HEADERS
    });
    return data;
}
