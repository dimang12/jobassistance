<?php
namespace App\Services\AI;

use Illuminate\Support\Facades\Http;

class OpenAIService
{
    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = env('CHATGPT_API_KEY');;
    }


    public function ask(array $prompt, int $maxTokens = 100): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini', // Specify the model you want to use
            'messages' => $prompt,
            'max_tokens' => $maxTokens,
        ]);
        if ($response->successful()) {
            return $response->json('choices')[0];
        }

        throw new \Exception('OpenAI API request failed: ' . $response->body());
    }
}
