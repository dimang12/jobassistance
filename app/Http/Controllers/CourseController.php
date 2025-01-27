<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        $courses = Course::leftJoin('course_category as cc', 'courses.id', '=', 'cc.course_id')
            ->leftJoin('categories as c', 'cc.category_id', '=', 'c.id')
            ->select('courses.*', 'cc.category_id', 'c.name as category_name')
            ->get();
        return Inertia::render('Courses/Course', ['courses' => $courses]);
    }

    /**
     * Show the form for creating a new course.
     */
    public function create()
    {
        // Return a view for creating a course
        return view('courses.create');
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $course = Course::create($data);

        return response()->json(['message' => 'Course created successfully', 'course' => $course]);
    }

    /**
     * Display the specified course.
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course);
    }

    /**
     * Show the form for editing the specified course.
     */
    public function edit($id)
    {
        $course = Course::findOrFail($id);
        return view('courses.edit', compact('course'));
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $course = Course::findOrFail($id);
        $course->update($data);

        return response()->json(['message' => 'Course updated successfully', 'course' => $course]);
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }
}
