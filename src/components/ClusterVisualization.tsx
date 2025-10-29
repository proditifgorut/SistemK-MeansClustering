import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Student } from '../types';
import { getClusterColor } from '../utils/kmeans';
import { BarChart3 } from 'lucide-react';

interface ClusterVisualizationProps {
  students: Student[];
}

const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({ students }) => {
  const getScatterOption = () => {
    const clusters = new Map<number, Student[]>();
    students.forEach(student => {
      const cluster = student.cluster ?? 0;
      if (!clusters.has(cluster)) {
        clusters.set(cluster, []);
      }
      clusters.get(cluster)!.push(student);
    });

    const series = Array.from(clusters.entries()).map(([cluster, clusterStudents]) => ({
      name: `Cluster ${cluster + 1}`,
      type: 'scatter',
      symbolSize: 12,
      data: clusterStudents.map(s => [s.kehadiran, s.prestasi, s.nama, s.perilaku, s.tugasSelesai]),
      itemStyle: {
        color: getClusterColor(cluster)
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: getClusterColor(cluster),
          borderWidth: 2,
          borderColor: '#fff'
        }
      }
    }));

    return {
      title: {
        text: 'Visualisasi Cluster (Kehadiran vs Prestasi)',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const data = params.data;
          return `<strong>${data[2]}</strong><br/>
                  Kehadiran: ${data[0]}%<br/>
                  Prestasi: ${data[1]}<br/>
                  Perilaku: ${data[3]}<br/>
                  Tugas: ${data[4]}%`;
        }
      },
      legend: {
        bottom: 10,
        left: 'center'
      },
      grid: {
        left: '10%',
        right: '5%',
        top: '15%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        name: 'Kehadiran (%)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 100,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        name: 'Prestasi',
        nameLocation: 'middle',
        nameGap: 40,
        min: 0,
        max: 100,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series
    };
  };

  const getBarOption = () => {
    const clusters = new Map<number, Student[]>();
    students.forEach(student => {
      const cluster = student.cluster ?? 0;
      if (!clusters.has(cluster)) {
        clusters.set(cluster, []);
      }
      clusters.get(cluster)!.push(student);
    });

    const categories = Array.from(clusters.keys()).map(c => `Cluster ${c + 1}`);
    const data = Array.from(clusters.entries()).map(([cluster, clusterStudents]) => {
      const avg = clusterStudents.reduce((sum, s) => 
        sum + (s.kehadiran + s.prestasi + s.perilaku + s.tugasSelesai) / 4, 0
      ) / clusterStudents.length;
      return {
        value: avg.toFixed(1),
        itemStyle: {
          color: getClusterColor(cluster)
        }
      };
    });

    return {
      title: {
        text: 'Rata-rata Skor per Cluster',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          return `${params[0].name}<br/>Rata-rata: ${params[0].value}`;
        }
      },
      grid: {
        left: '10%',
        right: '5%',
        top: '15%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          fontWeight: 'bold'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Skor',
        min: 0,
        max: 100
      },
      series: [{
        type: 'bar',
        data,
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          fontWeight: 'bold'
        }
      }]
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <BarChart3 className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Visualisasi Data</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ReactECharts option={getScatterOption()} style={{ height: '400px' }} />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <ReactECharts option={getBarOption()} style={{ height: '300px' }} />
        </div>
      </div>
    </div>
  );
};

export default ClusterVisualization;
