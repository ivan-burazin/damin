import React, { useState, useEffect } from 'react';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://api-a0534c9b-df6d-40f5-8657-792993bc24ec.try-eu.daytona.app/workspace/";
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

      await fetchWorkspaces();
    } catch (error) {
      console.error("Error while deleting the workspace:", error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 text-red-500 rounded-lg border border-red-900/20">
        <h3 className="font-semibold">Error</h3>
        <p>{error}</p>
        <button
          onClick={() => { setError(null); fetchWorkspaces(); }}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Workspaces</h1>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Repository</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {workspaces.map((workspace) => (
                <tr key={workspace.id} className="hover:bg-[#2A2A2A]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {workspace.name || 'Unnamed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {workspace.repository || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {workspace.target || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${workspace.status === 'running' ? 'bg-[#002E1F] text-[#00E599]' : 
                        workspace.status === 'stopped' ? 'bg-red-900/20 text-red-500' : 'bg-gray-800 text-gray-400'}`}>
                      {workspace.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(workspace.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteWorkspace(workspace.id)}
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
    </div>
  );
} 