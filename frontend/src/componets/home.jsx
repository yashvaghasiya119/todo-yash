import { useEffect, useState } from "react";
import {ToastContainer} from "react-toastify"
import { success } from "./toast";

export function Home() {
    const [data, setdata] = useState([])
    const [work, setwork] = useState("")
    const [date, setdate] = useState("")
    const [userid, setuserid] = useState("")
    const [dataupdats, setdataupdate] = useState(false)
    const dateandwork = { work, date }
    async function fetchdata() {
        let fe = await fetch("http://localhost:8000/todo/allworks", {
            credentials: 'include'
        });
        let res = await fe.json()
        setdata(res.data)
    }
    useEffect(() => {
        fetchdata()
    }, [])
    ///update data
    function updatefun(user) {
        console.log(user);
        setuserid(user._id)
        setdataupdate(true)
        setwork(user.work)
        setdate(user.data)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const responce = await fetch(`http://localhost:8000/todo/update/${userid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(dateandwork)
        })
        const res = await responce.json()
        if(res.success){
            success(res.msg)
        }
        console.log(res);
        fetchdata()
        setdataupdate(false)
    }
    function cancel() {
        setdataupdate(false)
    }
    // delete data 
    async function deletefun(id) {
        console.log(id);
        
        const responce = await fetch(`http://localhost:8000/todo/delete/${id}`, {
            method:"DELETE",
            credentials: 'include',
        })
        const res = await responce.json()
        if(res.success){
            success(res.msg)
        }
  fetchdata()
    }
    return <>
        {
            dataupdats ? <div>
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
                    <div className="update-cancel">
                        <button onClick={cancel} className="submit-btn cancel">cancel</button>
                        <button type="submit" className="submit-btn submit">Submit</button>
                    </div>
                </form>
            </div> : <div>
                {
                    data && (
                        <div className="todo-container">
                            {data.map((c, i) => (
                                <div key={i} className="todo-item">
                                    <h3 className="todo-work">{c.work}</h3>
                                    <h5 className="todo-date">{c.date}</h5>
                                    <div className="todo-buttons">
                                        <button className="update-btn" onClick={() => updatefun(c)}>Update</button>
                                        <button className="delete-btn" onClick={() => deletefun(c._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        }
<ToastContainer/>
    </>
}


// yashvaghasiya360
// O5cuhkcb9Z04iIfe