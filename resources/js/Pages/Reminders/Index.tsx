import { useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import { Reminder, PageProps } from '@/types'

export default function RemindersIndex() {
  const { reminders } = usePage<PageProps & { reminders: Reminder[] }>().props
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null)

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission)
        })
      }
    }
  }, [])

  // Check for due reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      reminders.forEach((reminder) => {
        const dueTime = new Date(reminder.due_at).getTime()
        const now = Date.now()

        // Show notification if within 1 minute window and permission granted
        if (dueTime <= now && dueTime > now - 60000 && notificationPermission === 'granted') {
          new Notification('Reminder', {
            body: reminder.title,
            icon: '/favicon.ico',
          })
        }
      })
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [reminders, notificationPermission])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Reminders</h1>
          <Link
            href="/reminders/create"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Create Reminder
          </Link>
        </div>

        {notificationPermission === 'denied' && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            Notifications are blocked. Enable them in your browser settings to receive reminders.
          </div>
        )}

        {reminders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No reminders yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{reminder.title}</h3>
                    {reminder.description && <p className="text-gray-600 mt-2">{reminder.description}</p>}
                    <p className="text-sm text-blue-600 font-medium mt-3">
                      📅 {new Date(reminder.due_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/reminders/${reminder.id}/edit`}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/reminders/${reminder.id}`}
                      method="delete"
                      as="button"
                      className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      onClick={(e) => !confirm('Delete this reminder?') && e.preventDefault()}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}