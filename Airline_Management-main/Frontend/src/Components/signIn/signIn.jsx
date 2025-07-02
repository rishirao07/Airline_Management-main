import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignUp ? 'signup' : 'signin';
        const payload = isSignUp ? { name, email, password } : { email, password };
        
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/${endpoint}`, payload);
            setMessage(response.data.message);
            setMessageType('success');

            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log('User data stored:', response.data.user);
            }

            navigate('/profile');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error processing request');
            setMessageType('error');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                {isSignUp && (
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                {message && <p className={`message ${messageType}`}>{message}</p>}
                <p className="toggle-auth">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
                    <span onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? ' Sign In' : ' Sign Up'}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
