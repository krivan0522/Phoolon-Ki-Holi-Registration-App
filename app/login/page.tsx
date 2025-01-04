'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post('/api/auth/login', formData);
        const result = await response.data;
        if (result.success) {
            localStorage.setItem('authToken', result.token); // Store token in localStorage
            setIsLoggedIn(true);
            router.push('/registration'); // Redirect to registration page
        } else {
            alert(result.error || 'Something went wrong.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full p-2 text-white rounded bg-blue-500">Login</button>
                <p className="text-center">Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
            </form>
        </div>
    );
}
