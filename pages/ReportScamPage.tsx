
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { ScamCompanyDetails } from '../types';

const ReportScamPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState<ScamCompanyDetails>({
    name: '', address: '', website: '', socialMedia: '', contactNumbers: ''
  });
  const [scamDescription, setScamDescription] = useState('');
  const [proofImages, setProofImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleCompanyDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProofImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to submit a report.");
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.submitScamReport({
        companyDetails,
        scamDescription,
        proofImages,
        submittedById: user.id
      });
      setSuccess('Your report has been submitted for review. Thank you for your contribution!');
      // Reset form after a delay
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('Failed to submit report. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Report a Scam</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2">Scam Company Details</legend>
            <div className="space-y-4 mt-2">
              <Input label="Company Name" name="name" type="text" value={companyDetails.name} onChange={handleCompanyDetailsChange} required />
              <Input label="Address" name="address" type="text" value={companyDetails.address} onChange={handleCompanyDetailsChange} />
              <Input label="Website" name="website" type="url" value={companyDetails.website} onChange={handleCompanyDetailsChange} />
              <Input label="Social Media (URL)" name="socialMedia" type="text" value={companyDetails.socialMedia} onChange={handleCompanyDetailsChange} />
              <Input label="Contact Numbers" name="contactNumbers" type="text" value={companyDetails.contactNumbers} onChange={handleCompanyDetailsChange} />
            </div>
          </fieldset>
          
          <div>
            <label htmlFor="scamDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description of Scam
            </label>
            <textarea
              id="scamDescription"
              name="scamDescription"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={scamDescription}
              onChange={(e) => setScamDescription(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="proofImages" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Proof (Screenshots, etc.)
            </label>
            <input
              id="proofImages"
              name="proofImages"
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
            />
             {proofImages.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                    {proofImages.length} file(s) selected.
                </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Your name ({user?.fullName}) and email ({user?.email}) will be attached to this report.
          </div>

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading || !!success}>
              {loading ? 'Submitting...' : 'Submit Report for Review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportScamPage;
