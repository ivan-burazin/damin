import React, { useState } from 'react';
import ApiKeysDashboard from './ApiKeysDashboard';
import WorkspacesDashboard from './WorkspacesDashboard';

const MENU_ITEMS = {
  WORKSPACES: 'workspaces',
  API_KEYS: 'apiKeys',
  DOCS: 'docs'
};

export default function Layout({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState(MENU_ITEMS.WORKSPACES);

  const renderContent = () => {
    switch (activeMenu) {
      case MENU_ITEMS.WORKSPACES:
        return <WorkspacesDashboard />;
      case MENU_ITEMS.API_KEYS:
        return <ApiKeysDashboard />;
      default:
        return null;
    }
  };

  const handleDocsClick = () => {
    window.open('https://www.daytona.io/docs/', '_blank');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:text-red-900"
          >
            Logout
          </button>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveMenu(MENU_ITEMS.WORKSPACES)}
            className={`w-full px-4 py-2 text-left ${
              activeMenu === MENU_ITEMS.WORKSPACES
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Workspaces
          </button>
          <button
            onClick={() => setActiveMenu(MENU_ITEMS.API_KEYS)}
            className={`w-full px-4 py-2 text-left ${
              activeMenu === MENU_ITEMS.API_KEYS
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            API Keys
          </button>
          <button
            onClick={handleDocsClick}
            className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 flex items-center justify-between"
          >
            <span>Docs</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
} 