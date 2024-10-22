import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig';  // Import Firestore instance
import { collection, query, where, getDocs } from 'firebase/firestore';  // Firestore functions

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // To handle error messages
    const navigate = useNavigate();

    // Handle login validation
    const handleLogin = async () => {
        // Reset error message
        setError("");

        // Check if email or password is empty
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        try {
            // Query Firestore for the tbl_teacher collection
            const q = query(
                collection(db, "tbl_teacher"),  // Reference to the collection
                where("Email", "==", email),    // Match email
                where("Password", "==", password) // Match password
            );

            const querySnapshot = await getDocs(q);

            // Check if any matching user was found
            if (!querySnapshot.empty) {
                // User is authenticated, redirect to Library
                navigate('/Library');
            } else {
                // Invalid credentials
                setError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            console.error("Error logging in: ", err);
            setError("An error occurred while logging in.");
        }
    };

    return (
        <div className="bg-white-100 flex justify-center items-center h-screen">
            <section className="login text-custom-brownnav p-5" style={{ maxWidth: '620px', width: '100%' }}>
                <h2 className="text-2xl text-center">Log in and let's start</h2>
                <section className="flex flex-col mt-4 container-with-label">
                    <label htmlFor="email" className="text-sm">
                        Email
                    </label>
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                        className="p-2 border border-custom-brownnav rounded-lg"
                        style={{ maxWidth: '100%' }}
                    />
                    <label htmlFor="password" className="text-sm mt-2">
                        Password
                    </label>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Update password state
                        className="p-2 border border-custom-brownnav rounded-lg"
                        style={{ maxWidth: '100%' }}
                    />
                    <span
                        className="text-right text-sm opacity-75 mt-2 cursor-pointer"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password? 
                    </span>
                </section>
                <button
                    onClick={handleLogin}
                    className="h-12 mt-4 bg-custom-yellow text-custom-brownnav rounded-lg w-full font-bold"
                    style={{ maxWidth: '100%' }}
                >
                    LOGIN
                </button>

                {error && (
                    <p className="text-custom-brownnav text-sm mt-2 text-center">{error}</p>
                )}
            </section>
        </div>
    );
};

export default Login;
