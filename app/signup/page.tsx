'use client';

import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
    const [pwdmatch, setPwdMatch] = useState(true);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== (document.getElementById('confirmPassword') as HTMLInputElement).value) {
            setPwdMatch(false);
            return;
        }
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (result.success) {
            alert('Signup successful!');
        } else {
            alert(result.error || 'Something went wrong.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        id='name'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="mobile" className="block font-medium">Mobile</label>
                    <input
                        type="text"
                        placeholder="Mobile"
                        id='mobile'
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id='password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        id='confirmPassword'
                        required
                        className="w-full p-2 border rounded"
                    />
                    {!pwdmatch && <p className="text-red-500">Passwords do not match</p>}
                </div>
                <button type="submit" className="w-full p-2 text-white rounded bg-blue-500">Sign Up</button>
                <p className="text-center">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
            </form>
        </div>
    );
}
