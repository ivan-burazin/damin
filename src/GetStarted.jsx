import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-[#2A2A2A] text-gray-400 hover:text-white transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const CodeBlock = ({ code, language }) => {
  return (
    <div className="relative">
      <CopyButton text={code} />
      <Highlight theme={themes.nightOwl} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 rounded overflow-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

const GetStarted = ({ onNavigate, menuItems }) => {
  const handleApiKeysClick = () => {
    onNavigate(menuItems.API_KEYS);
  };

  const npmInstall = 'npm install @daytona/sdk';
  const yarnAdd = 'yarn add @daytona/sdk';
  const usageExample = `import { Daytona } from '@daytona/sdk'

// Initialize the Daytona client
const daytona = new Daytona()

// Create the workspace instance
const workspace = await daytona.create({
  language: 'typescript',
})

// Run the code securely inside the workspace
const response = await workspace.process.code_run('console.log("Hello World!")')
console.log(response.result)`;

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
              <div className="relative">
                <CodeBlock code={npmInstall} language="bash" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Or using yarn:</p>
              <div className="relative">
                <CodeBlock code={yarnAdd} language="bash" />
              </div>
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">2. Get Your API Key</h2>
          <p className="text-gray-400 mb-4">
            You'll need an API key to use the SDK. Click{' '}
            <button 
              onClick={handleApiKeysClick}
              className="text-[#00E599] hover:text-[#00cc88] font-medium underline"
            >
              here
            </button>
            {' '}or select API Keys from the sidebar to create one.
          </p>
        </div>

        {/* Basic Usage */}
        <div className="bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">3. Basic Usage</h2>
          <div className="relative">
            <CodeBlock code={usageExample} language="javascript" />
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