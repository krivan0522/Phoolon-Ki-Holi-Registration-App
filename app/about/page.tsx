import Image from "next/image";

const About = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 to-pink-200">
      <div className="max-w-4xl bg-white shadow-lg rounded-xl p-8 m-4">
          <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6">
              About the Event
          </h1>
          <p className="text-gray-800 leading-7 text-lg text-center">
              🌸 <strong>Phoolon ki Holi</strong> is a cherished festival in our locality, dedicated to <strong>Lord Krishna</strong>.  
              Families bring their beloved idols of <strong>Ladoo Gopal</strong> to celebrate with vibrant flower petals,  
              melodious bhajans, and heartfelt devotion.
          </p>
          <div className="flex justify-center my-6">
              <Image
                  src="/phoolon-holi.jpg"
                  alt="Phoolon ki Holi Celebration"
                  className="rounded-lg shadow-md  hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={300}
              />
          </div>
          <p className="text-gray-800 leading-7 text-lg text-center">
              The event culminates in a <strong>grand petal shower</strong> and <strong>prasad distribution</strong> to all devotees.  
              🌷 Join us to experience the divine, love-filled celebration!
          </p>
      </div>
  </div>
);

export default About;
