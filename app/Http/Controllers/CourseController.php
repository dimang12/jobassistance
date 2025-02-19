<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
            ->leftJoin('images as i', function($join) {
                $join->on('courses.id', '=', 'i.course_id')
                    ->where('i.is_default', '=', 1);
            })
            ->join('users as u', 'courses.user_id', '=', 'u.id')
            ->select('courses.*', 'cc.category_id', 'c.name as category_name', 'i.path as image', 'u.name')
            ->get();
        $categories = Category::all();
        return Inertia::render('Courses/Course', ['courses' => $courses, 'categories' => $categories]);
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
            'category_id' => 'integer',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
            'duration' => 'required|integer',
            'rating' => 'nullable|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096', // 4MB max
        ]);

        // add user_id to the data array
        $data['user_id'] = auth()->user()->id;

        $course = Course::create($data);
        // check if the image is uploaded
        if ($course && $request->hasFile('image')) {
            // loop through the images and save them
            if ($request->hasFile('image')) {
                $images = $request->file('image');
                if (!is_array($images)) {
                    $images = [$images];
                }
                foreach ($images as $image) {
                    $name = time() . '.' . $image->getClientOriginalExtension();
                    $destinationPath = public_path('/images');
                    $image->move($destinationPath, $name);

                    // save the image path in the images table
                    $course->images()->create(['path' => $name]);
                }
            }
        }

        // if the $course is created successfully, insert the category_id into the course_category table
        if ($course) {
            $course->categories()->attach($data['category_id']);
        }

        return response()->json(['message' => 'Course created successfully', 'course' => $course]);
    }

    /**
     * Display the specified course.
     */
    public function show($id)
    {
        $courses = Course::leftJoin('course_category as cc', 'courses.id', '=', 'cc.course_id')
            ->join('users as u', 'courses.user_id', '=', 'u.id')
            ->leftJoin('categories as c', 'cc.category_id', '=', 'c.id')
            ->leftJoin('images as i', 'courses.id', '=', 'i.course_id')
            ->select('courses.*', 'i.path as image', 'u.name', 'cc.category_id', 'c.name as category_name')
            ->where('i.is_default', 1)
            ->get();
        $course = Course::findOrFail($id);

        // get course contents from course_contents table
        $courseContents = $course->courseContents()
            ->leftJoin('course_content_playeds as ccp', 'course_contents.id', '=', 'ccp.course_content_id')
            ->select('course_contents.*', 'ccp.played_duration', 'ccp.is_completed')
            ->orderBy('course_contents.ordering')
            ->get();

        return Inertia::render('Courses/CourseVideo', [
            'course' => $course,
            'courses' => $courses,
            'courseContents' => $courseContents
        ]);
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
            'category_id' => 'nullable|integer',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
            'duration' => 'required|integer',
            'rating' => 'nullable|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date'
        ]);
        // convert the $id to an integer
        $id = (int)$id;

        // add user_id to the data array
        $data['user_id'] = auth()->user()->id;

        $course = Course::findOrFail($id);
        if ($course) {
            $course->update($data);
            if (isset($data['category_id'])) {
                $course->categories()->sync($data['category_id']);
            }

            // check if the image is uploaded
            if ($request->hasFile('image')) {
                // loop through the images and save them
                $images = $request->file('image');
                if (!is_array($images)) {
                    $images = [$images];
                }
                foreach ($images as $image) {
                    $name = time() . '.' . $image->getClientOriginalExtension();
                    $destinationPath = public_path('/images/courses/');
                    $image->move($destinationPath, $name);

                    // unset all is_default flags
                    $course->images()->update(['is_default' => 0]);
                    // save the image path in the images table
                    $course->images()->create(['path' => $name, 'is_default' => 1]);
                }
            }

            // get the updated course
            $course = Course::leftJoin('course_category as cc', 'courses.id', '=', 'cc.course_id')
                ->join('users as u', 'courses.user_id', '=', 'u.id')
                ->leftJoin('categories as c', 'cc.category_id', '=', 'c.id')
                ->leftJoin('images as i', 'courses.id', '=', 'i.course_id')
                ->select('courses.*', 'cc.category_id', 'c.name as category_name', 'i.path as image', 'u.name')
                ->where('courses.id', $id)
                ->where('i.is_default', 1)
                ->first();
        }

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
