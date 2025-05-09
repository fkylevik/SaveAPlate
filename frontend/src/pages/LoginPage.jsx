import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage]=useState("");


    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault(); // prevent built-in submission of form

        try {
            const res = await api.post("/api/token/", {username, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.REFRESH_TOKEN);
            window.location.href = "/" // navigates to home page if successful login
        } catch (error) {
            if(error.response && error.response.status===401){
                setErrorMessage("Invalid username or password");
            }
            else {
                alert("An unexpected error occurred. Please try again");
            }
        } finally {
            setLoading(false);
        };
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h1>Sign In</h1>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=" "
                    id="username"

                />
                <label className="form-label" htmlFor="username">Username</label>
            </div>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    id="password_l"
                    required
                />
                <label className="form-label" htmlFor="password_l">Password</label>
            </div>

            <p className="errorMess">{errorMessage}</p>

            <button className="form-button" type="submit">Login</button>
            <Link to="/register">Don't have an account? Register here</Link>
        </form>
    );
}

export default LoginPage;