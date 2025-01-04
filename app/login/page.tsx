'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loading state

        try {
            const response = await axios.post('/api/auth/login', formData);
            const result = response.data;

            if (result.success) {
                localStorage.setItem('authToken', result.token); // Store token
                setIsLoggedIn(true);
                router.push('/registration'); // Redirect to registration
            } else {
                alert(result.error || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-orange-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-pink-600">Log In</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-left font-medium text-gray-700">Email</label>
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

                    <div>
                        <label htmlFor="password" className="block text-left font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg text-white font-bold transition-all ${loading ? 'bg-gray-400' : 'bg-pink-500 hover:bg-pink-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center mt-4 text-gray-600">
                        Don&apos;t have an account?{' '}
                        <a href="/signup" className="text-pink-500 font-medium hover:underline">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
