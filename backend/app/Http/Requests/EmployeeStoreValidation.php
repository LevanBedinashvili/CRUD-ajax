<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class EmployeeStoreValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255', // required, must be string, must not exceed 255 chars
            'last_name' => 'required|string|max:255', // required, must be string, must not exceed 255 chars
            'email' => 'required|email', // required, must be valid email address
            'phone' => 'required|regex:/^[0-9]+$/', // required, must be numbers only
            'position' => 'required|string|max:255' // required, must be string, must not exceed 255 chars
        ];
    }

    public function messages()
    {
        // custom messages for every validation rule
        return [
            'first_name.required' => 'The first name is required.',
            'first_name.string' => 'The first name must be a string.',
            'last_name.required' => 'The last name is required.',
            'last_name.string' => 'The last name must be a string.',
            'email.required' => 'The email address is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email address is already taken.',
            'phone.required' => 'The phone number is required.',
            'phone.regex' => 'The phone number must be a valid phone number.',
            'position.required' => 'The position is required.',
            'position.string' => 'The position must be a string.'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        // error message when validation fails with status and specific failed validation
        throw new HttpResponseException(response()->json([
            'status' => 'failed',
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ], 422));
    }
}
