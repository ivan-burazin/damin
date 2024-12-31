import React from 'react';

const URLDisplay = () => {
  const baseUrl = "https://api-a0534c9b-df6d-40f5-8657-792993bc24ec.try-eu.daytona.app";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Server URL</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden p-6">
        <div className="flex items-center justify-between">
          <div className="text-gray-700">
            <h2 className="text-lg font-semibold mb-2">DAYTONA_SERVER_URL</h2>
            <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
              {baseUrl}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLDisplay; 