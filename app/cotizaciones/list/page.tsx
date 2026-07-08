import React from 'react';
import { getCotizaciones, getUserRole } from '../actions';
import Link from 'next/link';
import CotizacionesTable from '@/components/CotizacionesTable';

export default async function CotizacionesListPage() {
  const cotizaciones = await getCotizaciones();
  const role = await getUserRole();

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-950 text-slate-100 font-sans">
      <main className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
          <div>
            <h1 className="text-2xl font-black text-[#004d99]">Base de Datos de Cotizaciones</h1>
            <p className="text-sm text-slate-500 mt-1">
              Tu rol actual es: <span className="font-bold text-slate-200 uppercase">{role || 'No autenticado'}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Ocultamos el botón de crear si es reportero */}
            {role !== 'reportero' && (
              <Link 
                href="/cotizaciones"
                className="px-6 py-2 bg-[#004d99] text-white font-bold rounded-lg shadow hover:-translate-y-0.5 transition-all text-sm"
              >
                Nueva Cotización
              </Link>
            )}
          </div>
        </div>

        <CotizacionesTable cotizaciones={cotizaciones} />
      </main>
    </div>
  );
}
