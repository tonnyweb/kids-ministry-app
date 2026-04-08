import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { UserPlus, Trash2 } from 'lucide-react';

export default function ListaMaestros() {
  const [maestros, setMaestros] = useState([]);

  useEffect(() => {
    const leerMaestros = async () => {
      const { data } = await supabase.from('maestros').select('*');
      setMaestros(data || []);
    };
    leerMaestros();
  }, []);

  return (
  <div className="p-5 pb-28">
    <header className="mb-8">
      <h1 className="text-3xl font-black text-indigo-900 tracking-tight">Iglesia Emmanuel</h1>
      <p className="text-indigo-500 font-medium">Rol de Clases • 2026</p>
    </header>

    <div className="grid gap-6">
      {roles.map((item) => (
        <div key={item.id} className="glass-card rounded-3xl p-5 relative overflow-hidden">
          {/* Indicador de Grupo */}
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] px-4 py-1 rounded-bl-2xl font-black uppercase">
            {item.grupo}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                <Calendar size={18} />
              </div>
              <span className="font-bold text-gray-800 capitalize">{item.fecha}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 bg-white/40 p-3 rounded-2xl">
              <div className="flex items-center gap-1"><Clock size={14}/> {item.servicio}</div>
              <div className="flex items-center gap-1 font-semibold text-indigo-700"><User size={14}/> {item.maestro}</div>
            </div>

            <div className="mt-2">
              <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Lección de hoy:</p>
              <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                {item.leccion}
              </h3>
            </div>
          </div>
          
          <button onClick={() => borrar(item.id)} className="absolute bottom-4 right-4 text-red-300 hover:text-red-500">
            <Trash2 size={16}/>
          </button>
        </div>
      ))}
    </div>
  </div>
);
}