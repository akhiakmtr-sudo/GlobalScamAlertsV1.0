
import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { ScamReport, ReportStatus, VerifiedAgency } from '../types';
import ScamReportCard from '../components/ScamReportCard';
import Button from '../components/Button';
import ContactForm from '../components/ContactForm';

const ScamListPage: React.FC = () => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [agencies, setAgencies] = useState<VerifiedAgency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allReports, allAgencies] = await Promise.all([
          api.getScamReports(),
          api.getVerifiedAgencies()
        ]);
        const approvedReports = allReports
          .filter(report => report.status === ReportStatus.APPROVED)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setReports(approvedReports);
        setAgencies(allAgencies);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const filteredReports = useMemo(() => {
    return reports.filter(report =>
      report.companyDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reports, searchTerm]);

  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <div 
        className="relative h-64 md:h-80 rounded-lg overflow-hidden -mt-8 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Stay Alert. Report Scams.</h1>
            <p className="mt-4 text-lg md:text-xl">Protect the community by sharing information and staying informed.</p>
          </div>
        </div>
      </div>
      
      {/* Search and Report Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search latest reports by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <a href="#/report-scam" className="w-full md:w-auto">
                <Button variant="secondary" className="w-full whitespace-nowrap">
                    Report a Scam
                </Button>
            </a>
        </div>
      </div>

      {/* Latest Scam Reports Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Latest Scam Reports</h2>
        <p className="text-gray-600 mb-8 text-center">Browse the most recent community-reported scam activities.</p>
        
        {loading ? (
          <div className="text-center py-10">Loading reports...</div>
        ) : filteredReports.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.slice(0, 5).map(report => (
              <ScamReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
              <p className="text-gray-500">No scam reports have been published yet.</p>
          </div>
        )}
        {reports.length > 5 && (
            <div className="text-center mt-8">
                <a href="#/all-scams">
                    <Button variant="primary">See More Reports</Button>
                </a>
            </div>
        )}
      </section>

      {/* Trusted Agencies Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Trusted Agencies</h2>
        <p className="text-gray-600 mb-8 text-center">Organizations recognized for their work in consumer protection.</p>
        <div className="space-y-6">
            {agencies.slice(0, 2).map((agency) => (
                <div key={agency.id} className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-6">
                    <img src={agency.logoUrl} alt={`${agency.name} logo`} className="w-20 h-20 object-contain" />
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-primary">{agency.name}</h3>
                        <p className="text-gray-600 my-2 text-sm">{agency.description}</p>
                        <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
                            Visit Website &rarr;
                        </a>
                    </div>
                </div>
            ))}
        </div>
        {agencies.length > 2 && (
            <div className="text-center mt-8">
                <a href="#/verified-agencies">
                    <Button variant="outline">View All Agencies</Button>
                </a>
            </div>
        )}
      </section>
      
      {/* About Us Section */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
            Global Scam Alerts is a community-driven platform dedicated to fighting fraud and protecting consumers worldwide. Our mission is to create a transparent and accessible database of scam operations, empowering individuals to make informed decisions and avoid financial loss.
        </p>
        <a href="#/about"><Button variant="outline">Learn More</Button></a>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Vision & Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
          Our vision is to create a global environment where consumers are empowered and protected from all forms of financial fraud. Our mission is to operate the most comprehensive, user-friendly, and reliable platform for reporting, tracking, and publicizing scam activities worldwide.
        </p>
        <a href="#/vision"><Button variant="outline">Read More</Button></a>
      </section>

      {/* Contact Us Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Get in Touch</h2>
        <p className="text-gray-600 mb-8 text-center">Have a question or want to challenge a report? Contact us.</p>
        <div className="max-w-2xl mx-auto">
            <ContactForm />
        </div>
      </section>

    </div>
  );
};

export default ScamListPage;
