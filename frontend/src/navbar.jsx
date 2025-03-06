
// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {useNavigate} from "react-router-dom"

// export function Navbar() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navi = useNavigate()
//     useEffect(() => {
//         // Check if the user is logged in
//         // You can check for a cookie, session storage, or make an API call to your backend
//         const checkLoginStatus = async () => {
//             try {
//                 const response = await fetch("http://localhost:8000/todo/api/checkLoginStatus", {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();
                
//                 if (data.isLoggedIn) {
//                     setIsLoggedIn(true);
//                     navi("/");  // Navigating to home page
//                 } else {
//                     setIsLoggedIn(false);
//                 }
//             } catch (error) {
//                 console.error("Error checking login status", error);
//             }
//         };
       

//         checkLoginStatus();
//     }, []);
//     async function logout(){
//  const lO =  await fetch("http://localhost:8000/user/logout")
//  let js = await lO.json()
//  console.log(js);
// setIsLoggedIn(false);
// navi("/login");  
//     }
//     return (
//         <div className="navbar">
//             <ul className="nav-links">
//                 <li>
//                     <NavLink to="/" className="nav-link">Home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/adddata" className="nav-link">Add Data</NavLink>
//                 </li>
//                 {!isLoggedIn ? (
//                     <>
//                         <li>
//                             <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/login" className="nav-link">Login</NavLink>
//                         </li>
//                     </>
//                 ) : (
//                     <li>
//                         <NavLink to="/#" className="nav-link" onClick={logout}>Logout</NavLink>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     );
// }
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navi = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const checkLoginStatus = async () => {
            try {
                const response = await fetch("http://localhost:8000/todo/api/checkLoginStatus", {
                    credentials: 'include',
                });
                const data = await response.json();

                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking login status", error);
            }
        };

        checkLoginStatus();
    }, []);

    async function logout() {
        const lO = await fetch("http://localhost:8000/user/logout");
        let js = await lO.json();
        console.log(js);

        // Update the state after logout
        setIsLoggedIn(false);
        navi("/login");  // Redirect to the login page or any other route
    }

    return (
        <div className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/adddata" className="nav-link">Add Data</NavLink>
                </li>
                {!isLoggedIn ? (
                    <>
                        <li>
                            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                    </>
                ) : (
                    <li>
                        <NavLink to="/#" className="nav-link" onClick={logout}>Logout</NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
}

