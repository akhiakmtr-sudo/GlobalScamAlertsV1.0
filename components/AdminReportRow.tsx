
import React, { useState } from 'react';
import { ScamReport, ReportStatus } from '../types';
import Button from './Button';
import Modal from './Modal';
import { api } from '../services/api';

interface AdminReportRowProps {
  report: ScamReport;
  onUpdate: (updatedReport: ScamReport) => void;
  onDelete: (deletedReportId: string) => void;
}

const statusColors: Record<ReportStatus, string> = {
  [ReportStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ReportStatus.APPROVED]: 'bg-green-100 text-green-800',
  [ReportStatus.REJECTED]: 'bg-red-100 text-red-800',
};

const AdminReportRow: React.FC<AdminReportRowProps> = ({ report, onUpdate, onDelete }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (newStatus: ReportStatus) => {
    try {
      const updatedReport = await api.updateReportStatus(report.id, newStatus);
      onUpdate(updatedReport);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async () => {
    if(window.confirm(`Are you sure you want to delete the report for "${report.companyDetails.name}"?`)) {
        setIsDeleting(true);
        try {
            await api.deleteReport(report.id);
            onDelete(report.id);
        } catch (error) {
            console.error("Failed to delete report", error);
            alert("Failed to delete report. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{report.companyDetails.name}</div>
          <button onClick={() => setIsDetailsModalOpen(true)} className="text-xs text-primary hover:underline">View Details</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{report.submittedBy.fullName}</div>
          <div className="text-xs text-gray-500">{report.submittedBy.email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[report.status]}`}>
            {report.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center space-x-2">
            {report.status !== ReportStatus.APPROVED && (
              <Button onClick={() => handleStatusChange(ReportStatus.APPROVED)} className="text-xs !p-1.5 bg-green-500 hover:bg-green-600">Approve</Button>
            )}
            {report.status !== ReportStatus.REJECTED && (
              <Button onClick={() => handleStatusChange(ReportStatus.REJECTED)} className="text-xs !p-1.5 bg-yellow-500 hover:bg-yellow-600">Reject</Button>
            )}
            <Button onClick={handleDelete} variant="danger" className="text-xs !p-1.5" disabled={isDeleting}>Delete</Button>
          </div>
        </td>
      </tr>

      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title={`Details for ${report.companyDetails.name}`}>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-gray-800">Company Information</h4>
                <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <p><strong>Address:</strong> {report.companyDetails.address || 'N/A'}</p>
                    <p><strong>Website:</strong> <a href={report.companyDetails.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{report.companyDetails.website || 'N/A'}</a></p>
                    <p><strong>Social Media:</strong> {report.companyDetails.socialMedia || 'N/A'}</p>
                    <p><strong>Contacts:</strong> {report.companyDetails.contactNumbers || 'N/A'}</p>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800">Scam Description</h4>
                <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">{report.scamDescription}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800">Proof Images</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {report.proofImages.map((img, index) => (
                        <a href={img} target="_blank" rel="noopener noreferrer" key={index}>
                            <img src={img} alt={`Proof ${index+1}`} className="rounded-md border object-cover"/>
                        </a>
                    ))}
                </div>
                {report.proofImages.length === 0 && <p className="text-sm text-gray-500">No images provided.</p>}
            </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminReportRow;
