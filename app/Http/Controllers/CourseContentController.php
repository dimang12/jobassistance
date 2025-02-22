<?php

namespace App\Http\Controllers;

use AllowDynamicProperties;
use App\Models\CourseContent;
use App\Repositories\CourseContentRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

#[AllowDynamicProperties] class CourseContentController extends Controller
{
    /**
     * Create constructor
     */
    public function __construct()
    {
        $this->courseContentRepo = new CourseContentRepository();
    }
    /**
     * Insert a newly created course content in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'course_id' => 'required|integer',
            'content_title' => 'required|string|max:255',
            'content_description' => 'required|string',
            'parent_id' => 'nullable|integer',
            'ordering' => 'required|integer',
        ]);

        // check content_type
        $data['content_type'] = $request->get('content_type', 1);

        CourseContent::create($data);

        // update the ordering of the course content
        // if the ordering equal or greater than data['ordering'] and has the same parent_id
        // increment the ordering by 1
        if ($data['parent_id'] !== null) {
            $this->courseContentRepo->increaseOrdering($data['ordering'], $data['parent_id']);
        }

        // return the created course content
        return response()->json($this->courseContentRepo->getCourseContents());
    }


    /**
     * update the specified course content in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'content_title' => 'required|string|max:255',
            'content_description' => 'required|string'
        ]);

        $courseContent = CourseContent::findOrFail($id);
        $courseContent->update($data);

        // return the updated course content
        return response()->json($courseContent);
    }

    /**
     * Remove the specified course content from storage.
     */
    public function destroy($id) {
        $courseContent = CourseContent::findOrFail($id);
        $courseContent->delete();

        // return the updated course content
        return response()->json($this->courseContentRepo->getCourseContents());
    }
}
