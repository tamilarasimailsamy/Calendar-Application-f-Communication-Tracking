import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

function CommunicationMethodsForm() {
  const { communicationMethods, setCommunicationMethods } = useApp();
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: communicationMethods.length + 1,
    mandatory: false,
  });

  const handleAddMethod = (e) => {
    e.preventDefault();
    setCommunicationMethods([
      ...communicationMethods, 
      { 
        ...newMethod, 
        id: communicationMethods.length + 1 
      }
    ]);
    setNewMethod({
      name: '',
      description: '',
      sequence: communicationMethods.length + 2,
      mandatory: false,
    });
  };

  const handleDeleteMethod = (id) => {
    setCommunicationMethods(communicationMethods.filter(method => method.id !== id));
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Communication Methods
        </h3>

        {/* List existing methods */}
        <div className="mt-4 space-y-4">
          {communicationMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{method.name}</h4>
                <p className="text-sm text-gray-500">Sequence: {method.sequence}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  method.mandatory 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {method.mandatory ? 'Mandatory' : 'Optional'}
                </span>
                <button
                  onClick={() => handleDeleteMethod(method.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new method form */}
        <form onSubmit={handleAddMethod} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Method Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={newMethod.name}
              onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sequence" className="block text-sm font-medium text-gray-700">
              Sequence
            </label>
            <input
              type="number"
              name="sequence"
              id="sequence"
              required
              min="1"
              value={newMethod.sequence}
              onChange={(e) => setNewMethod({ ...newMethod, sequence: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={2}
              value={newMethod.description}
              onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="mandatory"
              checked={newMethod.mandatory}
              onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="mandatory" className="ml-2 block text-sm text-gray-900">
              Mandatory Method
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunicationMethodsForm;