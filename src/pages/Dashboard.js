import React from "react";
import Layout from "../components/layout/Layout";
import { useApp } from "../context/AppContext";
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

function Dashboard() {
  const { companies, communications, communicationMethods } = useApp();

  // Get current month's communications
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  const thisMonthCommunications = communications.filter(comm => 
    isWithinInterval(parseISO(comm.date), { start: monthStart, end: monthEnd })
  );

  // Calculate statistics
  const stats = {
    totalCompanies: companies.length,
    totalCommunications: communications.length,
    thisMonthCommunications: thisMonthCommunications.length,
    methodStats: communicationMethods.map(method => ({
      name: method.name,
      count: communications.filter(c => c.type === method.name).length
    })),
    companiesNeedingFollowUp: companies.filter(company => {
      const lastComm = parseISO(company.lastCommunication);
      const daysElapsed = Math.floor((currentDate - lastComm) / (1000 * 60 * 60 * 24));
      return daysElapsed >= parseInt(company.periodicity);
    }).length
  };

  // Get recent communications
  const recentCommunications = [...communications]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Layout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Companies</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalCompanies}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Communications</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalCommunications}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.thisMonthCommunications}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Need Follow-up</h3>
            <p className="mt-2 text-3xl font-semibold text-indigo-600">{stats.companiesNeedingFollowUp}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Communication Methods Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Communication Methods</h2>
            <div className="space-y-4">
              {stats.methodStats.map(method => (
                <div key={method.name} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{method.name}</span>
                    <span className="text-sm font-medium text-gray-900">{method.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(method.count / stats.totalCommunications * 100) || 0}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Communications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Communications</h2>
            <div className="space-y-4">
              {recentCommunications.map(comm => {
                const company = companies.find(c => c.id === comm.companyId);
                return (
                  <div key={comm.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{company?.name}</h3>
                      <p className="text-sm text-gray-500">{comm.type}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(parseISO(comm.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;