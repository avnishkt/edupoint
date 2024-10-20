import React, { useState } from 'react';
import axios from 'axios'; 

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form inputs in a generic way
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Submit form data to backend API
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            console.log(formData)
            const response = await axios.post('http://localhost:5000/api/auth/register', formData); 
            
            if (response.data.success) {
                setSuccessMessage('User registered successfully!');
                setFormData({
                    name: '',
                    password: '',
                    email: ''
                }); 
            } else {
                setErrorMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error registering user.');
        }
    };

    return (
        <div>
            <div className="container register">
                <section className="section course" id="courses" aria-label="course">
                    <div className='form'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='label' htmlFor="name">First Name:</label><br />
                                <input
                                    className='input'
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className='label' htmlFor="password">Password:</label><br />
                                <input
                                    className='input'
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className='label' htmlFor="email">Email:</label><br />
                                <input
                                    className='input'
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn has-before">
                                SUBMIT
                            </button>
                        </form>

                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                </section>
            </div>
        </div>
    );
}
