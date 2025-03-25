import { useState } from "react"
import api from "../api"
import { useNavigate, Link } from "react-router-dom"

function RegisterForm({route}) {
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
            const res = await api.post(route, {username, email, first_name, last_name, password});
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
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                className="form-input"
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">Register</button>
            <Link to="/login" className="alternate-link">Already have an account? Sign in here</Link>
        </form>
    );
}

export default RegisterForm;