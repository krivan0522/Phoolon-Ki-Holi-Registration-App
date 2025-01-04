'use client';

import { useAuth } from '@/providers/AuthContext';
import { useRegistration } from '@/providers/RegistrationContext';
import axios from 'axios';
import { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    idolDescription: '',
    idolSize: '',
  });
  const { isRegistered, token, checkRegistration } = useRegistration();
  const { isLoggedIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in first.');
      return;
    }

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
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Ladoo Gopal Registration</h1>
      {isRegistered ? (
        <div>
          <h2 className="text-xl font-semibold">You are already registered!</h2>
          <p className="text-gray-600">Your registration token is: {token}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="idolDescription" className="block font-medium">
              Idol Description
            </label>
            <textarea
              id="idolDescription"
              name="idolDescription"
              value={formData.idolDescription}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="idolSize" className="block font-medium">
              Idol Size
            </label>
            <input
              type="text"
              id="idolSize"
              name="idolSize"
              value={formData.idolSize}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full p-2 text-white rounded bg-blue-500">
            Register
          </button>
        </form>
      )}
    </div>
  );
}
