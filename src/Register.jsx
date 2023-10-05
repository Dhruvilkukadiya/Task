import { useState } from "react";
import useStorage from "./hooks/storage.hook";
import { useNavigate } from "react-router-dom";

function Register() {
    const { getItem, setItem, removeItem } = useStorage();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();
        const userList = getItem('users') ?? [];
        const alreadyExist = userList.find((ele) => ele.email === email);
        if (alreadyExist) {
            alert("Email is already exist");
        } else {
            setItem('users', [...userList, { name, email, password }]);
            navigate("/");
        }
    }

    return (
        <>
            <h1>Register Form</h1>
            <form className="register-form" onSubmit={(event) => onSubmit(event)}>
                <input type="text" className="form-control" placeholder="Enter name" onChange={(event) => setName(event.target.value)} />
                <input type="text" className="form-control" placeholder="Enter email" required onChange={(event) => setEmail(event.target.value)} />
                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                <button className="btn">Submit</button>
            </form>
        </>
    )
}

export default Register;