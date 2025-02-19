import { Link } from '@inertiajs/react';

export default function CourseVideoHeader({ breadcrumbs, onPrev, onNext }) {
    return (
        <div className="flex justify-between items-center p-4  border rounded bg-white drop-shadow-sm">
            <div className="flex items-center space-x-2">
                {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
                    <span key={index} className="flex items-center">
                        <Link href={breadcrumb.href} className="text-blue-500 hover:underline">
                            {breadcrumb.label}
                        </Link>
                        {index < breadcrumbs.length - 1 && (
                            <span className="mx-2 text-gray-500">/</span>
                        )}
                    </span>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onPrev}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
