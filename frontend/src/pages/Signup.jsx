import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.success) {
        toast.success("Signup successful")
        navigate('/verify') // make sure this route exists
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-pink-100'>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up for an account</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>

        <form onSubmit={submitHandler}>
          <CardContent>
            <div className="flex flex-col gap-3">

              <div className="grid grid-cols-2 gap-4">
                <div className='grid gap-2'>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange} />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange} />
                </div>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="yourname@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <div className='relative'>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange} />

                  {showPassword
                    ? <EyeOff onClick={() => setShowPassword(false)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer' />
                    : <Eye onClick={() => setShowPassword(true)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer' />}
                </div>
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>

            <p className='text-gray-700 text-sm'>
              Already have an account{" "}
              <Link to="/login" className="text-pink-800 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>

      </Card>
    </div>
  )
}

export default Signup
