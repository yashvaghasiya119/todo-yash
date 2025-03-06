
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { failed, success } from './toast';

export function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navi = useNavigate("/")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        console.log(data); // Check the response from the backend
        if(data.success){
            success(data.msg)
            setTimeout(() => {
                navi("/")
            }, 1500);
        }
        else if(!data.success){
          failed(data.msg)
        }
    };
    return (
        <div className="signup-container">
            <div className="center">
                <h2>Signup Form</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Enter your name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Enter your email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter your password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}
