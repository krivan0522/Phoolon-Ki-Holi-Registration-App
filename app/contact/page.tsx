import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const teamMembers = [
    {
      name: "Kishan Agarwal",
      role: "Event Coordinator",
      phone: "9331844389",
    },
    {
      name: "Krish Agarwal",
      role: "Donations Manager",
      phone: "9988776655",
    },
    {
      name: "Chirag Garg",
      role: "Logistics Head",
      phone: "9123456789",
    },
  ];

  const eventLocation = "28.6139,77.2090";  // Example coordinates (Delhi)

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      {/* Team Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          >
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            <p className="text-gray-500">{member.role}</p>
            <p className="mt-2">📞 +91 {member.phone}</p>
            <Link
              href={`https://api.whatsapp.com/send/?phone=${member.phone}&amp;text&amp;type=phone_number&amp;app  target="_blank"
              rel="noopener noreferrer"_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-green-500 text-white  rounded-full"
            >
              <Image
                alt="WhatsApp Logo"
                src="/wa.svg"
                width={24}
                height={24}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Event Location</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.google.com/maps?q=${eventLocation}&output=embed`}
            title="Event Location"
          ></iframe>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full px-6 py-6 text-black rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Technical Support
        </h2>
        <div className="max-w-screen-md mx-auto">
          <p className="text-center mb-4">
            Facing technical difficulties? Contact us directly, and we’ll assist
            you as soon as possible.
          </p>
          <div className="text-center space-y-4">
            <div>
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:agarwalkrish29@gmail.com"
                className="underline hover:text-blue-800"
              >
                agarwalkrish29@gmail.com
              </Link>
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              <Link
                href="tel:+916289816597"
                className="underline hover:text-blue-800"
              >
                +91 6289816597
              </Link>
            </div>
            <div>
              <strong>WhatsApp:</strong>{" "}
              <Link
                href="https://wa.me/6289816597"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-800"
              >
                Message Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
