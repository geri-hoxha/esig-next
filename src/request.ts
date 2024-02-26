const BASE_URL = 'https://api.dev.esig.al/api/v1';

export default async function request(endpoint: string, token: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: {
            revalidate: 1
        }
    });
    
    return await response.json();
}