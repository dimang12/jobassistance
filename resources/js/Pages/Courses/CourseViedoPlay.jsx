export default function CourseVideoPlay({ video, className }) {
    const webUrl = window.location.origin;
    const videoUrl = `${webUrl}/videos/1/${video.path}`;
    return (
        <div className={'p-4 border rounded border-gray-200 mt-4 bg-white drop-shadow-sm ' + className}>
            <h1 className="text-2xl font-bold">{video?.title}</h1>
            <video className={'w-full'} controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p className="mt-4">{video?.full_description}</p>
        </div>
    );
}
