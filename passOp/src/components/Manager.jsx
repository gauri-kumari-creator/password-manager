import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
     let ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {

        let req = await fetch("https://password-manager-backend-xh98.onrender.com/")
        let passwords = await req.json()
        let passwordArray;
        console.log(passwords)
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        if(ref.current.src.includes("/eyecross.svg")){
            ref.current.src ="/eye.svg"
             passwordRef.current.type = "password"
        }
        else{
            passwordRef.current.type = "text"
            ref.current.src ="/eyecross.svg"
        }
    }

    const savePassword =async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
             
            //if any such id exist in the database deleted
            await fetch("https://password-manager-backend-xh98.onrender.com/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:form.id})})
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("https://password-manager-backend-xh98.onrender.com/",{method:"POST",headers:{"Content-Type": "application/json"},
            body:JSON.stringify({...form, id: uuidv4()})})
            setform({ site: "", username: "", password: "" })
           // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            toast('Password saved!', {
                postition: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
        else {

            toast('Error Password not saved!')

        }

    }

    const editPassword = (id) => {
        console.log("Editing password with id", { id })
        setform({...passwordArray.filter(item => item.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const deletePassword =async (id) => {
        let c = confirm("Do you want to delete this password")
        if (c) {

            console.log("Deleting password with id", id)
            setpasswordArray(passwordArray.filter(item => item.id !== id))
             let res =await fetch("https://password-manager-backend-xh98.onrender.com/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})})
           // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('Password Deleted', {
                postition: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            postition: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
        navigator.clipboard.writeText(text)
    }





    return (
        <>
            <ToastContainer
                postition="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition="Bounce"
            />

            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className=" md-minh-[85vh] container md:mycontainer md:w-[80%]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full w-full border border-green-500 text-black px-4 py-1' type="text" name='site' id='site' placeholder='Enter Website URL' />

                    <div className="flex flex-col justify-between md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 text-black px-4 py-1 w-full' type="username" placeholder='Enter Username' name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 text-black px-4 py-1 w-full' type="password" placeholder='Enter Password' name='password' id='password' />
                            <span onClick={showPassword} className='absolute right-0 my-1 text-[14px] cursor-pointer'>
                                <img ref={ref} src="/eye.svg" alt="" className='w-4 mr-2 mt-1' />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='bg-green-400 px-4 py-2 rounded-full w-fit hover:bg-green-300 border-2 border-green-900'>Save Password</button>
                </div>
                <div className="passwords text-white">
                    <h2 className='font-bold text-2xl py-4 text-black'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-black'> No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-green-800'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center text-black py-2 border border-white '>
                                        <div className='copyicon flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site} </a>
                                            <div>
                                                <img src="/copy.svg" alt="" className='w-4 cursor-pointer' onClick={() => copyText(item.site)} />
                                            </div>
                                        </div>
                                    </td>

                                    <td className='text-center text-black py-2 border border-white'>
                                        <div className='copyicon flex items-center justify-center'>
                                            {item.username}
                                            <div>
                                                <img src="/copy.svg" alt="" className='w-4 cursor-pointer' onClick={() => copyText(item.username)} />
                                            </div>
                                        </div>
                                    </td>

                                    <td className='text-center text-black py-2 border border-white w-32'>
                                        <div className='copyicon flex items-center justify-center'>
                                           {"*".repeat(item.password.length)}
                                            <div>
                                                <img src="/copy.svg" alt="" className='w-4 cursor-pointer' onClick={() => copyText(item.password)} />
                                            </div>
                                        </div>
                                    </td>

                                    <td className='text-center text-black py-2 border border-white w-32'>
                                        <span className='flex gap-2 items-center justify-center cursor-pointer'>
                                            <img src="/edit.svg" alt="" srcSet="" className='w-4' onClick={() => { editPassword(item.id) }} />
                                            <img src="/delete.svg" alt="" srcSet="" className='w-4' onClick={() => { deletePassword(item.id) }} />
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>

        </>
    )
}

export default Manager
