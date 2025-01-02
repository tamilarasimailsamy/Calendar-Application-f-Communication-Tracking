import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useApp } from '../context/AppContext';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Add custom CSS for the calendar
const customCalendarStyles = `
  .rbc-calendar {
    min-height: 700px;
  }
  
  .rbc-month-view {
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 0.5rem;
  }

  .rbc-month-header {
    background: #f9fafb;
    padding: 8px 0;
  }

  .rbc-header {
    padding: 8px;
    font-weight: 600;
    font-size: 0.875rem;
    color: #4b5563;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
  }

  .rbc-date-cell {
    padding: 8px;
    font-size: 0.875rem;
    color: #374151;
    text-align: right;
  }

  .rbc-off-range-bg {
    background: #f9fafb;
  }

  .rbc-off-range {
    color: #9ca3af;
  }

  .rbc-today {
    background-color: #eef2ff !important;
  }

  .rbc-event {
    border-radius: 4px;
    padding: 2px 5px;
    margin: 1px 5px;
    background-color: #4f46e5;
  }

  .rbc-row-segment {
    padding: 2px 4px;
  }

  .rbc-show-more {
    color: #4f46e5;
    font-size: 0.75rem;
    padding: 2px 4px;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customCalendarStyles;
document.head.appendChild(styleSheet);

// Custom calendar styling
const calendarStyles = {
  height: 700,
  className: "shadow-lg rounded-lg bg-white",
  dayPropGetter: date => ({
    className: 'font-medium',
    style: {
      backgroundColor: date.getDay() === 0 || date.getDay() === 6 ? '#f9fafb' : '',
    },
  }),
  eventPropGetter: event => ({
    className: 'rounded-md border-none',
    style: {
      backgroundColor: getEventColor(event.type),
      color: '#ffffff',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
  }),
  formats: {
    dateFormat: 'dd',
    dayFormat: 'dd',
    monthHeaderFormat: 'MMMM yyyy',
    dayHeaderFormat: 'cccc',
    dayRangeHeaderFormat: ({ start, end }) => 
      `${format(start, 'MMMM dd')} - ${format(end, 'MMMM dd, yyyy')}`,
  },
  components: {
    toolbar: CustomToolbar,
    month: {
      dateHeader: ({ date, label }) => (
        <span className="text-sm font-medium">
          {format(date, 'd')}
        </span>
      ),
      header: ({ date, label }) => (
        <span className="text-sm font-semibold text-gray-700">
          {format(date, 'EEE')}
        </span>
      ),
    },
  },
};

// Custom toolbar component
function CustomToolbar({ label, onNavigate, onView, view }) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onNavigate('PREV')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate('NEXT')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => onNavigate('TODAY')}
          className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          Today
        </button>
        <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
      </div>
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => onView('month')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
            view === 'month' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => onView('week')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
            view === 'week' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onView('day')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
            view === 'day' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Day
        </button>
      </div>
    </div>
  );
}

// Get color based on communication type
function getEventColor(type) {
  const colors = {
    'LinkedIn Post': '#0077B5',
    'LinkedIn Message': '#0077B5',
    'Email': '#4F46E5',
    'Phone Call': '#059669',
    'Meeting': '#DC2626',
    'Other': '#6B7280',
  };
  return colors[type] || colors.Other;
}

function Calendar() {
  const { companies, communications, communicationMethods, addCommunication } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    companyId: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Format communications for calendar
  const calendarEvents = communications.map(comm => {
    const company = companies.find(c => c.id === comm.companyId);
    return {
      id: comm.id,
      title: `${company?.name} - ${comm.type}`,
      start: new Date(comm.date),
      end: new Date(comm.date),
      type: comm.type,
      desc: comm.notes,
      company: company?.name,
    };
  });

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  // Get upcoming communications based on company periodicity
  const getUpcomingCommunications = () => {
    return companies.map(company => {
      const lastComm = new Date(company.lastCommunication);
      const nextComm = new Date(lastComm);
      nextComm.setDate(nextComm.getDate() + parseInt(company.periodicity));
      return {
        company,
        nextCommunicationDate: nextComm,
      };
    }).sort((a, b) => a.nextCommunicationDate - b.nextCommunicationDate);
  };

  const handleAddCommunication = (e) => {
    e.preventDefault();
    console.log('Adding communication:', newCommunication);
    addCommunication(newCommunication);
    setShowAddModal(false);
    setNewCommunication({
      companyId: '',
      type: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  return (
    <Layout>
      <div className="px-4 py-6 space-y-6 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Communication Calendar</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Communication</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar View - Takes up more space */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <BigCalendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                tooltipAccessor="desc"
                onSelectEvent={handleEventSelect}
                {...calendarStyles}
                views={['month', 'week', 'day']}
              />
            </div>
          </div>

          {/* Sidebar with upcoming communications */}
          <div className="lg:col-span-1 space-y-6">
            {/* Legend */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Types</h3>
              <div className="space-y-2">
                {communicationMethods.map(method => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getEventColor(method.name) }}
                    />
                    <span className="text-sm text-gray-600">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Communications */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                {getUpcomingCommunications().slice(0, 5).map(({ company, nextCommunicationDate }) => (
                  <div key={company.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <h4 className="font-medium text-gray-900">{company.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Due: {nextCommunicationDate.toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => {
                        setNewCommunication(prev => ({
                          ...prev,
                          companyId: company.id,
                          date: nextCommunicationDate.toISOString().split('T')[0],
                        }));
                        setShowAddModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2"
                    >
                      Log Communication →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative z-50">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-medium text-gray-900">{selectedEvent.company}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Type: {selectedEvent.type}</p>
                <p className="text-sm text-gray-500">Date: {format(selectedEvent.start, 'PPP')}</p>
                <p className="text-sm text-gray-500 mt-2">Notes: {selectedEvent.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Communication Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-medium text-gray-900">Add Communication</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddCommunication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <select
                    value={newCommunication.companyId}
                    onChange={(e) => setNewCommunication(prev => ({
                      ...prev,
                      companyId: parseInt(e.target.value),
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a company</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newCommunication.type}
                    onChange={(e) => {
                      console.log('Selected type:', e.target.value);
                      setNewCommunication(prev => ({
                        ...prev,
                        type: e.target.value,
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a type</option>
                    {communicationMethods.map(method => (
                      <option key={method.id} value={method.name}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newCommunication.date}
                    onChange={(e) => setNewCommunication(prev => ({
                      ...prev,
                      date: e.target.value,
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    value={newCommunication.notes}
                    onChange={(e) => setNewCommunication(prev => ({
                      ...prev,
                      notes: e.target.value,
                    }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Add Communication
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Calendar;