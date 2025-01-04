import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-pink-300 p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-10 text-center">
        <h1 className="text-5xl font-extrabold text-pink-600 mb-8 leading-tight">
          Welcome to <span className="text-yellow-500">Phoolon ki Holi</span>
        </h1>

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

        <Link href="/registration">
          <button className="text-lg px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            Register Your Idol
          </button>
        </Link>
      </div>
    </div>
  )
}
