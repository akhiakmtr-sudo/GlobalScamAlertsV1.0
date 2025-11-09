
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { VerifiedAgency } from '../types';

const VerifiedAgenciesPage: React.FC = () => {
  const [agencies, setAgencies] = useState<VerifiedAgency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      setLoading(true);
      const data = await api.getVerifiedAgencies();
      setAgencies(data);
      setLoading(false);
    };
    fetchAgencies();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading Verified Agencies...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Verified Agencies</h1>
      <p className="text-gray-600 mb-8 text-center">
        The following organizations are recognized for their work in consumer protection and fraud prevention.
      </p>
      <div className="space-y-6">
        {agencies.map((agency) => (
          <div key={agency.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-6">
            <img src={agency.logoUrl} alt={`${agency.name} logo`} className="w-24 h-24 object-contain rounded-full border" />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-primary">{agency.name}</h2>
              <p className="text-gray-600 my-2">{agency.description}</p>
              <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
                Visit Website &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedAgenciesPage;
