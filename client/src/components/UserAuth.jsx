import React, { useState } from 'react';
import axios from 'axios';

const UserAuth = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Send a POST request to the signup endpoint
            const response = await axios.post('http://localhost:3000/signup', {
                email: formData.email,
                password: formData.password,
            });
            // Handle the response as needed, e.g., storing the token, displaying a success message
            setMessage('Signup successful');
        } catch (error) {
            // Handle errors, display the error message
            setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="row mt-3">
                <h1 className="col-6 offset-3">Signup on BlogBliss</h1>
                <div className="col-8 offset-3 mt-3">
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                required
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Signup</button>
                    </form>
                    {message && <div className="mt-3 alert alert-info">{message}</div>}
                </div>
            </div>
        </>
    );
};

export default UserAuth;
