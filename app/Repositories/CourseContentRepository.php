<?php
namespace App\Repositories;

use App\Models\CourseContent;


class CourseContentRepository
{
    /**
     * Get all course contents
     * @return mixed
     */
    public function getCourseContents(): mixed
    {
        // get course contents from course_contents table
        return CourseContent::leftJoin('course_content_playeds as ccp', 'course_contents.id', '=', 'ccp.course_content_id')
            ->select('course_contents.*', 'ccp.played_duration', 'ccp.is_completed')
            ->orderBy('course_contents.ordering')
            ->get();
    }

    /**
     * Get all course contents by course id
     * @param int $courseId
     * @return mixed
     */
    public function getCourseContentsByCourseId(int $courseId): mixed
    {
        // get course contents from course_contents table by course id
        return CourseContent::leftJoin('course_content_playeds as ccp', 'course_contents.id', '=', 'ccp.course_content_id')
            ->select('course_contents.*', 'ccp.played_duration', 'ccp.is_completed')
            ->where('course_id', $courseId)
            ->orderBy('course_contents.ordering')
            ->get();
    }

    /**
     * Store a newly created course content in storage.
     * @param array $data
     * @return mixed
     */
    public function store($data)
    {
        $courseContent = CourseContent::create($data);

        // update the ordering of the course content
        // if the ordering equal or greater than data['ordering'] and has the same parent_id
        // increment the ordering by 1
        CourseContent::where('ordering', '>=', $data['ordering'])
            ->where('parent_id', $data['parent_id'])
            ->where('id', '!=', $courseContent->id)
            ->increment('ordering');

        // return the created course content
        return $courseContent;
    }

    public function update($data, $id)
    {
        $courseContent = CourseContent::findOrFail($id);
        $courseContent->update($data);

        // return the updated course content
        return $courseContent;
    }

    /**
     * Increase the ordering of the course content
     * if the ordering equal or greater than currentOrdering and has the same parent_id
     * increment the ordering by 1
     * @param int $currentOrdering
     * @param int $parentId
     */
    public function increaseOrdering(int $currentOrdering, int $parentId): void
    {
        CourseContent::where('ordering', '>=', $currentOrdering)
            ->where('parent_id', $parentId)
            ->increment('ordering');
    }

}
