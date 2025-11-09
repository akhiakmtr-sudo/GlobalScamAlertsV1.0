
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Global Scam Alerts</h1>
      <div className="prose max-w-none text-gray-700">
        <p>
          Welcome to Global Scam Alerts, a community-driven platform dedicated to fighting fraud and protecting consumers worldwide. Our mission is to create a transparent and accessible database of scam operations, empowering individuals to make informed decisions and avoid financial loss.
        </p>
        <p>
          In an increasingly digital world, scams are becoming more sophisticated and prevalent. From deceptive online stores to fraudulent investment schemes, countless individuals fall victim to these malicious activities every day. We believe that by sharing information and experiences, we can build a stronger, more resilient community that is better equipped to identify and avoid these threats.
        </p>
        <h2 className="text-2xl font-semibold mt-6">How It Works</h2>
        <p>
          Our platform relies on the vigilance of our users. Anyone who has been a victim of a scam or has identified a fraudulent company can submit a report. Each report includes crucial details such as the company's name, website, social media presence, and a description of the scam. Users can also upload evidence, like screenshots of payments or conversations, to substantiate their claims.
        </p>
        <p>
          Every submitted report undergoes a review process by our dedicated team of administrators. This ensures that the information published on our site is accurate and credible. Once approved, the report is made public, contributing to our ever-growing database of known scams.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Our Commitment</h2>
        <p>
          We are committed to maintaining a fair and just platform. We understand that mistakes can happen, and sometimes legitimate businesses may be reported in error. That's why we provide a clear process for companies to challenge a report. By contacting our admin team, they can provide evidence to dispute a claim, which will be thoroughly investigated.
        </p>
        <p>
          Thank you for being a part of our community. Together, we can make the digital world a safer place for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
