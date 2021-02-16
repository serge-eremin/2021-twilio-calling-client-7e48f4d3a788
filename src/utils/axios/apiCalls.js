import axios from 'axios'

export const getData = ({ url, params }) => {
    const options = {
        method: 'GET',
        params,
        url,
    }
    return axios(options)
}

export const postData = ({ url, body }) => axios.post(url, body)

export const putData = ({ url, body }, config) => axios.put(url, body, config)

export const deleteData = (url, data) => axios.delete(url, { data })
