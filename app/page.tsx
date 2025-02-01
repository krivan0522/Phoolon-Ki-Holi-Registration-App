import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaWhatsapp } from 'react-icons/fa'

function EventDetails() {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Event Details</h2>
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="text-pink-500 mr-3" />
        <span className="text-lg text-gray-700">Venue: Chintamani Maidan, Howrah</span>
      </div>
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="text-pink-500 mr-3" />
        <span className="text-lg text-gray-700">Date: February 23, 2025</span>
      </div>
      <div className="flex items-center">
        <FaClock className="text-pink-500 mr-3" />
        <span className="text-lg text-gray-700">Time: 4:00 PM - 8:00 PM</span>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-pink-300 p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-10 text-center">
        <h1 className="text-5xl font-extrabold text-pink-600 mb-1 leading-tight">
          Welcome to <span className="text-yellow-500">Phoolon ki Holi</span>
        </h1>
        {/* tagline in beautiful text colour*/}
        <p className="text-xl text-gray-700 mb-8 ">
          Bhakti ka rang, Phoolon Ki Holi ke sang!
        </p>
        <EventDetails />

        <div className="flex justify-center mb-8">
          <Image
            src="/hero.jpg"
            alt="Phoolon ki Holi"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>

        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          Join us in celebrating the vibrant and joyful <strong>Phoolon ki Holi</strong>!  
          Experience the colors, flowers, and festivities with your loved ones.  
          Don’t miss the chance to register your Ladoo Gopal for this special event.
        </p>

        {/* Event Details */}

        <div className='md:space-x-4 flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center mt-8'>
          <Link href="/registration">
            <button className="text-lg px-8 py-4 w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Register Your Idol
            </button>
          </Link>
          <Link href="/donation">
            <button className="w-full text-lg px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-800 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Contribute Now
            </button>
          </Link>
        </div>
        <div className='flex w-full justify-center mt-4'>
        <Link href="https://chat.whatsapp.com/CR6XQ3qXIuF9Mz2Hhei0zi" target="_blank">
          <button className=" text-lg px-8 py-4 bg-gradient-to-r from-green-400 to-green-800 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            <FaWhatsapp className='inline text-3xl mr-3'/>Join Group
          </button>
        </Link>
        </div>
      </div>
    </div>
  )
}