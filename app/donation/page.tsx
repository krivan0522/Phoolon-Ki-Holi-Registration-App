'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { z } from 'zod';
import toast from 'react-hot-toast';

const donationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  contact: z.string().regex(/^\d{10}$/, 'Contact number must be 10 digits'),
  screenshot: z.instanceof(File),
});

export default function Donation() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    contact: '',
    screenshot: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'screenshot' && files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validation
    try {
      const validatedData = donationSchema.parse({
        name: formData.name,
        amount: parseFloat(formData.amount || '0'),
        contact: formData.contact,
        screenshot: formData.screenshot,
      });

      // Prepare FormData for submission
      const formDataToSend = new FormData();
      formDataToSend.append('name', validatedData.name);
      formDataToSend.append('amount', String(validatedData.amount));
      formDataToSend.append('contact', validatedData.contact);
      if (validatedData.screenshot) {
        formDataToSend.append('screenshot', validatedData.screenshot);
      }

      // API Call
      const response = await axios.post('/api/donate', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        toast.success('Donation submitted successfully.');
        setFormData({ name: '', amount: '', contact: '', screenshot: null });
      } else {
        toast.error('Donation failed. Please try again.');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation Errors
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            validationErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-yellow-300 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-1">
          Donate to Phoolon ki Holi
        </h1>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Aapki udarta, Krishna ke ashirwad ka madhur svaroop hai!
        </p>
        <div>
          <h2>How to Donate?</h2>
          <ol className="list-decimal list-inside mb-4">
            <li>Scan the QR code below to donate any amount you wish.</li>
            <li>Enter your details in the form below.</li>
            <li>Upload the payment screenshot from the UPI app.</li>
            <li>Click on the Submit Donation button.</li>
          </ol>
          {/* in hindi */}
          <h2>कैसे दान करें?</h2>
          <ol className='list-decimal list-inside mb-4'>
            <li>नीचे दिए गए QR कोड को स्कैन करें और जितनी राशि आप चाहें दान करें।</li>
            <li>नीचे दिए गए फॉर्म में अपना विवरण दर्ज करें।</li>
            <li>यूपीआई ऐप से भुगतान स्क्रीनशॉट अपलोड करें।</li>
            <li>दान सबमिट बटन पर क्लिक करें।</li>
          </ol>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl text-center font-semibold mb-4 text-gray-700">
            Scan QR Code to Donate
          </h2>
          <div className="flex justify-center">
            <Image
              src="/qr.jpg"
              alt="UPI QR Code"
              width={250}
              height={250}
              className="rounded-lg shadow-md"
            />
          </div>
          <h2 className="text-lg text-center font-semibold mt-4 text-gray-700">Or Pay on this UPI ID</h2>
          <p className="text-xl text-center text-pink-600 font-semibold">agarwalkrish29@oksbi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
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
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                disabled={loading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label htmlFor="amount" className="font-medium mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                disabled={loading}
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <label htmlFor="contact" className="font-medium mb-1">
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>

          {/* Screenshot Upload */}
          <div className="flex flex-col">
            <label htmlFor="screenshot" className="font-medium mb-1">
              Upload Payment Screenshot
            </label>
            <input
              type="file"
              id="screenshot"
              name="screenshot"
              accept="image/*"
              onChange={handleChange}
              className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
            {errors.screenshot && (
              <p className="text-red-500 text-sm mt-1">{errors.screenshot}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 text-white rounded-lg transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Donation'}
          </button>
        </form>
      </div>
    </div>
  );
}
