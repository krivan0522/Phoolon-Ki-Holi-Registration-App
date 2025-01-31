'use client';

import { useAuth } from '@/providers/AuthContext';
import { useRegistration } from '@/providers/RegistrationContext';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as z from 'zod';

// Define Zod schema for validation
const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  address: z.string().min(10, 'Address must be at least 10 characters long'),
  idolDescription: z.string().min(5, 'Description must be at least 5 characters long'),
  idolSize: z.string().nonempty('Ladoo Gopal size is required'),
});

const REGISTRATION_START_DATE = new Date('2025-02-02T08:00:00'); // Change to your desired start date


function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    idolDescription: '',
    idolSize: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [registrationControl, setRegistrationControl] = useState<{
    currentRegistrations: number;
    maxRegistrations: number;
  } | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const { isRegistered, token, checkRegistration } = useRegistration();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      checkRegistration();
    }

    const fetchRegistrationControl = async () => {
      try {
        const response = await axios.get('/api/registration-control');
        setRegistrationControl(response.data);
      } catch (error) {
        console.error('Error fetching registration control:', error);
      }
      finally {
        setIsFetching(false);
      }
    };

    fetchRegistrationControl();
  }, [isLoggedIn, checkRegistration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Clear the field-specific error when the user starts typing
    if (errors[name as keyof typeof formData]) {
      setErrors((prevState) => ({ ...prevState, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const validationResult = registrationSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: Partial<Record<keyof typeof formData, string>> = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path[0] in formData) {
          newErrors[error.path[0] as keyof typeof formData] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in first.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const tkn = localStorage.getItem('authToken');
      const response = await axios.post('/api/register', formData, {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      });

      if (response.status === 200) {
        await checkRegistration();
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
      setLoading(false);
    }
  };

  if (isFetching) {
    // Show loading state until registration data is fetched
    return (
      <div className="text-center">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-lg text-indigo-600 font-medium">Loading registration details...</p>
      </div>

    );
  }


  const isRegistrationOpen =
    registrationControl &&
    registrationControl.currentRegistrations < registrationControl.maxRegistrations;

  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        Ladoo Gopal Registration
      </h1>
      {!isRegistered && !isRegistrationOpen && (
        <div className="text-center text-red-600">
          Registration is currently closed. Please check back later.
        </div>
      )}
      {!isRegistered && isRegistrationOpen && ((registrationControl?.maxRegistrations || 0) - (registrationControl?.currentRegistrations || 0))<=50 && (
        // Display the available registrations towards the right in a box
        <div className="flex justify-start items-center bg-indigo-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold text-black" >
            {(registrationControl?.maxRegistrations || 0) - (registrationControl?.currentRegistrations || 0)} registrations are left only. Hurry up!
          </h2>
        </div>
      )}
      {isRegistrationOpen && !isRegistered ? (<div>
        {/* Registration Instructions in English*/}
        <h2 className={`text-lg text-black`}>How to register your idol?</h2>
        <ol className='list-decimal  ml-4 mb-4'>
          <li className="text-sm text-black">Create your account <Link href={'/signup'} className='underline text-blue-900'>here</Link>.</li>
          <li className="text-sm text-black">Log in to your account <Link href={'/login'} className='underline text-blue-900'>here</Link>.</li>
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
      </div>) : ("")}
      {!isLoggedIn && (
        <p className="text-center text-red-500 mb-4">
          Please <Link href={'/login'} className="text-blue-500 hover:text-red-950 underline">log in</Link> to view your token/register your idol.
        </p>
      )}
      {isLoggedIn && isRegistered ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            You are registered!
          </h2>
          <p className="text-lg mt-2">
            Your registration token is:
            <span className="font-bold text-indigo-700"> {token}</span>
          </p>
          <p className="text-base text-gray-600 mt-2">
            Please note this: Ladoo Gopal will be submitted only on 23rd February,2025 from 9:00 am till 11:30 am.
          </p>
            <p className="text-base text-gray-600 mt-2">
            जरूरी सूचना: लड्डू गोपाल केवल 23 फरवरी, 2025 को सुबह 9:00 बजे से 11:30 बजे तक ही जमा किए जाएंगे।
            </p>
        </div>
      ) : (
        isRegistrationOpen && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
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
                  className={`p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-400'
                    }`}
                  disabled={!isLoggedIn || loading}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                  className={`p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.idolSize ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-400'
                    }`}
                  disabled={!isLoggedIn || loading}
                  onChange={e =>
                    setFormData((prevState) => ({ ...prevState, idolSize: e.target.value }))
                  }
                >
                  <option value="">Select Size</option>
                  {Array.from({ length: 15 }, (_, i) => (
                    <option key={i} value={`${i + 1}`}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                {errors.idolSize && <p className="text-red-500 text-sm mt-1">{errors.idolSize}</p>}
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
                className={`p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-400'
                  }`}
                disabled={!isLoggedIn || loading}
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
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
                className={`p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.idolDescription ? 'border-red-500 focus:ring-red-400' : 'focus:ring-indigo-400'
                  }`}
                disabled={!isLoggedIn || loading}
              ></textarea>
              {errors.idolDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.idolDescription}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-3 text-white rounded-lg transition disabled:bg-indigo-400 disabled:cursor-not-allowed ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )
      )}
    </div>
  );
}


export default function Registration() {

  const currentDate=new Date();
  const isOpenReg= currentDate >= REGISTRATION_START_DATE; 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-6">
      {isOpenReg ? ( 
        <RegistrationForm />
      ) : (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-8">
            Registration will open on {REGISTRATION_START_DATE.getDate()}/{REGISTRATION_START_DATE.getMonth() + 1}/{REGISTRATION_START_DATE.getFullYear()}
          </h1>
          <p className="text-lg text-gray-700">
            Please check back on the specified date to register your Ladoo Gopal.
          </p>
        </div>
      )}
    </div>
  )
}