import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginpic from '../assests/online.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const registerSubmit = async (data) => {
        if (data.password === data.cpassword) {
            const userData = {
                user: data.user,
                email: data.email,
                password: data.password
            }
            // console.log(userData);
            await axios.post('auth/register', userData)
                .then(log => {
                    if (log.data.success) {
                        toast.success(log.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.error(log.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                })
                .catch(error => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })

        } else {
            toast.error("Passwords doesn't match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <div className='row bgcolor p-4'>
            <h2 className='text-white text-center pb-1'>Ay! Captain Register here</h2>
            <div className='col-md-5 mx-auto mt-3 py-5 px-5'>
                <div className='card p-3 bg-white'>
                    <h2 className='pt-2 px-4'>Register</h2>
                    <form className='mt-5 mx-4' onSubmit={handleSubmit(registerSubmit)}>
                        <div className="form-group">
                            <h5>Name</h5>
                            <input type="text" className='form-control' placeholder='Enter name' required autoFocus {...register("user", { required: true, minLength: 6 })} />
                            {errors.user && <p className='text-danger mt-1'>Name should be of atleast 6 characters</p>}
                        </div>
                        <div className="form-group mt-4">
                            <h5>Email address</h5>
                            <input type="email" className='form-control' placeholder='Enter email' required {...register("email",
                                {
                                    required: true,
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                                })} />

                            {errors.email && <p className='text-danger mt-1'>Please check and enter correct email</p>}
                        </div>
                        <div className="form-group mt-4">
                            <h5>Password</h5>
                            <input type="password" className='form-control' placeholder='Enter password' required {...register("password", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                            })} />

                            {errors.password && <div>
                                <p className='text-danger'>Password should be of length 6-15</p>
                                <p className='text-danger'>Should contain atleast one uppercase, lowercase, number and special character</p>
                            </div>
                            }
                        </div>
                        <div className="form-group mt-4">
                            <h5>Confirm password</h5>
                            <input type="password" className='form-control' placeholder='Enter confirm password' required {...register("cpassword", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                            })} />

                            {errors.password && <div>
                                <p className='text-danger'>Password should be of length 6-15</p>
                                <p className='text-danger'>Should contain atleast one uppercase, lowercase, number and special character</p>
                            </div>
                            }
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='submit-btn mt-5'>Submit</button>
                        </div>
                    </form>
                    <Link className='text-primary text-center my-3' to='/'>Already registered? Click here to login</Link>
                </div>

            </div>
            <div className='col-md-6'>
                <img className='img-fluid' src={loginpic} alt="" />
            </div>
            <ToastContainer />

        </div>
    )
}

export default Register