<?php
namespace App\Http\Controllers;

use App\Services\AI\OpenAIService;
use Illuminate\Http\Request;
use Inertia\Response;

class AskController extends Controller
{
    private OpenAIService $openAIService;
    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }
    // create home page for asking questions
    public function index(): Response
    {
        // find the Ask/Ask.jsx file in the resources/js/Pages directory
        return inertia('Ask/Ask');
    }

    // create ask method to send a POST request to the ChatGPT API
    public function ask(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        $messages = [
            ['role' => 'system', 'content' => 'You are a helpful assistant.'],
            ['role' => 'user', 'content' => $request->input('prompt')],
        ];
        try {
            $response = $this->openAIService->ask($messages);
            return response()->json(['response' => $response]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
