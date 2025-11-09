
import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6">
          We value your feedback and inquiries. Please use the information below or the form to get in touch with our team.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-primary">General Inquiries</h2>
            <p className="text-gray-600">For general questions about our platform, please email us at:</p>
            <a href="mailto:support@globalscamalerts.com" className="text-blue-600 hover:underline">support@globalscamalerts.com</a>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Challenge a Report</h2>
            <p className="text-gray-600">If you represent a company that has been reported and you wish to challenge the claim, please contact our review team directly.</p>
            <p className="mt-2">
              <span className="font-semibold">WhatsApp:</span> 
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">+1 (234) 567-890</a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span> 
              <a href="tel:+1234567890" className="ml-2 text-blue-600 hover:underline">+1 (234) 567-890</a>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Media & Press</h2>
            <p className="text-gray-600">For media inquiries, please contact our press team at:</p>
            <a href="mailto:press@globalscamalerts.com" className="text-blue-600 hover:underline">press@globalscamalerts.com</a>
          </div>
        </div>
      </div>
       <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Send us a Message</h2>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
