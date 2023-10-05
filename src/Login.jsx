import { useState } from "react";
import useStorage from "./hooks/storage.hook";
import { useNavigate } from "react-router-dom";

function Login() {
    const { getItem, setItem } = useStorage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();
        const userList = getItem('users') ?? [];
        const alreadyExist = userList.find((ele) => ele.email === email && ele.password === password);
        if (alreadyExist) {
            setItem('profile', alreadyExist);
            navigate("/");
        } else {
            alert("Invalid email/password");
        }
    }

    return (
        <>
            <h1>Login Form</h1>
            <form className="login-form" onSubmit={(event) => onSubmit(event)}>
                <input type="email" className="form-control" placeholder="Enter email" required onChange={(event) => setEmail(event.target.value)} />
                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                <button className="btn">Submit</button>
            </form>
        </>
    )
}

export default Login;