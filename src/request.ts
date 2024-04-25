const BASE_URL = 'https://api.dev.esig.al/api/v1';

export default async function _request(endpoint: string, token: string, options: any, geri = false) {

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        // next: {
        //     revalidate: 1
        // },
        ...options
    });

    if (geri) {
        return response
    }

    return await response.json();
}


const BASE_URL_ESIG = 'https://apigerit.esig.al';


interface _RequestInit extends RequestInit {
    body?: any
};

export async function request(url: string, options: _RequestInit) {

    const response = await fetch(
        `${BASE_URL_ESIG}${url}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            ...options,
            body: JSON.stringify(options.body),
        }
    );

    const _response = await response.json();

    if (response.ok) {
        return _response;
    }

    if (response.status === 500) {
        throw new Error('500 (Internal Server Error)')
    }
    throw _response;

}