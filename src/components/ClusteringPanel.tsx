import React, { useState } from 'react';
import { Play, Settings } from 'lucide-react';
import { Student } from '../types';

interface ClusteringPanelProps {
  students: Student[];
  onRunClustering: (k: number) => void;
  isProcessing: boolean;
}

const ClusteringPanel: React.FC<ClusteringPanelProps> = ({ 
  students, 
  onRunClustering,
  isProcessing 
}) => {
  const [k, setK] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunClustering(k);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Settings className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Konfigurasi Clustering</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Cluster (K)
          </label>
          <input
            type="number"
            min="2"
            max="5"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-lg font-semibold"
          />
          <p className="text-sm text-gray-500 mt-2">
            Pilih jumlah kelompok yang ingin dibentuk (2-5)
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Informasi:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Total siswa: <strong>{students.length}</strong></li>
            <li>• Jumlah cluster: <strong>{k}</strong></li>
            <li>• Algoritma: <strong>K-Means Clustering</strong></li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={students.length < k || isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Memproses...
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              Jalankan Clustering
            </>
          )}
        </button>

        {students.length < k && students.length > 0 && (
          <p className="text-sm text-red-600 text-center">
            Jumlah siswa harus minimal sama dengan jumlah cluster
          </p>
        )}
      </form>
    </div>
  );
};

export default ClusteringPanel;
