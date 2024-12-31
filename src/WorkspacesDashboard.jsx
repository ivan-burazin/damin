import React, { useState, useEffect } from 'react';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "http://128.199.45.83:3986/workspace/";
const fullUrl = `${proxyUrl}${apiUrl}`;

export default function WorkspacesDashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer OWZmODc4NmMtNmY1Ny00ZDcwLWE5MDEtYmY0MzRiZDA3YzBj`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Workspaces Response:", data);
      setWorkspaces(data);
    } catch (error) {
      console.error("Error while fetching workspaces:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    if (!window.confirm(`Are you sure you want to delete this workspace?`)) {
      return;
    }

    try {
      const response = await fetch(`${proxyUrl}${apiUrl}${workspaceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer OWZmODc4NmMtNmY1Ny00ZDcwLWE5MDEtYmY0MzRiZDA3YzBj`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete workspace: ${response.status}`);
      }

      await fetchWorkspaces(); // Refresh the list
    } catch (error) {
      console.error("Error while deleting the workspace:", error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <h3 className="font-semibold">Error</h3>
        <p>{error}</p>
        <button 
          onClick={() => { setError(null); fetchWorkspaces(); }}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="w-full">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repository
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workspaces.map((workspace) => (
                <tr key={workspace.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{workspace.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workspace.name || 'Unnamed'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workspace.repository || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{workspace.target || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${workspace.status === 'running' ? 'bg-green-100 text-green-800' : 
                        workspace.status === 'stopped' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                      {workspace.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(workspace.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {workspace.lastActive ? new Date(workspace.lastActive).toLocaleString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleDeleteWorkspace(workspace.id)}
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
    </div>
  );
} 