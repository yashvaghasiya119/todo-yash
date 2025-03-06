
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { failed, success } from './toast';

export function Data() {
    const [work, setwork] = useState('');
    const [date, setdate] = useState('');
    const [statuss,setstatus]=useState(false)
    const navi = useNavigate("/")
 const data = {work,date}
    async function handleSubmit(e){
        e.preventDefault()
        const responce = await fetch("http://localhost:8000/todo",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials: 'include',
            body:JSON.stringify(data),
        })
        let res1 = await responce.json()
        console.log(res1)
        if(res1.success){
            success(res1.msg)
            setTimeout(() => {
                navi("/")
            }, 1000);
        }
        else if(!res1.success){
            failed(res1.msg)
        }
        
    }
    async function response2(){
        const res2 = await fetch("http://localhost:8000/todo/api/checkLoginStatus", {
            credentials: 'include',
        });
        const res2json = await res2.json()
        console.log(res2json);
        if(res2.isLoggedIn){
            setstatus(true)
        }
   }
   useEffect(()=>{
    response2()
   },[])
  
    return (
        <div className="signup-container">
            <div className="center">
                <h2>Add Todo</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Enter your work</label>
                        <input
                            type="text"
                            id="name"
                            name="work"
                            value={work}
                            onChange={(e) => setwork(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Enter your work date</label>
                        <input
                            type="datetime-local"
                            id="email"
                            name="date"
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}
