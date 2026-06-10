import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function StatsCard({ title, value, change, changeType, icon: Icon }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        {change && (
          <span className={`flex items-center gap-1 text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-secondary-900 mb-1">{value}</h3>
      <p className="text-sm text-secondary-600">{title}</p>
    </div>
  )
}