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
    
    try {
      console.log('formDataToSend', formData)
      const response = await axios.post('/api/donate', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('response', response)
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
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Donate to Phoolon ki Holi</h1>
      <div className="mb-6">
        <h2 className="text-xl text-center font-semibold mb-2">Scan QR Code to Donate</h2>
        <Image
          src="/qrcode.svg"
          alt="UPI QR Code"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">Name</label>
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
          <label htmlFor="amount" className="block font-medium">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block font-medium">Contact</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="screenshot" className="block font-medium">Payment Screenshot</label>
          <input
            type="file"
            id="screenshot"
            name="screenshot"
            onChange={handleChange}
            required
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600">
          Submit Donation
        </button>
      </form>
    </div>
  )
}

