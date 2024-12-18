import React from 'react';
import {
  Brain,
  Settings,
  History,
  BookOpen,
  BarChart2,
  HelpCircle,
  Menu,
} from 'lucide-react';
import { useStore } from '../../store';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { setActiveView } = useStore();

  const menuItems = [
    { icon: Brain, label: 'Live Analysis', view: 'analysis' },
    { icon: History, label: 'Session History', view: 'history' },
    { icon: BookOpen, label: 'Standards', view: 'standards' },
    { icon: BarChart2, label: 'Reports', view: 'reports' },
    { icon: Settings, label: 'Settings', view: 'settings' },
    { icon: HelpCircle, label: 'Help', view: 'help' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:relative lg:z-0 w-64 flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900">
                Medical Device AI
              </h1>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setActiveView(item.view);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="text-sm text-gray-500">
              <p>Version 1.0.0</p>
              <p>© 2024 Medical Device AI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;