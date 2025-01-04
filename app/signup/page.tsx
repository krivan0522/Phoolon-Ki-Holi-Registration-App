'use client';

import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdMatch, setPwdMatch] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            setPwdMatch(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();
            if (result.success) {
                alert('Signup successful!');
                setFormData({ name: '', email: '', mobile: '', password: '' });
                setConfirmPassword('');
                setPwdMatch(true);
            } else {
                alert(result.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-orange-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-pink-600">Sign Up</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Mobile Field */}
                    <div>
                        <label htmlFor="mobile" className="block font-medium text-gray-700">Mobile</label>
                        <input
                            type="text"
                            id="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                        {!pwdMatch && (
                            <p className="text-red-500 mt-1">Passwords do not match</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg text-white font-bold transition-all ${
                            loading ? 'bg-gray-400' : 'bg-pink-500 hover:bg-pink-600'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>

                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-pink-500 font-medium hover:underline">
                            Log In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
