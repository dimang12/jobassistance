<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class CalendarController extends Controller
{
    /**
     * Display the calendar page.
     */
    public function index(): Response
    {
        return Inertia::render('Calendar/Calendar');
    }

    /**
     * Save the calendar event.
     */
    public function save(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'id' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        // Convert the datetime format
        $data['start_date'] = Carbon::parse($data['start_date'])->format('Y-m-d H:i:s');
        $data['end_date'] = Carbon::parse($data['end_date'])->format('Y-m-d H:i:s');

        // get user id from logged in user
        $data['user_id'] = auth()->user()->id;

        // If the event id is present, update the event
        if (isset($data['id'])) {
            DB::table('events')->where('id', $data['id'])->update($data);

            return response()->json(['message' => 'Event updated successfully']);
        } else {
            // If the event id is not present, create a new event
            unset($data['id']);
        }

        // Save the event data to the database
        DB::table('events')->updateOrInsert(
            $data
        );

        return response()->json(['message' => 'Event saved successfully']);
    }

    /**
     * Get the calendar events.
     */
    public function getEvents(Request $request): \Illuminate\Http\JsonResponse
    {
        // change title to text for fullcalendar
        $events = DB::table('events')
            ->select('id', 'title as text', 'start_date', 'end_date', 'description')
            ->get();

        return response()->json($events);
    }

    /**
     * Delete the calendar event.
     */
    public function delete(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|integer',
        ]);

        DB::table('events')->where('id', $data['id'])->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
