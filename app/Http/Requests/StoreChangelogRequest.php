<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChangelogRequest extends FormRequest
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
            'addon_id' => 'nullable|exists:addons,id',
            'new_addon_name' => 'nullable|string|max:255',
            'addon_description' => 'nullable|string',
            'version' => 'required|string|max:50',
            'summary' => 'nullable|string',
            'download_link' => 'required|url',
            'entries' => 'required|array|min:1',
            'entries.*.type' => 'required|in:feature,bug_fix,improvement,removal,environment',
            'entries.*.title' => 'required|string|max:255',
            'entries.*.description' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'addon_id.exists' => 'Please select a valid addon.',
            'new_addon_name.required_without' => 'Please select an existing addon or enter a new addon name.',
            'version.required' => 'Version number is required.',
            'download_link.required' => 'Download link is required.',
            'download_link.url' => 'Please provide a valid download URL.',
            'entries.required' => 'At least one changelog entry is required.',
            'entries.*.type.required' => 'Entry type is required.',
            'entries.*.title.required' => 'Entry title is required.',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!$this->addon_id && !$this->new_addon_name) {
                $validator->errors()->add('addon_selection', 'Please select an existing addon or enter a new addon name.');
            }
        });
    }
}