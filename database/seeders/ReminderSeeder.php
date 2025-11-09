<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Reminder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ReminderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test user
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        // Create sample reminders
        $reminders = [
            [
                'title' => 'Team Meeting',
                'description' => 'Weekly sync with the development team',
                'due_at' => now()->addMinutes(2), // 2 minutes from now for quick testing
            ],
            [
                'title' => 'Submit Report',
                'description' => 'Quarterly performance report deadline',
                'due_at' => now()->addHours(3),
            ],
            [
                'title' => 'Doctor Appointment',
                'description' => 'Annual checkup at downtown clinic',
                'due_at' => now()->addDays(2),
            ],
            [
                'title' => 'Pay Bills',
                'description' => 'Electricity and internet bills due',
                'due_at' => now()->addDays(5),
            ],
        ];

        foreach ($reminders as $reminder) {
            Reminder::create([
                'user_id' => $user->id,
                'title' => $reminder['title'],
                'description' => $reminder['description'],
                'due_at' => $reminder['due_at'],
            ]);
        }
    }
}