import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Layout } from "./layout"
import { Home } from "./componets/home"
import { Data } from "./componets/add-data"
import { Signup } from "./componets/signup"
import { Login } from "./componets/login"

function App() {

  let route = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/adddata',
          element:<Data/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/Login',
          element:<Login/>
        },
      ]

    }
  ])

  return (
    <>
    <RouterProvider router={route}/>
    </>
  )
}

export default App
