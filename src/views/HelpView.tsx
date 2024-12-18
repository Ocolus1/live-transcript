import React from 'react';
import { HelpCircle, Book, Video, MessageCircle } from 'lucide-react';

const HelpView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold">Help & Support</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Documentation</h2>
          </div>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Getting Started Guide</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">User Manual</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">API Documentation</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">FAQs</a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Video Tutorials</h2>
          </div>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Quick Start Tutorial</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Advanced Features</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Best Practices</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Tips & Tricks</a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Support</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Need help? Our support team is available 24/7 to assist you.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpView;