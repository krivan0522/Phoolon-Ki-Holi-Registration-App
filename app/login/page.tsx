'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Validation schema
const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty('Mobile Number is required.')
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value),
      { message: 'Must be a valid email or 10-digit mobile number.' }
    ),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', data);
      const result = response.data;

      if (result.success) {
        localStorage.setItem('authToken', result.token); // Save token
        setIsLoggedIn(true);
        router.push('/registration'); // Redirect to registration
      } else {
        setError(result.error || 'Invalid credentials.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Incorrect password.');
        } else if (error.response.status === 400) {
          setError('User not found. Please sign up to create an account.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-orange-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-pink-600">Log In</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-left font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter Mobile Number"
              {...register('identifier')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-left font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Password"
                {...register('password')}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-4 text-gray-500 hover:text-pink-500"
              >
                {showPassword ? <FaEye/> : <FaEyeSlash/>}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-bold transition-all ${isSubmitting || loading ? 'bg-gray-400' : 'bg-pink-500 hover:bg-pink-600'
              }`}
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-pink-500 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
