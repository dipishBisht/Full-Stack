import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
    });
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetch('/form/api/users')
                const usersJson = await users.json();
                setData(usersJson);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isPresent = data.find((user) => user.email === formData.email);
        if (isPresent) {
            setFormData({
                firstName: '',
                lastName: '',
                age: '',
                email: '',
            })
            console.log(isPresent);
            alert("User with this Email already Exist")
            return
        }
        try {
            const response = await fetch('/form/signUpData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result); +

                navigate('/thankyou');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-8 mt-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registration Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName" className="block text-gray-600">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Last Name"
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-gray-600">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Age"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
