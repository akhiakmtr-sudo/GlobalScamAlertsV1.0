import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { ScamReport, ReportStatus } from '../types';
import ScamReportCard from '../components/ScamReportCard';
import Button from '../components/Button';

const ITEMS_PER_PAGE = 25;

const AllScamsPage: React.FC = () => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const allReports = await api.getScamReports();
        const approvedReports = allReports
            .filter(report => report.status === ReportStatus.APPROVED)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setReports(approvedReports);
      } catch (error) {
        console.error("Failed to fetch scam reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter(report =>
      report.companyDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reports, searchTerm]);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredReports, currentPage]);

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Scam Alerts</h1>
      <p className="text-gray-600 mb-6">Browse the full list of community-reported and verified scam activities.</p>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="text-center py-10">Loading reports...</div>
      ) : paginatedReports.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedReports.map(report => (
              <ScamReportCard key={report.id} report={report} />
            ))}
          </div>
          {totalPages > 1 && (
             <div className="flex justify-center items-center mt-8 space-x-4">
                <Button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} variant="outline">
                    Back
                </Button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <Button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} variant="outline">
                    Next
                </Button>
             </div>
          )}
        </>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">No scam reports found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AllScamsPage;