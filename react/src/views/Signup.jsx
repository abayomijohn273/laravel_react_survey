import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link } from "react-router-dom"
import axiosClient from '../axios'
import { useStateContext } from '../contexts/ContextProvider'

const Signup = () => {
    const {setCurrentUser, setUserToken} =  useStateContext();

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const [errors, setErrors] = useState({ __html: "" });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors({ __html: "" });

        const payload = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation
        }

        console.log(payload)

        axiosClient.post("/signup", payload).then(({ data }) => {
            console.log(data)
            setCurrentUser(data.user);
            setUserToken(data.token);
        }).catch((error) => {
            if (error?.response) {
                const finalErrors = Object.values(error.response.data?.errors).flat(7);
                console.log(finalErrors);
                setErrors({ __html: finalErrors.join("<br>") })
            }
            console.error(error);
        })

    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up for free
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login with your account
                </Link>
            </p>

            {errors?.__html && (<div
                className="bg-red-600 rounded py-2 px-3 text-white"
                dangerouslySetInnerHTML={errors}
            />)}

            <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="full-name" className="sr-only">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="fullName"
                            value={data.fullName}
                            onChange={handleChange}
                            type="text"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            type="email"
                            required
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="password-confirmation" className="sr-only">
                            Password Confirmation
                        </label>
                        <input
                            id="password-confirmation"
                            name="passwordConfirmation"
                            type="password"
                            value={data.passwordConfirmation}
                            onChange={handleChange}
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password Confirmation"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Sign up
                    </button>
                </div>
            </form>
        </>
    )
}

export default Signup