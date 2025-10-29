import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Student } from '../types';

interface StudentFormProps {
  onAddStudent: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onAddStudent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    kehadiran: 80,
    prestasi: 75,
    perilaku: 80,
    tugasSelesai: 85
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent: Student = {
      id: Date.now().toString(),
      ...formData
    };

    onAddStudent(newStudent);
    setFormData({
      nama: '',
      kelas: '',
      kehadiran: 80,
      prestasi: 75,
      perilaku: 80,
      tugasSelesai: 85
    });
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nama' || name === 'kelas' ? value : Number(value)
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Data Siswa
        </button>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Tambah Data Siswa</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Siswa
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama siswa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kelas
                </label>
                <input
                  type="text"
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: 10 IPA 1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkat Kehadiran: {formData.kehadiran}%
                </label>
                <input
                  type="range"
                  name="kehadiran"
                  min="0"
                  max="100"
                  value={formData.kehadiran}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkat Prestasi: {formData.prestasi}
                </label>
                <input
                  type="range"
                  name="prestasi"
                  min="0"
                  max="100"
                  value={formData.prestasi}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkat Perilaku: {formData.perilaku}
                </label>
                <input
                  type="range"
                  name="perilaku"
                  min="0"
                  max="100"
                  value={formData.perilaku}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tugas Selesai: {formData.tugasSelesai}%
                </label>
                <input
                  type="range"
                  name="tugasSelesai"
                  min="0"
                  max="100"
                  value={formData.tugasSelesai}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Tambah Siswa
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
