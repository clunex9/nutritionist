'use client'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const GrowthChartClient = ({ growthData }: { growthData: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={growthData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="var(--theme-elevation-200)"
          opacity={0.5}
        />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          dx={-10}
          allowDecimals={false}
        />
        <Tooltip />
        <Legend iconType="circle" />
        <Area
          type="monotone"
          dataKey="Users"
          stroke="#3B82F6"
          fill="url(#colorUsers)"
          strokeWidth={3}
        />
        <Area
          type="monotone"
          dataKey="Blogs"
          stroke="#22C55E"
          fill="url(#colorBlogs)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
