import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import CompanyForm from './components/CompanyForm';
import CommunicationMethodsForm from './components/CommunicationMethodsForm';
import CompanyList from './components/CompanyList';
import { useApp } from '../../context/AppContext';

function Admin() {
  const [activeTab, setActiveTab] = useState('companies');
  const { companies, addCompany, deleteCompany } = useApp();

  return (
    <Layout>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('companies')}
              className={`${
                activeTab === 'companies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('communication-methods')}
              className={`${
                activeTab === 'communication-methods'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Communication Methods
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'companies' && (
            <div className="space-y-6">
              <CompanyForm onSubmit={addCompany} />
              <CompanyList 
                companies={companies} 
                onDelete={deleteCompany}
              />
            </div>
          )}
          {activeTab === 'communication-methods' && <CommunicationMethodsForm />}
        </div>
      </div>
    </Layout>
  );
}

export default Admin; 