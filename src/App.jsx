import React, { useState } from 'react';
import TabBar from './TabBar';
import AsignadorRol from './features/rol/components/AsignadorRol';
import ListaMensual from './features/rol/components/ListaMensual';

function App() {
  const [activeTab, setActiveTab] = useState('ver');

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white print:min-h-0">
      <main className="print:block">
        {activeTab === 'ver' ? <ListaMensual /> : <AsignadorRol />}
      </main>
      <div className="print:hidden">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;