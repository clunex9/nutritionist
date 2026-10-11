import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const UserCountWidget = async () => {
  const payload = await getPayload({ config: configPromise })
  const usersCount = await payload.count({ collection: 'users' })

  return (
    <div
      style={{
        backgroundColor: 'var(--theme-elevation-50)',
        padding: '16px',
        paddingBottom: '24px',
        borderRadius: '4px',
        border: '1px solid var(--theme-elevation-150)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: '14px',
          color: 'var(--theme-elevation-500)',
          fontWeight: 500,
        }}
      >
        Total Users
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '32px',
          color: 'var(--theme-elevation-800)',
          fontWeight: 700,
        }}
      >
        {usersCount.totalDocs}
      </p>
    </div>
  )
}
