const validation = (users) => {
    let error = {};

    if (!users.email) {
        error.email = "Email is required";
    }
    if (!users.password) {
        error.password = "Password is required";
    }
    return error;

    return Object.keys(error).length === 0; // Returns true if there are no errors
};

export default validation;
