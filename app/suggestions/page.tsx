'use client';

const Suggestions = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-yellow-300 p-6">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl text-center font-extrabold text-pink-600 mb-4">Suggestions</h1>
            {/* i want this google form not overflowing in mobile */}
                <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSc9aARFutlxTtvPWLju9_EieWeJemVBSmR0ikt32fHs13SENg/viewform?embedded=true"
                    width="100%"
                    height="768px"
                >
                </iframe>
            </div>
        </div>
    );
}
export default Suggestions;