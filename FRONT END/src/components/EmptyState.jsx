import { Search } from 'lucide-react'

export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
        <Search className="h-8 w-8 text-secondary-400" />
      </div>
      <h3 className="text-lg font-medium text-secondary-900 mb-2">{title}</h3>
      <p className="text-secondary-600 mb-6">{description}</p>
      {action}
    </div>
  )
}