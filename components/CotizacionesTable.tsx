"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { deleteCotizacion } from '../app/cotizaciones/actions';
import { useRouter } from 'next/navigation';

export default function CotizacionesTable({ cotizaciones }: { cotizaciones: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const filtered = cotizaciones.filter((cot) => {
    const term = searchTerm.toLowerCase();
    return (
      cot.folio?.toLowerCase().includes(term) ||
      cot.cliente_nombre?.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id: string, folio: string) => {
    const confirm1 = window.confirm(`¿Estás seguro de que deseas eliminar la cotización ${folio}?`);
    if (!confirm1) return;

    const confirm2 = window.confirm(`⚠️ ESTA ACCIÓN ES IRREVERSIBLE. ¿Estás TOTALMENTE SEGURO de querer eliminar esta cotización?`);
    if (!confirm2) return;

    setIsDeleting(id);
    try {
      const result = await deleteCotizacion(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(`Error al eliminar: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error inesperado al intentar eliminar la cotización.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-800 bg-slate-950">
        <input
          type="text"
          placeholder="Buscar por folio o cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#004d99]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-300 text-sm border-b border-slate-800">
              <th className="p-4 font-bold">Folio</th>
              <th className="p-4 font-bold">Fecha</th>
              <th className="p-4 font-bold">Cliente</th>
              <th className="p-4 font-bold hidden md:table-cell">Total</th>
              <th className="p-4 font-bold text-center hidden lg:table-cell">Partidas</th>
              <th className="p-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No se encontraron cotizaciones.
                </td>
              </tr>
            ) : (
              filtered.map((cot: any) => (
                <tr key={cot.id} className="border-b border-slate-800 hover:bg-slate-950 transition-colors group">
                  <td className="p-4 font-medium text-slate-100">{cot.folio}</td>
                  <td className="p-4 text-slate-300">{cot.fecha}</td>
                  <td className="p-4 text-slate-300">
                    {cot.cliente_nombre || <span className="text-slate-500 italic">Sin Cliente</span>}
                  </td>
                  <td className="p-4 font-bold text-emerald-500 hidden md:table-cell">
                    {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cot.total)}
                  </td>
                  <td className="p-4 text-center hidden lg:table-cell">
                    <details className="cursor-pointer relative">
                      <summary className="text-[#2bb8e4] hover:text-[#1c98bf] font-semibold text-xs outline-none">
                        Ver Detalle ({cot.partidas?.length || 0})
                      </summary>
                      <div className="mt-2 text-left bg-slate-950 p-3 rounded-lg text-xs border border-slate-800 absolute right-0 w-64 shadow-2xl z-10 text-slate-200">
                        <p className="font-bold border-b border-slate-800 pb-1 mb-2 text-[#004d99]">Artículos Cotizados:</p>
                        <ul className="space-y-2">
                          {cot.partidas?.map((p: any, i: number) => (
                            <li key={i} className="flex justify-between border-b border-slate-800/50 pb-1">
                              <span className="truncate w-32" title={p.desc}>{p.cant}x {p.desc || 'Sin descripción'}</span>
                              <span className="font-semibold text-emerald-400">${(p.unit * p.cant).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/cotizaciones/edit/${cot.id}`}
                        className="inline-block px-4 py-2 bg-[#004d99] text-white text-xs font-bold rounded shadow-sm hover:bg-blue-800 transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(cot.id, cot.folio)}
                        disabled={isDeleting === cot.id}
                        className={`p-2 rounded bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors shadow-sm ${isDeleting === cot.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Eliminar Cotización"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
