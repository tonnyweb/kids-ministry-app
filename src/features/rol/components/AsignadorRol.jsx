import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, UserCheck, Save, BookOpen, Trash2, UserPlus } from 'lucide-react';
import { supabase } from '../../../utils/supabaseClient';

const GRUPOS = ["Cuneros", "Párvulos", "Primarios", "Intermedios", "Jóvenes"];
const SERVICIOS = ["Domingo Mañana", "Domingo Tarde", "Entre Semana", "Servicio Especial"];

export default function AsignadorRol() {
  const [listaMaestros, setListaMaestros] = useState([]);
  const [nuevoMaestro, setNuevoMaestro] = useState('');
  const [registro, setRegistro] = useState({
    fecha: '', servicio: '', grupo: '', maestro: '', leccion: ''
  });

  // 1. Cargar la lista de maestros
  const cargarMaestros = async () => {
    const { data, error } = await supabase
      .from('maestros')
      .select('nombre')
      .order('nombre');
    if (data) setListaMaestros(data);
    if (error) console.error("Error cargando maestros:", error.message);
  };

  useEffect(() => {
    cargarMaestros();
  }, []);

  // 2. Agregar nuevo maestro
  const agregarMaestro = async () => {
    if (!nuevoMaestro.trim()) return;
    const { error } = await supabase.from('maestros').insert([{ nombre: nuevoMaestro }]);
    
    if (error) {
      alert("Error: " + error.message);
    } else {
      setNuevoMaestro('');
      cargarMaestros(); 
    }
  };

  // 3. Borrar un maestro
  const borrarMaestro = async (nombre) => {
    if (confirm(`¿Eliminar a ${nombre} de la lista de maestros?`)) {
      const { error } = await supabase
        .from('maestros')
        .delete()
        .eq('nombre', nombre);

      if (error) alert("Error al borrar: " + error.message);
      else cargarMaestros();
    }
  };

  // 4. Guardar la asignación de clase
  const guardarAsignacion = async (e) => {
    e.preventDefault();
    if (!registro.grupo || !registro.maestro) {
      alert("Por favor selecciona un grupo y un maestro");
      return;
    }

    const { error } = await supabase.from('roles').insert([registro]);
    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Clase asignada con éxito!");
      setRegistro({ fecha: '', servicio: '', grupo: '', maestro: '', leccion: '' });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto pb-24 min-h-screen bg-gray-50">
      <header className="mb-6">
       <h2 className="text-lg sm:text-2xl font-black text-indigo-900 flex items-center gap-2 whitespace-nowrap overflow-hidden">
      <Users className="text-indigo-600 shrink-0" size={20} /> 
      <span className="truncate">Asignación de Roles</span>
      </h2>
        <p className="text-gray-500 text-sm font-bold">Iglesia Infantil Emmanuel</p>
      </header>

      {/* GESTIÓN DE MAESTROS */}
      <div className="glass-card rounded-2xl p-4 mb-8 border-dashed border-2 border-indigo-200 bg-white/50">
        <label className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-1">
          <UserPlus size={12} /> Gestión de Maestros
        </label>
        
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            className="flex-1 bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-indigo-500 text-gray-800"
            placeholder="Nombre del maestro..."
            value={nuevoMaestro}
            onChange={(e) => setNuevoMaestro(e.target.value)}
          />
         
        </div>
        <div className="flex gap-2 mb-4">
           <button 
            onClick={agregarMaestro}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            Añadir
          </button>
        </div>

        {/* Chips de maestros registrados */}
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
          {listaMaestros.map((m) => (
            <div key={m.nombre} className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              <span className="text-[11px] text-indigo-900 font-bold">{m.nombre}</span>
              <button onClick={() => borrarMaestro(m.nombre)} className="text-red-400 hover:text-red-600">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FORMULARIO DE ROL */}
      <form onSubmit={guardarAsignacion} className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 mb-2">
            <Calendar size={14} /> Fecha de Clase
          </label>
          <input type="date" className="w-full outline-none border-b border-indigo-50 focus:border-indigo-500 pb-1 text-gray-800 font-medium"
            value={registro.fecha} onChange={(e) => setRegistro({...registro, fecha: e.target.value})} required />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 mb-2">
            <Clock size={14} /> Horario / Servicio
          </label>
          <select className="w-full bg-transparent outline-none text-sm text-gray-800 font-medium"
            value={registro.servicio} onChange={(e) => setRegistro({...registro, servicio: e.target.value})} required>
            <option value="">Seleccionar...</option>
            {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 mb-2">
            <Users size={14} /> Grupo de Niños
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {GRUPOS.map(g => (
              <button key={g} type="button" onClick={() => setRegistro({...registro, grupo: g})}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${registro.grupo === g ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 mb-2">
            <UserCheck size={14} /> Seleccionar Maestro
          </label>
          <select className="w-full bg-transparent outline-none text-sm text-gray-800 font-bold"
            value={registro.maestro} onChange={(e) => setRegistro({...registro, maestro: e.target.value})} required>
            <option value="">¿Quién impartirá?</option>
            {listaMaestros.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
          </select>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 mb-2">
            <BookOpen size={14} /> Título de la Lección
          </label>
          <input type="text" placeholder="Ej: La creación, El arca..." className="w-full outline-none text-sm border-b border-indigo-50 text-gray-800 font-medium"
            value={registro.leccion} onChange={(e) => setRegistro({...registro, leccion: e.target.value})} required />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all flex justify-center items-center gap-3 mt-4 uppercase text-sm tracking-widest">
          <Save size={20} /> Guardar Asignación
        </button>
      </form>
    </div>
  );
}