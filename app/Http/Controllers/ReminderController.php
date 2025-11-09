<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReminderController extends Controller
{
    /**
     * Display a listing of the user's reminders.
     */
    public function index(): Response
    {
        $reminders = auth()->user()->reminders()
            ->orderBy('due_at', 'asc')
            ->get()
            ->map(function ($reminder) {
                return [
                    'id' => $reminder->id,
                    'title' => $reminder->title,
                    'description' => $reminder->description,
                    'due_at' => $reminder->due_at->toIso8601String(),
                    'formattedDue' => $reminder->due_at->format('M d, Y g:i A'),
                ];
            });

        return Inertia::render('Reminders/Index', [
            'reminders' => $reminders,
        ]);
    }

    /**
     * Show the form for creating a new reminder.
     */
    public function create(): Response
    {
        return Inertia::render('Reminders/Create');
    }

    /**
     * Store a newly created reminder.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'due_at' => ['required', 'date', 'after:now'],
        ]);

        auth()->user()->reminders()->create($validated);

        return redirect()->route('reminders.index')
            ->with('success', 'Reminder created successfully!');
    }

    /**
     * Show the form for editing the specified reminder.
     */
    public function edit(Reminder $reminder): Response
    {
        // Check ownership
        if ($reminder->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Reminders/Edit', [
            'reminder' => [
                'id' => $reminder->id,
                'title' => $reminder->title,
                'description' => $reminder->description,
                'due_at' => $reminder->due_at->format('Y-m-d\TH:i'),
            ],
        ]);
    }

    /**
     * Update the specified reminder.
     */
    public function update(Request $request, Reminder $reminder)
    {
        // Check ownership
        if ($reminder->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'due_at' => ['required', 'date', 'after:now'],
        ]);

        $reminder->update($validated);

        return redirect()->route('reminders.index')
            ->with('success', 'Reminder updated successfully!');
    }

    /**
     * Remove the specified reminder.
     */
    public function destroy(Reminder $reminder)
    {
        // Check ownership
        if ($reminder->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $reminder->delete();

        return redirect()->route('reminders.index')
            ->with('success', 'Reminder deleted successfully!');
    }
}