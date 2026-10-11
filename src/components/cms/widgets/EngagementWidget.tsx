import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { EngagementChartClient } from './EngagementChartClient'

export const EngagementWidget = async () => {
  const payload = await getPayload({ config: configPromise })

  const favoritesCount = await payload.count({ collection: 'favorites' })
  const bookmarksCount = await payload.count({ collection: 'bookmarks' })

  const engagementData = [
    { name: 'Favorites', value: favoritesCount.totalDocs },
    { name: 'Bookmarks', value: bookmarksCount.totalDocs },
  ]

  return (
    <div
      style={{
        backgroundColor: 'var(--theme-elevation-50)',
        padding: '16px',
        borderRadius: '4px',
        border: '1px solid var(--theme-elevation-150)',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 500 }}>
        Engagement Metrics
      </h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        <EngagementChartClient engagementData={engagementData} />
      </div>
    </div>
  )
}
