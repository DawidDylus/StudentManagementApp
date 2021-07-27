
const checkStatus = response => {
    if (response.ok) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllStudents = () => {

   return fetch("api/students")
        .then(checkStatus);
}

export const addNewStudent = student => {
    return fetch("api/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student),
    });
}

