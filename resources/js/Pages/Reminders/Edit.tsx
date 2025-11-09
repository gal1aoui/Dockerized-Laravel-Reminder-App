import { usePage } from '@inertiajs/react'
import ReminderForm from '@/Components/ReminderForm'
import AppLayout from '@/Layouts/AppLayout'
import { PageProps } from '@/types'

interface Reminder {
  id: number
  title: string
  description?: string
  due_at: string
}

export default function Edit() {
  const { reminder } = usePage<PageProps & { reminder: Reminder }>().props

  return (
    <AppLayout>
      <ReminderForm reminder={reminder} action="edit" />
    </AppLayout>
  )
}