import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Tech Corp',
      location: 'San Francisco',
      linkedinProfile: 'https://linkedin.com/company/techcorp',
      emails: 'contact@techcorp.com',
      phoneNumbers: '123-456-7890',
      comments: 'Initial contact made',
      periodicity: '30',
      lastCommunication: '2024-03-15',
    },
    {
      id: 2,
      name: 'Innovation Labs',
      location: 'New York',
      linkedinProfile: 'https://linkedin.com/company/innovationlabs',
      emails: 'info@innovationlabs.com',
      phoneNumbers: '098-765-4321',
      comments: 'Follow up needed',
      periodicity: '15',
      lastCommunication: '2024-03-10',
    },
  ]);

  const [communications, setCommunications] = useState([
    {
      id: 1,
      companyId: 1,
      type: 'Email',
      date: '2024-03-15',
      notes: 'Discussed partnership opportunity',
    },
    {
      id: 2,
      companyId: 2,
      type: 'Phone Call',
      date: '2024-03-10',
      notes: 'Initial introduction',
    },
  ]);

  const [communicationMethods, setCommunicationMethods] = useState([
    { id: 1, name: 'LinkedIn Post', description: '', sequence: 1, mandatory: true },
    { id: 2, name: 'LinkedIn Message', description: '', sequence: 2, mandatory: true },
    { id: 3, name: 'Email', description: '', sequence: 3, mandatory: true },
    { id: 4, name: 'Phone Call', description: '', sequence: 4, mandatory: true },
    { id: 5, name: 'Other', description: '', sequence: 5, mandatory: false },
  ]);

  const [user, setUser] = useState(null);

  const login = (username, role) => {
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';

  const addCompany = (newCompany) => {
    setCompanies([
      ...companies,
      {
        ...newCompany,
        id: companies.length + 1,
        lastCommunication: new Date().toISOString().split('T')[0]
      }
    ]);
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
    // Also delete associated communications
    setCommunications(communications.filter(comm => comm.companyId !== id));
  };

  const addCommunication = (newCommunication) => {
    setCommunications([
      ...communications,
      {
        ...newCommunication,
        id: communications.length + 1,
      }
    ]);
    
    // Update company's last communication date
    const company = companies.find(c => c.id === newCommunication.companyId);
    if (company) {
      updateCompany({
        ...company,
        lastCommunication: newCommunication.date
      });
    }
  };

  const updateCompany = (updatedCompany) => {
    setCompanies(companies.map(company => 
      company.id === updatedCompany.id ? updatedCompany : company
    ));
  };

  return (
    <AppContext.Provider value={{
      companies,
      communications,
      communicationMethods,
      addCompany,
      deleteCompany,
      updateCompany,
      addCommunication,
      setCommunicationMethods,
      user,
      login,
      logout,
      isAdmin,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 