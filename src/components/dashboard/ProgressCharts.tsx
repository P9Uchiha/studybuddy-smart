
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProgressData {
  name: string;
  hours: number;
  percentage: number;
}

interface ProgressChartsProps {
  data: ProgressData[];
  showDetails?: boolean;
}

const COLORS = ['#9b87f5', '#7E69AB', '#553C9A', '#B794F4', '#D3E4FD'];

export default function ProgressCharts({ data, showDetails = false }: ProgressChartsProps) {
  // Prepare data for pie chart
  const pieData = data.map(item => ({
    name: item.name,
    value: item.hours
  }));

  // For simplified tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md border rounded">
          <p className="text-sm font-semibold">{`${payload[0].name}`}</p>
          <p className="text-sm">{`${payload[0].value} hours`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      {showDetails ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Hours Distribution */}
          <div className="flex flex-col">
            <h3 className="text-center text-sm font-medium mb-2">Study Hours Distribution</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Progress by Subject */}
          <div className="flex flex-col">
            <h3 className="text-center text-sm font-medium mb-2">Subject Progress</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#9b87f5" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Detailed Stats */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-medium mb-3">Subject Details</h3>
            <div className="space-y-4">
              {data.map((subject, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-sm text-study-neutral-400">{subject.hours} hours</span>
                  </div>
                  <div className="w-full h-2 bg-study-neutral-100 rounded-full">
                    <div 
                      className="h-full bg-study-purple-300 rounded-full" 
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-study-neutral-400">
                    <span>Progress: {subject.percentage}%</span>
                    <span>Target: 100%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
