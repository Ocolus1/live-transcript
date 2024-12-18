import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import AnalysisView from './views/AnalysisView';
import HistoryView from './views/HistoryView';
import StandardsView from './views/StandardsView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import HelpView from './views/HelpView';
import { useStore } from './store';

function App() {
  const { activeView } = useStore();

  const renderView = () => {
    switch (activeView) {
      case 'analysis':
        return <AnalysisView />;
      case 'history':
        return <HistoryView />;
      case 'standards':
        return <StandardsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'help':
        return <HelpView />;
      default:
        return <AnalysisView />;
    }
  };

  return (
    <MainLayout>
      {renderView()}
    </MainLayout>
  );
}

export default App;