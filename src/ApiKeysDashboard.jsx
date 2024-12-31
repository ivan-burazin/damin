import React, { useState, useEffect } from 'react';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "http://128.199.45.83:3986/apikey/";
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API Keys</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New API Key
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(key.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteKey(key.name)}
                      className="text-red-600 hover:text-red-900"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            {showCreateForm ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
                <form onSubmit={handleCreateApiKey}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key Name
                    </label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {isCreating ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">API Key Created Successfully!</h2>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Copy your API key now. You won't be able to see it again!
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg break-all font-mono text-sm">
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
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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