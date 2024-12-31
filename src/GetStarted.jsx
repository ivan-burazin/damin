import React from 'react';

const GetStarted = () => {
  const handleApiKeysClick = () => {
    // Find the API Keys button and click it
    const apiKeysButton = document.querySelector('button:has-text("API Keys")');
    if (apiKeysButton) {
      apiKeysButton.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Get Started</h1>
      </div>

      <div className="space-y-8">
        {/* Installation */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">1. Install the SDK</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Using npm:</p>
              <code className="block bg-[#2A2A2A] p-3 rounded font-mono text-sm text-[#00E599]">
                npm install @daytona/sdk
              </code>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Or using yarn:</p>
              <code className="block bg-[#2A2A2A] p-3 rounded font-mono text-sm text-[#00E599]">
                yarn add @daytona/sdk
              </code>
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">2. Get Your API Key</h2>
          <p className="text-gray-400 mb-4">
            You'll need an API key to use the SDK. You can create one in the{' '}
            <button 
              onClick={handleApiKeysClick}
              className="text-[#00E599] hover:text-[#00cc88] font-medium"
            >
              API Keys section
            </button>
            .
          </p>
        </div>

        {/* Basic Usage */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">3. Basic Usage</h2>
          <div className="bg-[#2A2A2A] p-4 rounded font-mono text-sm">
            <pre className="whitespace-pre-wrap text-[#00E599]">
{`import { Daytona } from '@daytona/sdk'

// Initialize the Daytona client
const daytona = new Daytona()

// Create the workspace instance
const workspace = await daytona.create({
  language: 'typescript',
})

// Run the code securely inside the workspace
const response = await workspace.process.code_run('console.log("Hello World!")')
console.log(response.result)`}
            </pre>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Next Steps</h2>
          <p className="text-gray-400">
            Check out our{' '}
            <a 
              href="https://www.daytona.io/docs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00E599] hover:text-[#00cc88] font-medium"
            >
              documentation
            </a>
            {' '}for more detailed information and advanced usage examples.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted; 