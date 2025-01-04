'use client'

import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function Donation() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    contact: '',
    screenshot: null as File | null,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === 'screenshot' && files) {
      setFormData(prevState => ({ ...prevState, [name]: files[0] }))
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('amount', formData.amount)
    formDataToSend.append('contact', formData.contact)
    if (formData.screenshot) {
      formDataToSend.append('screenshot', formData.screenshot)
    }

    try {
      const response = await axios.post('/api/donate', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        alert('Donation submitted successfully.')
        setFormData({
          name: '',
          amount: '',
          contact: '',
          screenshot: null,
        })
      } else {
        alert('Donation failed. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-yellow-300 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
          Donate to Phoolon ki Holi
        </h1>

        <div className="mb-10">
          <h2 className="text-2xl text-center font-semibold mb-4 text-gray-700">
            Scan QR Code to Donate
          </h2>
          <div className="flex justify-center">
            <Image
              src="/qrcode.svg"
              alt="UPI QR Code"
              width={250}
              height={250}
              className="rounded-lg shadow-md"
            />
          </div>
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
                required
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                disabled={loading}
              />
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
                required
                className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                disabled={loading}
              />
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
              required
              className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
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
              required
              className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 text-white rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Donation'}
          </button>
        </form>
      </div>
    </div>
  )
}
