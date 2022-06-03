import axios from "axios";
import React from "react";
import { useRoutes } from "react-router-dom";

const ORIGIN_URL = 'http://127.0.0.1:8000/api/';
const USERS_ENDPOINT = 'users/';

const User = () => {
    const id = useRoutes();
    let user;
    axios.get(`${ORIGIN_URL}${USERS_ENDPOINT}${id}`).then(
        (response) => {
            user = response.data;
        }
    )
        .catch((error) => { console.log(error) })

    return (
        <div className="userData">
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div >
    )
}

export default User;