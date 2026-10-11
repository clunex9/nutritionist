import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GrowthChartClient } from './GrowthChartClient'

export const GrowthWidget = async () => {
  const payload = await getPayload({ config: configPromise })

  const growthData = []
  const today = new Date()

  for (let i = 5; i >= 0; i--) {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59)
    const monthName = startOfMonth.toLocaleString('default', { month: 'short' })

    const mUsers = await payload.count({
      collection: 'users',
      where: {
        createdAt: {
          greater_than_equal: startOfMonth.toISOString(),
          less_than_equal: endOfMonth.toISOString(),
        },
      },
    })
    const mBlogs = await payload.count({
      collection: 'blogs',
      where: {
        createdAt: {
          greater_than_equal: startOfMonth.toISOString(),
          less_than_equal: endOfMonth.toISOString(),
        },
      },
    })

    growthData.push({ month: monthName, Users: mUsers.totalDocs, Blogs: mBlogs.totalDocs })
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--theme-elevation-50)',
        padding: '16px',
        borderRadius: '4px',
        border: '1px solid var(--theme-elevation-150)',
        width: '100%',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 500 }}>
        Growth Activity (Last 6 Months)
      </h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        <GrowthChartClient growthData={growthData} />
      </div>
    </div>
  )
}
