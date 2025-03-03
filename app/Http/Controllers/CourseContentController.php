<?php

namespace App\Http\Controllers;

use AllowDynamicProperties;
use App\Models\CourseContent;
use App\Models\CourseVideo;
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
        return response()->json($this->courseContentRepo->getCourseContentsByCourseId($data['course_id']));
    }


    /**
     * update the specified course content in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'content_title' => 'required|string|max:255',
            'content_description' => 'required|string',
            'course_id' => 'required|integer',
        ]);

        $courseContent = CourseContent::findOrFail($id);
        $courseContent->update($data);
        // check if there is a video uploaded
        if ($request->file('video')) {
            // upload the video
            $video = $request->file('video');
            $videoName = time() . '.' . $video->getClientOriginalExtension();
            // check if the course directory exists or not
            // then create the directory
            if (!file_exists(public_path('videos/' .$data['course_id'] .'/'))) {
                mkdir(public_path('videos/' .$data['course_id'] .'/'), 0777, true);
            }

            $video->move(public_path('videos/' .$data['course_id'] .'/'), $videoName);

            // save information about the video to the course_videos table
            CourseVideo::create([
                'course_id' => $courseContent->course_id,
                'user_id' => auth()->id(),
                'created_by' => auth()->id(),
                'title' => $request->input('content_title'),
                'path' => 'videos/' . $videoName,
                'video_length' => 0, // You can update this with the actual video length if available
                'brief_description' => $request->input('content_description'),
                'full_description' => $request->input('content_description'),
                'references' => null, // Add references if available
                'bio' => null, // Add bio if available
                'watched' => 0,
                'is_feature' => 0,
                'is_publish' => 1,
                'modified_date' => now(),
            ]);
        }

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
