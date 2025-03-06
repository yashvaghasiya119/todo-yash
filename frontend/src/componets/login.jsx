import { useState } from "react";
import { failed, success } from "./toast";
import {useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"

export function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    let data = { email, password }
    const navi = useNavigate()
    async function submitform(e) {
        e.preventDefault()
        const response = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        const response1 = await response.json()
        console.log(response1);

        if (response1.success) {
            success(response1.msg)
            setTimeout(() => {
                navi("/")
            }, 1300);
        }
        else if(!response1.success){
            failed(response1.msg)
          }
    }
    return (
        <div className="signup-container">
            <div className="center">
                <h2>Login Form</h2>
                <form className="signup-form" onSubmit={submitform}>
                    <div className="form-group">
                        <label htmlFor="email">Enter your email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter your password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}
