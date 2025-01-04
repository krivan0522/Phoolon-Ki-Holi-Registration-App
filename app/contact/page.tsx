const Contact = () => {
    const managementTeam = [
      { name: 'Rajesh Sharma', role: 'Event Organizer', contact: '9876543210' },
      { name: 'Meena Gupta', role: 'Coordinator', contact: '9123456789' },
    ];
  
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <ul className="space-y-4">
          {managementTeam.map((member, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-gray-600">{member.role}</p>
              </div>
              <p className="text-blue-600 font-medium">{member.contact}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Contact;
  