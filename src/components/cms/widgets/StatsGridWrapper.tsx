import React from 'react'
import { UserCountWidget } from './UserCountWidget'
import { BlogCountWidget } from './BlogCountWidget'
import { TeamCountWidget } from './TeamCountWidget'
import { TestimonialsCountWidget } from './TestimonialsCountWidget'

export const StatsGridWrapper = () => {
  return (
    // 🚀 Flexbox container
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        width: '100%',
        // marginBottom: '24px',
      }}
    >
      {/* 🚀 Har card ko 'flex: 1 1 200px' dena zaroori hai. 
          Iska matlab hai: 
          - flex-grow: 1 (extra space bharne ke liye badho)
          - flex-shrink: 1 (jagah kam hone par sikudo)
          - flex-basis: 200px (ideal starting width)
      */}
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <UserCountWidget />
      </div>
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <BlogCountWidget />
      </div>
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <TeamCountWidget />
      </div>
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <TestimonialsCountWidget />
      </div>
    </div>
  )
}
