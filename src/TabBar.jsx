import React from 'react';
import { Calendar, PlusCircle } from 'lucide-react';

export default function TabBar({ activeTab, setActiveTab }) {
  return (
  <nav className="fixed bottom-6 left-6 right-6 h-16 glass-card rounded-2xl flex justify-around items-center px-4 z-50">
    <button 
      onClick={() => setActiveTab('ver')} 
      className={`flex flex-col items-center transition-all ${activeTab === 'ver' ? 'text-indigo-600 scale-110' : 'text-gray-400'}`}
    >
      <Calendar size={24} strokeWidth={activeTab === 'ver' ? 2.5 : 2} />
      <span className="text-[9px] font-bold mt-1 uppercase">Rol</span>
    </button>

    <button 
      onClick={() => setActiveTab('crear')} 
      className={`flex flex-col items-center transition-all ${activeTab === 'crear' ? 'text-indigo-600 scale-110' : 'text-gray-400'}`}
    >
      <PlusCircle size={24} strokeWidth={activeTab === 'crear' ? 2.5 : 2} />
      <span className="text-[9px] font-bold mt-1 uppercase">Asignar</span>
    </button>
  </nav>
);
}