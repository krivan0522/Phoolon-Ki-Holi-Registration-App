'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/providers/AuthContext';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must be 10 digits'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
        router.push("/registration");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    const validationResult = signupSchema.safeParse(formData);
    if (!validationResult.success) {
      const validationErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          validationErrors[err.path[0]] = err.message;
        }
      });
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
  
    try {
      // Step 1: Call Signup API
      const signupRes = await axios.post('/api/auth/signup', formData);
      const signupData = signupRes.data;
  
      if (!signupData.success) {
        toast.error(signupData.error || 'Signup failed.');
        return;
      }
  
      // Step 2: Show success toast (User sees only this)
      toast.success('Account created successfully!');
  
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5-second delay
      
      const loginform={
        identifier:formData.mobile,
        password:formData.password
      }
      // Step 3: Attempt Login Silently
      try {
        const loginRes = await axios.post('/api/auth/login', loginform);
  
        const loginData = loginRes.data;
  
        if (loginData.success) {
          localStorage.setItem('authToken', loginData.token);
          setIsLoggedIn(true);
          toast.success('Logged in successfully.');
          router.push('/registration');
        } else {
          throw new Error('Login failed'); // Force redirect to login silently
        }
      } catch {
        router.push('/login'); // Silent redirect if login fails
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-orange-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-pink-600">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && <div className="text-red-600 text-center">{errors.general}</div>}
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
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field - remove required attribute */}
          {/* <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address "
              value={formData.email}
              
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div> */}

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block font-medium text-gray-700">Mobile</label>
            <input
              type="number"
              id="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              required
              maxLength={10}
              minLength={10}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-4 text-gray-500 hover:text-pink-500"
              >
                {showConfirmPassword ? <FaEye/> : <FaEyeSlash/>}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
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
