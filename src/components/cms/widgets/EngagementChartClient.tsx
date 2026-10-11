'use client'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const PIE_COLORS = ['#22C55E', '#3B82F6', '#F472B6']

export const EngagementChartClient = ({ engagementData }: { engagementData: any[] }) => {
  const pieData = engagementData.map((entry, index) => ({
    ...entry,
    fill: PIE_COLORS[index % PIE_COLORS.length],
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Legend iconType="circle" />
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
