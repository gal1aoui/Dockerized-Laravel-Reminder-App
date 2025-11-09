import ReminderForm from '@/Components/ReminderForm'
import AppLayout from '@/Layouts/AppLayout'

export default function Create() {
  return (
    <AppLayout>
      <ReminderForm action="create" />
    </AppLayout>
  )
}