
import React, { useState } from 'react';
import { ScamReport } from '../types';
import Button from './Button';
import Modal from './Modal';

interface ScamReportCardProps {
  report: ScamReport;
}

const ScamReportCard: React.FC<ScamReportCardProps> = ({ report }) => {
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { companyDetails, scamDescription, submittedBy, createdAt } = report;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
        <div className="p-5 flex-grow">
          <div className="flex items-center mb-3">
            <h3 className="text-xl font-bold text-gray-900 mr-2">{companyDetails.name}</h3>
            <span className="bg-danger text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">SCAMMER</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scamDescription}</p>
        </div>
        <div className="px-5 pb-5">
            <div className="flex space-x-2 mb-4">
                <Button variant="outline" className="flex-1 text-sm" onClick={() => setIsProofModalOpen(true)}>Proof</Button>
                <Button variant="outline" className="flex-1 text-sm" onClick={() => setIsDetailsModalOpen(true)}>Company Details</Button>
            </div>
            <div className="text-xs text-gray-500">
                <p>Reported by: {submittedBy.fullName}</p>
                <p>Published: {new Date(createdAt).toLocaleString()}</p>
            </div>
            <a href="https://wa.me/1234567890?text=I%20want%20to%20challenge%20the%20report%20about%20[Company%20Name]" 
               target="_blank" rel="noopener noreferrer"
               className="mt-4 block w-full text-center bg-yellow-400 text-yellow-900 hover:bg-yellow-500 text-sm font-semibold py-2 px-4 rounded-md transition-colors">
                Challenge this Report
            </a>
        </div>
      </div>

      <Modal isOpen={isProofModalOpen} onClose={() => setIsProofModalOpen(false)} title="Proof of Scam">
        <div className="space-y-4">
          <p className="text-gray-700">The following images were submitted as proof:</p>
          {report.proofImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.proofImages.map((img, index) => (
                <img key={index} src={img} alt={`Proof ${index + 1}`} className="rounded-lg object-contain border" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images were provided.</p>
          )}
        </div>
      </Modal>

      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Scam Company Details">
        <div className="space-y-3 text-gray-700">
            <p><strong>Company Name:</strong> {companyDetails.name}</p>
            <p><strong>Address:</strong> {companyDetails.address}</p>
            <p><strong>Website:</strong> <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{companyDetails.website}</a></p>
            <p><strong>Social Media:</strong> {companyDetails.socialMedia}</p>
            <p><strong>Contact Numbers:</strong> {companyDetails.contactNumbers}</p>
        </div>
      </Modal>
    </>
  );
};

export default ScamReportCard;
