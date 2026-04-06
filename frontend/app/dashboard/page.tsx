'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import SkillGraph from '@/components/dashboard/SkillGraph'
import CareerPrediction from '@/components/dashboard/CareerPrediction'
import JobMatches from '@/components/dashboard/JobMatches'
import ProgressTracker from '@/components/dashboard/ProgressTracker'

export default function DashboardPage() {
  const [activePane, setActivePane] = useState<'skills' | 'careers' | 'jobs' | 'progress'>('skills')

  return (
    <DashboardLayout activePane={activePane} setActivePane={setActivePane}>
      {activePane === 'skills' && <SkillGraph />}
      {activePane === 'careers' && <CareerPrediction />}
      {activePane === 'jobs' && <JobMatches />}
      {activePane === 'progress' && <ProgressTracker />}
    </DashboardLayout>
  )
}
