export const BASE_URL = "http://localhost:"; 

export async function get(portnumber, path){
    const res = await fetch(`${BASE_URL}${portnumber}/${path}`);
    return res;
}

export async function create(portnumber, path, data){
    const res = await fetch(`${BASE_URL}${portnumber}/${path}`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
    return res.json(); 
}

export async function edit(portnumber, path, data){
    const res = await fetch(`${BASE_URL}${portnumber}/${path}`, {
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
    return res.json();  
}

export async function remove(portnumber, path){
    return fetch(`${BASE_URL}${portnumber}/${path}`, {
        method: "DELETE"
    })
}