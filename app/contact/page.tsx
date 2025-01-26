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
      name: "Sunil Singhi",
      phone: "9830577308",
    },
    {
      name: "Govind Chokhani",
      phone: "9123356428",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300 p-10">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Contact Us</h1>

      {/* Team Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        <h2 className="text-3xl text-violet-900 font-bold text-center col-span-3">
          Our Team
        </h2>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg col-span-3 lg:col-span-1 shadow-lg p-6 flex flex-col items-center text-center w-full"
          >
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            {/* <p className="text-gray-500">{member.role}</p> */}
            <Link href={`tel:+91${member.phone}`} className="mt-2">📞 +91 {member.phone}</Link>
            <Link
              href={`https://api.whatsapp.com/send/?phone=${member.phone}&amp;text&amp;type=phone_number&amp;app`}
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
      <div className="w-full px-6 pt-6 pb-1 text-black bg-white rounded-lg shadow-lg mt-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-violet-900 font-bold mb-6">Event Location</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.24566892733623!2d88.32999709551552!3d22.581712054152298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02778c26d57645%3A0x38ef25409b847cd9!2sChintamani%20Math%20Maidan!5e0!3m2!1sen!2sin!4v1735990173227!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            name="Event Location"
            title="Event Location"
            aria-labelledby="Event Location"
            role="application"
            aria-label="Event Location">
          </iframe>
        </div>
      </div>
      </div>

      {/* Call to Action */}
      <div className="w-full px-6 py-6 text-black bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl text-violet-900 font-bold text-center mb-4">
          Technical Support
        </h2>
        <div className="max-w-screen-md mx-auto">
          <p className="text-center mb-4">
            Facing technical difficulties? Contact us directly, and we’ll assist
            you as soon as possible.
          </p>
          <div className="text-center space-y-4">
            <div>
              <strong>Name:</strong>{" "}
              <Link
                href="https://www.linkedin.com/in/krish-agarwal-0a09ab23a/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800"
              >
                Krish Agarwal
              </Link>
            </div>
            <div>
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:agarwalkrish29@gmail.com"
                className="hover:text-blue-800"
              >
                agarwalkrish29@gmail.com
              </Link>
            </div>
            {/* <div>
              <strong>Phone:</strong>{" "}
              <Link
                href="tel:+916289816597"
                className="hover:text-blue-800"
              >
                +91 6289816597
              </Link>
            </div> */}
            <div>
              <strong>WhatsApp:</strong>{" "}
              <Link
                href="https://api.whatsapp.com/send/?phone=916289816597&amp;text&amp;type=phone_number&amp;app"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-blue-800"
              >
                <Image
                alt="WhatsApp Logo"
                src="/wa.svg"
                width={24}
                height={24}
                className="inline-block mx-2"
                />
                Message us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
