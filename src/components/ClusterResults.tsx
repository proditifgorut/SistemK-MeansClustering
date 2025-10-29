import React from 'react';
import { Student, ClusterStats } from '../types';
import { getClusterLabel, getClusterColor } from '../utils/kmeans';
import { TrendingUp, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClusterResultsProps {
  students: Student[];
  iterations: number;
}

const ClusterResults: React.FC<ClusterResultsProps> = ({ students, iterations }) => {
  const calculateStats = (): ClusterStats[] => {
    const clusters = new Map<number, Student[]>();
    
    students.forEach(student => {
      const cluster = student.cluster ?? 0;
      if (!clusters.has(cluster)) {
        clusters.set(cluster, []);
      }
      clusters.get(cluster)!.push(student);
    });

    const stats: ClusterStats[] = [];
    clusters.forEach((clusterStudents, cluster) => {
      const rataKehadiran = clusterStudents.reduce((sum, s) => sum + s.kehadiran, 0) / clusterStudents.length;
      const rataPrestasi = clusterStudents.reduce((sum, s) => sum + s.prestasi, 0) / clusterStudents.length;
      const rataPerilaku = clusterStudents.reduce((sum, s) => sum + s.perilaku, 0) / clusterStudents.length;
      const rataTugas = clusterStudents.reduce((sum, s) => sum + s.tugasSelesai, 0) / clusterStudents.length;

      const statData = {
        cluster,
        jumlahSiswa: clusterStudents.length,
        rataKehadiran,
        rataPrestasi,
        rataPerilaku,
        rataTugas,
        label: '',
        warna: getClusterColor(cluster)
      };

      statData.label = getClusterLabel(cluster, statData);
      stats.push(statData);
    });

    return stats.sort((a, b) => b.cluster - a.cluster);
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Hasil Clustering</h3>
            <p className="text-sm text-gray-500">Konvergen dalam {iterations} iterasi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.cluster}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl p-5 hover:shadow-lg transition-shadow"
              style={{ borderColor: stat.warna }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: stat.warna }}
                  ></div>
                  <h4 className="font-bold text-gray-800">Cluster {stat.cluster + 1}</h4>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">{stat.jumlahSiswa}</span>
                </div>
              </div>

              <div className="mb-4">
                <div 
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: stat.warna }}
                >
                  <Award className="w-4 h-4" />
                  {stat.label}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kehadiran:</span>
                  <span className="font-semibold text-gray-800">{stat.rataKehadiran.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prestasi:</span>
                  <span className="font-semibold text-gray-800">{stat.rataPrestasi.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Perilaku:</span>
                  <span className="font-semibold text-gray-800">{stat.rataPerilaku.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tugas:</span>
                  <span className="font-semibold text-gray-800">{stat.rataTugas.toFixed(1)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Detail Siswa per Cluster</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cluster</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kehadiran</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Prestasi</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Perilaku</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students
                .sort((a, b) => (a.cluster ?? 0) - (b.cluster ?? 0))
                .map((student) => {
                  const clusterColor = getClusterColor(student.cluster ?? 0);
                  return (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: clusterColor }}
                          ></div>
                          <span className="text-sm font-semibold text-gray-700">
                            {(student.cluster ?? 0) + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student.kelas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student.kehadiran}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student.prestasi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student.perilaku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student.tugasSelesai}%
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClusterResults;
