import React, { useState } from 'react';
import ApiKeysDashboard from './ApiKeysDashboard';
import WorkspacesDashboard from './WorkspacesDashboard';
import GetStarted from './GetStarted';

const MENU_ITEMS = {
  GET_STARTED: 'getStarted',
  WORKSPACES: 'workspaces',
  API_KEYS: 'apiKeys',
  DOCS: 'docs'
};

export default function Layout({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState(MENU_ITEMS.GET_STARTED);

  const handleNavigation = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case MENU_ITEMS.GET_STARTED:
        return <GetStarted onNavigate={handleNavigation} menuItems={MENU_ITEMS} />;
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
    <div className="flex h-screen bg-[#0D0D0D] text-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#1A1A1A] border-r border-[#2A2A2A]">
        <div className="p-4 flex justify-between items-center border-b border-[#2A2A2A]">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <button
            onClick={onLogout}
            className="text-sm text-red-500 hover:text-red-400"
          >
            Logout
          </button>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveMenu(MENU_ITEMS.GET_STARTED)}
            className={`w-full px-4 py-2 text-left ${
              activeMenu === MENU_ITEMS.GET_STARTED
                ? 'bg-[#2A2A2A] text-[#00E599] border-r-4 border-[#00E599]'
                : 'text-gray-300 hover:bg-[#2A2A2A]'
            }`}
          >
            Get Started
          </button>
          <button
            onClick={() => setActiveMenu(MENU_ITEMS.WORKSPACES)}
            className={`w-full px-4 py-2 text-left ${
              activeMenu === MENU_ITEMS.WORKSPACES
                ? 'bg-[#2A2A2A] text-[#00E599] border-r-4 border-[#00E599]'
                : 'text-gray-300 hover:bg-[#2A2A2A]'
            }`}
          >
            Workspaces
          </button>
          <button
            onClick={() => setActiveMenu(MENU_ITEMS.API_KEYS)}
            className={`w-full px-4 py-2 text-left ${
              activeMenu === MENU_ITEMS.API_KEYS
                ? 'bg-[#2A2A2A] text-[#00E599] border-r-4 border-[#00E599]'
                : 'text-gray-300 hover:bg-[#2A2A2A]'
            }`}
          >
            API Keys
          </button>
          <button
            onClick={handleDocsClick}
            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[#2A2A2A] flex items-center justify-between"
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