import React, { useState } from 'react';
import ApiKeysDashboard from './ApiKeysDashboard';
import WorkspacesDashboard from './WorkspacesDashboard';

const MENU_ITEMS = {
  WORKSPACES: 'workspaces',
  API_KEYS: 'apiKeys'
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
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
} 