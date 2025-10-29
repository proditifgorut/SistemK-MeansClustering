import { Student } from '../types';

export class KMeans {
  private k: number;
  private maxIterations: number;
  private centroids: number[][] = [];

  constructor(k: number, maxIterations: number = 100) {
    this.k = k;
    this.maxIterations = maxIterations;
  }

  private normalizeData(data: number[][]): { normalized: number[][], min: number[], max: number[] } {
    const features = data[0].length;
    const min = new Array(features).fill(Infinity);
    const max = new Array(features).fill(-Infinity);

    for (const point of data) {
      for (let i = 0; i < features; i++) {
        if (point[i] < min[i]) min[i] = point[i];
        if (point[i] > max[i]) max[i] = point[i];
      }
    }

    const normalized = data.map(point =>
      point.map((val, i) => {
        const range = max[i] - min[i];
        return range === 0 ? 0 : (val - min[i]) / range;
      })
    );

    return { normalized, min, max };
  }

  private euclideanDistance(point1: number[], point2: number[]): number {
    return Math.sqrt(
      point1.reduce((sum, val, i) => sum + Math.pow(val - point2[i], 2), 0)
    );
  }

  private initializeCentroids(data: number[][]): void {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    this.centroids = shuffled.slice(0, this.k);
  }

  private assignClusters(data: number[][]): number[] {
    return data.map(point => {
      const distances = this.centroids.map(centroid =>
        this.euclideanDistance(point, centroid)
      );
      return distances.indexOf(Math.min(...distances));
    });
  }

  private updateCentroids(data: number[][], assignments: number[]): boolean {
    const newCentroids: number[][] = [];
    let hasChanged = false;

    for (let i = 0; i < this.k; i++) {
      const clusterPoints = data.filter((_, idx) => assignments[idx] === i);
      
      if (clusterPoints.length === 0) {
        newCentroids.push(this.centroids[i]);
        continue;
      }

      const features = data[0].length;
      const newCentroid = new Array(features).fill(0);

      for (const point of clusterPoints) {
        for (let j = 0; j < features; j++) {
          newCentroid[j] += point[j];
        }
      }

      for (let j = 0; j < features; j++) {
        newCentroid[j] /= clusterPoints.length;
      }

      if (!this.centroids[i] || 
          this.euclideanDistance(newCentroid, this.centroids[i]) > 0.0001) {
        hasChanged = true;
      }

      newCentroids.push(newCentroid);
    }

    this.centroids = newCentroids;
    return hasChanged;
  }

  fit(students: Student[]): { students: Student[], centroids: number[][], iterations: number } {
    const data = students.map(s => [
      s.kehadiran,
      s.prestasi,
      s.perilaku,
      s.tugasSelesai
    ]);

    const { normalized } = this.normalizeData(data);
    this.initializeCentroids(normalized);

    let iterations = 0;
    let hasChanged = true;

    while (hasChanged && iterations < this.maxIterations) {
      const assignments = this.assignClusters(normalized);
      hasChanged = this.updateCentroids(normalized, assignments);
      iterations++;

      if (iterations === this.maxIterations - 1) {
        const finalAssignments = this.assignClusters(normalized);
        const clusteredStudents = students.map((student, idx) => ({
          ...student,
          cluster: finalAssignments[idx]
        }));
        return { students: clusteredStudents, centroids: this.centroids, iterations };
      }
    }

    const finalAssignments = this.assignClusters(normalized);
    const clusteredStudents = students.map((student, idx) => ({
      ...student,
      cluster: finalAssignments[idx]
    }));

    return { students: clusteredStudents, centroids: this.centroids, iterations };
  }
}

export const getClusterLabel = (cluster: number, stats: any): string => {
  const avgScore = (stats.rataKehadiran + stats.rataPrestasi + stats.rataPerilaku + stats.rataTugas) / 4;
  
  if (avgScore >= 75) {
    return 'Siswa Berprestasi';
  } else if (avgScore >= 50) {
    return 'Siswa Perlu Bimbingan';
  } else {
    return 'Siswa Bermasalah';
  }
};

export const getClusterColor = (cluster: number): string => {
  const colors = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  return colors[cluster % colors.length];
};
