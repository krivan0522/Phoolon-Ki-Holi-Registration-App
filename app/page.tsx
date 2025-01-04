import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Phoolon ki Holi</h1>
      <Image
        src="/placeholder.svg"
        alt="Phoolon ki Holi"
        width={600}
        height={400}
        className="mx-auto mb-6"
      />
      <p className="mb-6">Join us for our annual Phoolon ki Holi celebration!</p>
      <Link href="/registration" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Register Your Idol
      </Link>
    </div>
  )
}
