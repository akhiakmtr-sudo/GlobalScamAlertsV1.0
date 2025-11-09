
import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { ScamReport, ReportStatus } from '../types';
import AdminReportRow from '../components/AdminReportRow';

const AdminDashboardPage: React.FC = () => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReportStatus | 'ALL'>('ALL');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const allReports = await api.getScamReports();
      setReports(allReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Failed to fetch scam reports", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchReports();
  }, []);
  
  const handleReportUpdate = (updatedReport: ScamReport) => {
    setReports(reports.map(r => r.id === updatedReport.id ? updatedReport : r));
  };
  
  const handleReportDelete = (deletedReportId: string) => {
    setReports(reports.filter(r => r.id !== deletedReportId));
  };

  const filteredReports = useMemo(() => {
    if (filter === 'ALL') {
      return reports;
    }
    return reports.filter(report => report.status === filter);
  }, [reports, filter]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Review and manage user-submitted scam reports.</p>

      <div className="flex space-x-2 mb-4 border-b">
        {(['ALL', ...Object.values(ReportStatus)] as const).map(status => (
            <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 text-sm font-medium ${filter === status ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10">Loading reports...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.length > 0 ? filteredReports.map(report => (
                <AdminReportRow key={report.id} report={report} onUpdate={handleReportUpdate} onDelete={handleReportDelete} />
              )) : (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">No reports found for this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
