<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\AskController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
    Route::post('/calendar/save', [CalendarController::class, 'save']);
    Route::get('/calendar/events', [CalendarController::class, 'getEvents']);
    Route::post('/calendar/delete', [CalendarController::class, 'delete']);

    // chat gpt routes
    Route::get('/ask', [AskController::class, 'index'])->name('ask');
    Route::post('/api/chatgpt/ask', [AskController::class, 'ask'])->name('api.chatgpt.ask');

    // course routes
    Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::put('/courses/{course}', [CourseController::class, 'update'])->name('courses.update');
    Route::post('/courses/{course}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
    // navigate to course detail page
    Route::get('/courses/{course}', [CourseController::class, 'show'])->name('courses.show');
});

require __DIR__.'/auth.php';
