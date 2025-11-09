import React from 'react'
import { useForm } from '@inertiajs/react'

interface ReminderFormProps {
  reminder?: { id: number; title: string; description?: string; due_at: string }
  action: 'create' | 'edit'
}

export default function ReminderForm({ reminder, action }: ReminderFormProps) {
  const { data, setData, post, put, errors, processing } = useForm({
    title: reminder?.title || '',
    description: reminder?.description || '',
    due_at: reminder?.due_at || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (action === 'create') {
      post('/reminders')
    } else {
      put(`/reminders/${reminder?.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">
        {action === 'create' ? 'Create Reminder' : 'Edit Reminder'}
      </h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date & Time *</label>
        <input
          type="datetime-local"
          value={data.due_at}
          onChange={(e) => setData('due_at', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.due_at ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        <p className="text-sm text-gray-500 mt-1">Your local timezone</p>
        {errors.due_at && <p className="text-red-500 text-sm mt-1">{errors.due_at}</p>}
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
      >
        {processing ? 'Saving...' : action === 'create' ? 'Create Reminder' : 'Update Reminder'}
      </button>
    </form>
  )
}