import React, { useState, useEffect } from 'react';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://api-a0534c9b-df6d-40f5-8657-792993bc24ec.try-eu.daytona.app/apikey/";
const baseUrl = apiUrl.replace('/apikey/', '');
const fullUrl = `${proxyUrl}${apiUrl}`;

const ApiKeysDashboard = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(true);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer OWZmODc4NmMtNmY1Ny00ZDcwLWE5MDEtYmY0MzRiZDA3YzBj'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApiKey = async (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    try {
      setIsCreating(true);
      const response = await fetch(`${fullUrl}${newKeyName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer OWZmODc4NmMtNmY1Ny00ZDcwLWE5MDEtYmY0MzRiZDA3YzBj'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      setNewlyCreatedKey(data);
      setShowCreateForm(false);
      await fetchApiKeys();
    } catch (error) {
      console.error('Error creating API key:', error);
      setError(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteKey = async (keyName) => {
    if (!window.confirm(`Are you sure you want to delete the API key "${keyName}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${fullUrl}${keyName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer OWZmODc4NmMtNmY1Ny00ZDcwLWE5MDEtYmY0MzRiZDA3YzBj'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete API key: ${response.status}`);
      }

      await fetchApiKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <h3 className="font-semibold">Error</h3>
        <p>{error}</p>
        <button
          onClick={() => { setError(null); fetchApiKeys(); }}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-[#00E599] text-black rounded hover:bg-[#00cc88] transition-colors"
          >
            Create New API Key
          </button>
        </div>
        <div className="text-sm text-gray-400">
          Server URL: <code className="bg-[#2A2A2A] px-2 py-1 rounded font-mono text-[#00E599]">{baseUrl}</code>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E599]"></div>
        </div>
      ) : (
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#2A2A2A]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {apiKeys.map((key) => (
                <tr key={key.name} className="hover:bg-[#2A2A2A]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{key.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(key.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#002E1F] text-[#00E599]">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteKey(key.name)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-md w-full border border-[#2A2A2A]">
            {showCreateForm ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-white">Create New API Key</h2>
                <form onSubmit={handleCreateApiKey}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      API Key Name
                    </label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E599] focus:border-transparent"
                      placeholder="Enter API key name"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        setNewKeyName('');
                        setShowCreateForm(true);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-4 py-2 bg-[#00E599] text-black rounded hover:bg-[#00cc88] disabled:bg-[#2A2A2A] disabled:text-gray-500"
                    >
                      {isCreating ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-white">API Key Created Successfully!</h2>
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">
                    Copy your API key now. You won't be able to see it again!
                  </p>
                  <div className="bg-[#2A2A2A] p-4 rounded-lg break-all font-mono text-sm text-[#00E599]">
                    {newlyCreatedKey}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setNewKeyName('');
                    setNewlyCreatedKey('');
                    setShowCreateForm(true);
                  }}
                  className="px-4 py-2 bg-[#00E599] text-black rounded hover:bg-[#00cc88]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeysDashboard; 