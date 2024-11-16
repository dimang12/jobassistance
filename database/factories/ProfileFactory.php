<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'proFirstName' => $this->faker->firstName,
            'proLastName' => $this->faker->lastName,
            'proPosition' => $this->faker->jobTitle,
            'proAboutMe' => $this->faker->paragraph,
            'proEmail' => $this->faker->unique()->safeEmail,
            'proPhone' => $this->faker->phoneNumber,
            'proLinkedIn' => $this->faker->url,
        ];
    }
}
