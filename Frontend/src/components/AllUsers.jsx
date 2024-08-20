import React, { useEffect, useState } from 'react';

const SingleUser = ({ user, onDelete, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleUpdateToggle = () => {
        setIsUpdating(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/form/updateUser", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("User Updated Sucessfully")
            setIsUpdating(false)
            onUpdate()
        } catch (error) {
            console.log("ERROR : ", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/form/deleteData', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onDelete();
            alert("User Deleted Sucessfully")
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className='relative flex gap-4 items-center shadow-xl w-full justify-around py-5 rounded-lg'>
            <div>
                <div className='h-28 w-28 bg-black rounded-full' />
            </div>
            <div className='flex flex-col gap-3 text-lg'>
                <div>Name : {`${user.firstName} ${user.lastName}`}</div>
                <div>Age : {user.age}</div>
                <div>Email : {user.email}</div>
            </div>
            <div
                className='cursor-pointer'
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-collapse"><path d="m3 10 2.5-2.5L3 5" /><path d="m3 19 2.5-2.5L3 14" /><path d="M10 6h11" /><path d="M10 12h11" /><path d="M10 18h11" /></svg>
            </div>
            <div className={`flex flex-col gap-3 absolute -right-20 bg-white border-[1px] border-[#333] p-3 rounded-xl select-none duration-300 ${open ? 'scale-100' : 'scale-0'}`}>
                {['Update User', 'Delete User'].map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={idx === 0 ? handleUpdateToggle : handleDelete}
                        className='bg-black text-white p-2 rounded-xl hover:bg-white hover:text-black border-2 border-black duration-200'
                    >
                        {btn}
                    </button>
                ))}
            </div>
            {isUpdating && (
                <div className='absolute z-20 top-0 left-0 w-full h-full bg-white flex items-center justify-center'>
                    <form onSubmit={handleUpdate} method='PUT' className='bg-gray-100 relative p-6 rounded-lg shadow-lg'>
                        <div className='absolute right-5 top-5 cursor-pointer' onClick={() => setIsUpdating(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                        </div>
                        <h2 className='text-xl font-bold mb-4'>Update User</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>First Name</label>
                            <input
                                type='text'
                                name='firstName'
                                value={updatedUser.firstName}
                                onChange={handleChange}
                                className='mt-1 p-2 border rounded w-full'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Last Name</label>
                            <input
                                type='text'
                                name='lastName'
                                value={updatedUser.lastName}
                                onChange={handleChange}
                                className='mt-1 p-2 border rounded w-full'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Age</label>
                            <input
                                type='number'
                                name='age'
                                value={updatedUser.age}
                                onChange={handleChange}
                                className='mt-1 p-2 border rounded w-full'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={updatedUser.email}
                                onChange={handleChange}
                                className='mt-1 p-2 border rounded w-full'
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='bg-black text-white p-2 rounded-xl hover:bg-white hover:text-black border-2 border-black duration-200'
                            >Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const fetchData = async () => {
        const users = await fetch('/form/api/users');
        const usersJson = await users.json();
        setAllUsers(usersJson);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (allUsers.length > 0) {
        return (
            <div className='flex flex-col items-center my-10 gap-10 max-w-[70vw] mx-auto'>
                {allUsers.map(user => (
                    <SingleUser
                        key={user.id}
                        user={user}
                        onDelete={fetchData}
                        onUpdate={fetchData}
                    />
                ))}
            </div>
        );
    } else if (allUsers.length === 0) {
        return <h1 className='text-2xl text-center my-20'>No User Registered</h1>;
    } else {
        return <div className='text-2xl text-center my-20'>Loading ...</div>;
    }
};

export default AllUsers;
