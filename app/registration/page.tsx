'use client';

import { useAuth } from '@/providers/AuthContext';
import { useRegistration } from '@/providers/RegistrationContext';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    idolDescription: '',
    idolSize: '',
  });
  
  const [loading, setLoading] = useState(false);
  const { isRegistered, token, checkRegistration } = useRegistration();
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn) {
      checkRegistration();
    }
  }, [isLoggedIn, checkRegistration]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormComplete = Object.values(formData).every((field) => field.trim() !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in first.');
      return;
    }

    setLoading(true); // Start loading state

    try {
      const tkn = localStorage.getItem('authToken');
      const response = await axios.post('/api/register', formData, {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      });

      if (response.status === 200) {
        await checkRegistration(); // Update the registration status in the context
        setFormData({
          name: '',
          address: '',
          idolDescription: '',
          idolSize: '',
        });
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          Ladoo Gopal Registration
        </h1>
        {!isRegistered ?( <div>
          {/* Registration Instructions in English*/}
          <h2 className={`text-lg text-black`}>How to register your idol?</h2>
          <ol className='list-decimal  ml-4 mb-4'>
            <li className="text-sm text-black">Create your account <Link href={'/signup'} className='underline text-blue-900'>here.</Link> </li>
            <li className="text-sm text-black">Log in to your account <Link href={'/login'} className='underline text-blue-900'>here.</Link>.</li>
            <li className="text-sm text-black">Fill in the registration form below and submit.</li>
            <li className="text-sm text-black">You will receive a registration token after successful registration.</li>
          </ol>
          <h2 className={`text-lg text-black`}>कैसे पंजीकरण करें?</h2>
          <ol className='list-decimal  ml-4 mb-4'>
            <li className="text-sm text-black">यहाँ पर अपना खाता <Link href={'/signup'} className='underline text-blue-900'>बनाएं।</Link> </li>
            <li className="text-sm text-black">अपने खाते में लॉग इन <Link href={'/login'} className='underline text-blue-900'>करें।</Link> </li>
            <li className="text-sm text-black">नीचे दिए गए पंजीकरण फॉर्म में जानकारी भरें और सबमिट करें।</li>
            <li className="text-sm text-black">सफल पंजीकरण के बाद आपको एक पंजीकरण टोकन प्राप्त होगा।</li>
          </ol>
        </div>):("")}
        {!isLoggedIn && (
          <p className="text-center text-red-500 mb-4">
            Please <Link href={'/login'} className='text-blue-500 hover:text-red-950 underline'>log in</Link> to register your idol.
          </p>
        )}
        {isLoggedIn && isRegistered ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              You are already registered!
            </h2>
            <p className="text-lg mt-2">
              Your registration token is: 
              <span className="font-bold text-indigo-700"> {token}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed"
                  disabled={!isLoggedIn || loading}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="idolSize" className="font-medium mb-1">
                  Ladoo Gopal Size
                </label>
                <select
                  id="idolSize"
                  name="idolSize"
                  value={formData.idolSize}
                  required
                  className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed"
                  disabled={!isLoggedIn || loading}
                >
                  <option value="">Select Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="font-medium mb-1">
                Your Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={4}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed"
                disabled={!isLoggedIn || loading}
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="idolDescription" className="font-medium mb-1">
                Ladoo Gopal Description
              </label>
              <textarea
                id="idolDescription"
                name="idolDescription"
                value={formData.idolDescription}
                onChange={handleChange}
                required
                rows={3}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed"
                disabled={!isLoggedIn || loading}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full p-3 text-white rounded-lg transition disabled:bg-indigo-400 disabled:cursor-not-allowed ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              disabled={!isFormComplete || loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
