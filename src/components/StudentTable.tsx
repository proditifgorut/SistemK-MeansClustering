import React from 'react';
import { Trash2, Users } from 'lucide-react';
import { Student } from '../types';
import { motion } from 'framer-motion';

interface StudentTableProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onDeleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Belum ada data siswa</p>
        <p className="text-gray-400 text-sm mt-2">Tambahkan data siswa untuk memulai clustering</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Data Siswa ({students.length})
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kelas</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kehadiran</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prestasi</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Perilaku</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tugas</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.kelas}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.kehadiran}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.prestasi}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.perilaku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.tugasSelesai}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onDeleteStudent(student.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Hapus siswa"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
