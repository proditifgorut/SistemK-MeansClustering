import React, { useState } from 'react';
import { Student, ClusterResult } from './types';
import { KMeans } from './utils/kmeans';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import ClusteringPanel from './components/ClusteringPanel';
import ClusterResults from './components/ClusterResults';
import ClusterVisualization from './components/ClusterVisualization';
import SampleDataButton from './components/SampleDataButton';
import { motion } from 'framer-motion';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [clusterResult, setClusterResult] = useState<ClusterResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
    setClusterResult(null);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setClusterResult(null);
  };

  const handleLoadSampleData = (sampleStudents: Student[]) => {
    setStudents(sampleStudents);
    setClusterResult(null);
  };

  const handleRunClustering = (k: number) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const kmeans = new KMeans(k, 100);
      const result = kmeans.fit(students);
      
      setClusterResult({
        students: result.students,
        centroids: result.centroids,
        iterations: result.iterations,
        clusters: k
      });
      
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Tentang Sistem
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sistem ini menggunakan algoritma <strong>K-Means Clustering</strong> untuk mengelompokkan siswa berdasarkan 
              empat indikator: <strong>Kehadiran</strong>, <strong>Prestasi</strong>, <strong>Perilaku</strong>, dan <strong>Penyelesaian Tugas</strong>. 
              Hasil clustering membantu mengidentifikasi kelompok siswa yang memerlukan perhatian khusus.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <StudentForm onAddStudent={handleAddStudent} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ClusteringPanel 
              students={students} 
              onRunClustering={handleRunClustering}
              isProcessing={isProcessing}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          {students.length === 0 && (
            <div className="flex justify-center">
              <SampleDataButton onLoadSampleData={handleLoadSampleData} />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <StudentTable students={students} onDeleteStudent={handleDeleteStudent} />
        </motion.div>

        {clusterResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <ClusterResults 
              students={clusterResult.students} 
              iterations={clusterResult.iterations}
            />
            
            <ClusterVisualization students={clusterResult.students} />
          </motion.div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© 2025 Sistem K-Means Clustering. Implementasi algoritma untuk pengelompokan siswa bermasalah.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
