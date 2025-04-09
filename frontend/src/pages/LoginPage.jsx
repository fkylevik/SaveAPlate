import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault(); // prevent built-in submission of form

        try {
            const res = await api.post("/api/token/", {username, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.REFRESH_TOKEN);
            navigate("/"); // navigates to home page if successful login
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        };
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">Login</button>
            <Link to="/register">Don't have an account? Register here</Link>
        </form>
    );
}

export default LoginPage;