import React from 'react';
import { Database } from 'lucide-react';
import { Student } from '../types';

interface SampleDataButtonProps {
  onLoadSampleData: (students: Student[]) => void;
}

const SampleDataButton: React.FC<SampleDataButtonProps> = ({ onLoadSampleData }) => {
  const generateSampleData = () => {
    const sampleStudents: Student[] = [
      {
        id: '1',
        nama: 'Ahmad Fauzi',
        kelas: '10 IPA 1',
        kehadiran: 95,
        prestasi: 88,
        perilaku: 90,
        tugasSelesai: 92
      },
      {
        id: '2',
        nama: 'Siti Nurhaliza',
        kelas: '10 IPA 1',
        kehadiran: 85,
        prestasi: 78,
        perilaku: 82,
        tugasSelesai: 80
      },
      {
        id: '3',
        nama: 'Budi Santoso',
        kelas: '10 IPA 2',
        kehadiran: 60,
        prestasi: 55,
        perilaku: 58,
        tugasSelesai: 52
      },
      {
        id: '4',
        nama: 'Dewi Lestari',
        kelas: '10 IPA 2',
        kehadiran: 92,
        prestasi: 85,
        perilaku: 88,
        tugasSelesai: 90
      },
      {
        id: '5',
        nama: 'Eko Prasetyo',
        kelas: '10 IPS 1',
        kehadiran: 45,
        prestasi: 42,
        perilaku: 48,
        tugasSelesai: 40
      },
      {
        id: '6',
        nama: 'Fitri Handayani',
        kelas: '10 IPS 1',
        kehadiran: 88,
        prestasi: 82,
        perilaku: 85,
        tugasSelesai: 87
      },
      {
        id: '7',
        nama: 'Gunawan Wijaya',
        kelas: '10 IPS 2',
        kehadiran: 55,
        prestasi: 50,
        perilaku: 52,
        tugasSelesai: 48
      },
      {
        id: '8',
        nama: 'Hana Pertiwi',
        kelas: '10 IPS 2',
        kehadiran: 90,
        prestasi: 86,
        perilaku: 89,
        tugasSelesai: 91
      },
      {
        id: '9',
        nama: 'Irfan Hakim',
        kelas: '11 IPA 1',
        kehadiran: 65,
        prestasi: 60,
        perilaku: 62,
        tugasSelesai: 58
      },
      {
        id: '10',
        nama: 'Julia Rahman',
        kelas: '11 IPA 1',
        kehadiran: 93,
        prestasi: 89,
        perilaku: 91,
        tugasSelesai: 94
      },
      {
        id: '11',
        nama: 'Kevin Susanto',
        kelas: '11 IPA 2',
        kehadiran: 50,
        prestasi: 45,
        perilaku: 47,
        tugasSelesai: 43
      },
      {
        id: '12',
        nama: 'Linda Kusuma',
        kelas: '11 IPA 2',
        kehadiran: 87,
        prestasi: 83,
        perilaku: 86,
        tugasSelesai: 88
      }
    ];

    onLoadSampleData(sampleStudents);
  };

  return (
    <button
      onClick={generateSampleData}
      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
    >
      <Database className="w-5 h-5" />
      Muat Data Contoh
    </button>
  );
};

export default SampleDataButton;
