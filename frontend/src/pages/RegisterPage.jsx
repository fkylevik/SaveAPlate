import { useState } from "react"
import api from "../api"
import { useNavigate, Link } from "react-router-dom"
import '../styles/Form.css';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        setLoading(true);
        e.preventDefault(); // prevent built-in submission of form

        try {
            const res = await api.post("/api/user/register/", {username, email, first_name, last_name, password});
            navigate("/login")
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        };
    };

    return (
        <form onSubmit={handleRegister} className="login-form">
            <h1>Sign Up</h1>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=" "
                    id="username"
                />
                <label className="form-label" htmlFor="username">Username</label>
            </div>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    id="email"
                />
                <label className="form-label" htmlFor="email">Email Address</label>
            </div>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=" "
                    id="f_name"
                />
                <label className="form-label" htmlFor="f_name">First Name</label>
            </div>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=" "
                    id="l_name"
                />
                <label className="form-label" htmlFor="l_name">Last Name</label>
            </div>
            <div className="form-input-container">
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    id="password"
                />
                <label className="form-label" htmlFor="password">Password</label>
            </div>

            <button className="form-button" type="submit">Register</button>
            <Link to="/login" className="alternate-link">Already have an account? Sign in here</Link>
        </form>
    );
}

export default RegisterForm;