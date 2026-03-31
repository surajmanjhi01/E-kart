import { Button } from "@/components/ui/button"
import react from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar /><Home /></>
  },
  {
    path:'/signup',
    element:<><Signup /></>
  },
  {
    path:'/login',
    element:<><Login /></>
  },
  {
    path:'*',
    element:<><h1>404 Not Found</h1></>
  }
])

const App = () => {
  return(
    <> 
    <RouterProvider router={router} />
       </>
  )
}
export default App