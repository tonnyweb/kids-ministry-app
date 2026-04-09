import React, { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { Calendar, Clock, User, Users, Share2, Printer, Trash2, BookOpen } from 'lucide-react';

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
    let mensaje = "📋 - *ROL KIDS MINISTRY*\n\n";
    roles.forEach((r) => {
      mensaje += `🗓-*${r.fecha}*\n👤 ${r.maestro}\n⏰ ${r.servicio} | 🏫 ${r.grupo}\n📖 ${r.leccion}\n----------\n`;
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
            <h1 className="text-2xl font-black text-indigo-900 tracking-tighter">Rol de Maestros</h1>
            <p className="text-sm font-bold text-slate-500 uppercase">IGLESIA INFANTIL EMMANUEL</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400 uppercase">Generado por</p>
            <p className="text-sm font-black text-indigo-900 ">Kids Ministry</p>
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
        
        {/* Header App Mejorado para APK */}
        <div className="flex flex-row justify-between items-start mb-8 gap-2 w-full">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-2xl font-black text-indigo-950 tracking-tighter flex items-center gap-2 whitespace-nowrap overflow-hidden">
              <Calendar className="text-indigo-600 shrink-0" size={20} /> 
              <span className="truncate">Rol de Maestros</span>
            </h2>
            <p className="text-[10px] font-bold text-indigo-400 tracking-widest mt-0.5 pl-7">
              Iglesia Infantil Emmanuel
            </p>
          </div>

          </div>
<div className="flex justify-center gap-2 shrink-0 mt-2 mb-2">
     <button 
  onClick={compartirWhatsApp}
  /* Cambié rounded-full por rounded-xl para que sea un rectángulo elegante */
  /* Añadí w-64 para hacerlo largo y gap-2 para separar icono de texto */
  className="flex justify-center items-center gap-2 w-30 p-3 bg-green-500 text-white rounded-full shadow-lg active:scale-90 transition-all"
  title="Compartir por WhatsApp"
>
  {/* Icono de WhatsApp en formato SVG para que sea el oficial */}
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>

  <span className="text-xs font-medium">WhatsApp</span>
</button>
            <button 
              onClick={() => window.print()}
              className="flex justify-center w-20 p-2.5 bg-white text-indigo-600 border border-indigo-100 rounded-full shadow-sm active:scale-90 transition-all"
              title="Imprimir Rol"
            >
              <Printer size={20} />
            </button>
          </div>
        {/* Lista de Cards */}
        <div className="flex flex-col gap-6">
          {roles.length === 0 ? (
            <div className="glass-card rounded-[2rem] p-10 text-center">
              <BookOpen className="mx-auto text-indigo-200 mb-4" size={48} />
              <p className="text-indigo-900/40 font-bold">No hay clases programadas</p>
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