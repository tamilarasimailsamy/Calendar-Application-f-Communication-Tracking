import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useApp } from '../context/AppContext';
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

function Reports() {
  const { companies, communications, communicationMethods } = useApp();
  const [filters, setFilters] = useState({
    company: '',
    method: '',
    startDate: '',
    endDate: '',
  });

  // Filter communications based on selected filters
  const filteredCommunications = communications.filter(comm => {
    const matchesCompany = !filters.company || comm.companyId === parseInt(filters.company);
    const matchesMethod = !filters.method || comm.type === filters.method;
    const matchesDateRange = (!filters.startDate || !filters.endDate) || 
      isWithinInterval(parseISO(comm.date), {
        start: parseISO(filters.startDate),
        end: parseISO(filters.endDate)
      });
    
    return matchesCompany && matchesMethod && matchesDateRange;
  });

  // Group communications by company
  const communicationsByCompany = companies.map(company => ({
    company,
    communications: filteredCommunications.filter(c => c.companyId === company.id)
  }));

  return (
    <Layout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Communication Reports</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <select
                value={filters.company}
                onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Companies</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Method</label>
              <select
                value={filters.method}
                onChange={(e) => setFilters(prev => ({ ...prev, method: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Methods</option>
                {communicationMethods.map(method => (
                  <option key={method.id} value={method.name}>{method.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Communications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Communication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Most Used Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communicationsByCompany.map(({ company, communications }) => {
                const methodCounts = communications.reduce((acc, comm) => {
                  acc[comm.type] = (acc[comm.type] || 0) + 1;
                  return acc;
                }, {});
                
                const mostUsedMethod = Object.entries(methodCounts)
                  .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

                const lastComm = communications
                  .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

                return (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {communications.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lastComm ? format(parseISO(lastComm.date), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mostUsedMethod}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Reports; 