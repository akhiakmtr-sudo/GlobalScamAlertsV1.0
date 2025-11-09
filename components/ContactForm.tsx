
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server.
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {submitted ? (
        <p className="text-green-600 text-center">Thank you for your message! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Your Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
          <Input label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Query
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
