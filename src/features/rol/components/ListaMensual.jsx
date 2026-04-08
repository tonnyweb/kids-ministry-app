import React, { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { Calendar, Clock, User, Share2, Printer, Trash2, BookOpen } from 'lucide-react';

export default function ListaMensual() {
  const [roles, setRoles] = useState([]);

  const obtenerRoles = async () => {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('fecha', { ascending: true });
    if (data) setRoles(data);
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  const borrar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      const { error } = await supabase.from('roles').delete().eq('id', id);
      if (!error) {
        setRoles(roles.filter((r) => r.id !== id));
      } else {
        alert("Error al eliminar");
      }
    }
  };

  const compartirWhatsApp = () => {
    let mensaje = "📋 *ROL KIDS MINISTRY*\n\n";
    roles.forEach((r) => {
      mensaje += `🗓 *${r.fecha}*\n👤 ${r.maestro}\n⏰ ${r.servicio} | 🏫 ${r.grupo}\n📖 ${r.leccion}\n----------\n`;
    });
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 pb-28 min-h-screen">
      
      {/* ==========================================
          VISTA DE IMPRESIÓN (Elegante y Profesional)
          ========================================== */}
      <div className="hidden print:block font-sans">
        <div className="flex justify-between items-center mb-10 border-b-4 border-indigo-900 pb-6">
          <div>
            <h1 className="text-2xl font-black text-indigo-900 tracking-tighter italic">Rol de Maestros</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">IGLESIA INFANTIL EMMANUEL</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-light text-slate-400 uppercase">Generado por</p>
            <p className="text-sm font-black text-indigo-900 italic">Kids Ministry</p>
          </div>
        </div>

        <div className="space-y-6">
          {roles.map((r) => (
            <div key={r.id} className="border border-slate-200 rounded-xl p-6 break-inside-avoid shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 underline decoration-indigo-500 decoration-4 underline-offset-4">
                  {r.fecha}
                </h3>
                <span className="px-4 py-1 border-2 border-indigo-900 text-indigo-900 text-[10px] font-black rounded-full uppercase">
                  {r.grupo}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Maestro</p>
                  <p className="text-md font-bold text-indigo-900">{r.maestro}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Horario</p>
                  <p className="text-md font-bold text-slate-700">{r.servicio}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Lección del día</p>
                <p className="text-sm font-medium text-slate-800 italic">"{r.leccion}"</p>
              </div>
            </div>
          ))}
        </div>
        
        <footer className="mt-12 text-center text-[10px] text-slate-400 italic border-t pt-4">
          © 2026 Kids Ministry App - Registro de Clases Iglesia Emmanuel
        </footer>
      </div>

      {/* ==========================================
          VISTA DE LA APP (Glass Design / Pantalla)
          ========================================== */}
      <div className="print:hidden">
        {/* Header App */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-indigo-950 tracking-tighter uppercase italic">Rol de Maestros</h2>
            <p className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Iglesia Infantil Emmanuel</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={compartirWhatsApp}
              className="p-3 bg-green-500 text-white rounded-2xl shadow-lg active:scale-90 transition-all"
            >
              <Share2 size={22} />
            </button>
            <button 
              onClick={() => window.print()}
              className="p-3 bg-white text-indigo-600 border border-indigo-100 rounded-2xl shadow-sm active:scale-90 transition-all"
            >
              <Printer size={22} />
            </button>
          </div>
        </div>

        {/* Lista de Cards */}
        <div className="flex flex-col gap-6">
          {roles.length === 0 ? (
            <div className="glass-card rounded-[2rem] p-10 text-center">
              <BookOpen className="mx-auto text-indigo-200 mb-4" size={48} />
              <p className="text-indigo-900/40 font-bold italic">No hay clases programadas</p>
            </div>
          ) : (
            roles.map((r) => (
              <div key={r.id} className="glass-card rounded-[2.5rem] p-6 relative overflow-hidden group">
                {/* Badge de Grupo */}
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-5 py-1.5 rounded-bl-3xl uppercase tracking-tighter">
                  {r.grupo}
                </div>

                <div className="flex items-center gap-2 text-indigo-700 font-black mb-3">
                  <Calendar size={18} className="text-indigo-500" />
                  <span className="text-lg">{r.fecha}</span>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <User size={16} className="text-slate-400" />
                    <span className="text-sm font-bold">{r.maestro}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-xs font-semibold">{r.servicio}</span>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/50">
                  <p className="text-[9px] font-black text-indigo-400 uppercase mb-1">Lección:</p>
                  <p className="text-sm font-bold text-indigo-950 italic leading-tight">
                    {r.leccion}
                  </p>
                </div>

                {/* Botón Borrar */}
                <button 
                  onClick={() => borrar(r.id)}
                  className="absolute bottom-6 right-6 p-2 text-red-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}