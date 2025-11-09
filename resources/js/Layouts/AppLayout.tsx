import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { auth, flash } = usePage<PageProps & { auth: { user: any } }>().props

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/reminders" className="text-xl font-bold text-blue-600">
                📝 Reminder App
              </Link>
            </div>
            {auth?.user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{auth.user.name}</span>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Flash Messages */}
      {flash?.success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          {flash.success}
        </div>
      )}
      {flash?.error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {flash.error}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}