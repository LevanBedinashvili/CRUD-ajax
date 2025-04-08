<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // method that converts the Employee model into a format suitable for API response
        return [
            'id' => $this->id,                    // the unique identifier of the employee
            'first_name' => $this->first_name,     // the employee's first name
            'last_name' => $this->last_name,       // the employee's last name
            'email' => $this->email,               // the employee's email address
            'phone' => $this->phone,               // the employee's phone number
            'position' => $this->position,         // the employee's job position
        ];
    }
}
