export interface Student {
  id: string;
  nama: string;
  kelas: string;
  kehadiran: number;
  prestasi: number;
  perilaku: number;
  tugasSelesai: number;
  cluster?: number;
}

export interface ClusterResult {
  students: Student[];
  centroids: number[][];
  iterations: number;
  clusters: number;
}

export interface ClusterStats {
  cluster: number;
  jumlahSiswa: number;
  rataKehadiran: number;
  rataPrestasi: number;
  rataPerilaku: number;
  rataTugas: number;
  label: string;
  warna: string;
}
