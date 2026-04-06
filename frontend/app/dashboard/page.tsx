'use client'
import { useState } from 'react'
import SkillGraph from '@/components/dashboard/SkillGraph'
import CareerPrediction from '@/components/dashboard/CareerPrediction'
import JobMatches from '@/components/dashboard/JobMatches'
import ProgressTracker from '@/components/dashboard/ProgressTracker'
import DashboardNav from '@/components/dashboard/DashboardNav'

const TABS = ['SKILL_GRAPH', 'CAREER_PREDICT', 'JOB_MATCHES', 'PROGRESS'] as const
type Tab = typeof TABS[number]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('SKILL_GRAPH')

  return (
    <div className="min-h-screen bg-terminal-bg font-mono flex flex-col">
      <DashboardNav />

      {/* Tab Bar */}
      <div className="border-b border-terminal-green/20 flex overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-xs tracking-widest whitespace-nowrap border-r border-terminal-green/10 transition-colors ${
              activeTab === tab
                ? 'bg-terminal-green/10 text-terminal-green border-b-2 border-b-terminal-green'
                : 'text-terminal-green/40 hover:text-terminal-green/70 hover:bg-terminal-green/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pane Content */}
      <div className="flex-1 p-6">
        {activeTab === 'SKILL_GRAPH' && <SkillGraph />}
        {activeTab === 'CAREER_PREDICT' && <CareerPrediction />}
        {activeTab === 'JOB_MATCHES' && <JobMatches />}
        {activeTab === 'PROGRESS' && <ProgressTracker />}
      </div>
    </div>
  )
}
