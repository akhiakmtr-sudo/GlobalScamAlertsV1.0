
import React from 'react';

const VisionPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Vision & Mission</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To create a global environment where consumers are empowered and protected from all forms of financial fraud and scams. We envision a world built on trust and transparency, where malicious actors are quickly identified and neutralized through the power of a vigilant and interconnected community.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to operate the most comprehensive, user-friendly, and reliable platform for reporting, tracking, and publicizing scam activities worldwide. We are dedicated to:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>
              <strong>Empowering Users:</strong> Providing a safe and anonymous platform for victims and whistleblowers to share their experiences and evidence without fear of reprisal.
            </li>
            <li>
              <strong>Ensuring Accuracy:</strong> Implementing a rigorous verification process for all submitted reports to maintain the integrity and credibility of our data.
            </li>
            <li>
              <strong>Promoting Awareness:</strong> Making our database of scams freely and easily accessible to the public, media, and law enforcement agencies to prevent future victimization.
            </li>
            <li>
              <strong>Upholding Fairness:</strong> Offering a clear and straightforward process for any entity to challenge a report against them, ensuring that our platform remains just and balanced.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;
