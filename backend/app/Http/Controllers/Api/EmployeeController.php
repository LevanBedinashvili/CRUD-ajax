<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Resources\EmployeeResource;
use App\Http\Requests\EmployeeStoreValidation;
use App\Http\Requests\EmployeeUpdateValidation;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get employees data
        $employees = Employee::get();

        // check if there are any records, if not 404 error - employees not found
        if ($employees->isEmpty()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Employees not found'
            ], 404); // 404 not found
        }

        // data to json with status and message
        return response()->json([
            'status' => 'success',
            'message' => 'Employees retrieved successfully',
            'data' => EmployeeResource::collection($employees)
        ], 200); // 200 ok
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeStoreValidation $request)
    {
        // Sanitize inputs
        $validated = $request->validated();

        // save validated data in emplyoees table
        $employee = Employee::create($validated);

        // json response with status and message that employee has successfully added
        return response()->json([
            'status' => 'success',
            'message' => 'Employee added successfully',
            'data' => new EmployeeResource($employee)
        ], 201); // 201 success post
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // get the employee with specific ID
        $employee = Employee::find($id);

        // check if employee exists and if not get 404 error message employee not found
        if (!$employee) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Employee not found'
            ], 404); // 404 not found
        }

        // if employee on that id exists
        return response()->json([
            'status' => 'success',
            'message' => 'Employee retrieved successfully',
            'data' => new EmployeeResource($employee)
        ], 200); // 200 ok
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Employee $employee, EmployeeUpdateValidation $request)
    {

        // sanitize input
        $validated = $request->validated();

        // update employee with validated data
        $employee->update($validated);

        // retrieve status and messsage with updated data
        return response()->json([
            'status' => 'success',
            'message' => 'Employee updated successfully',
            'data' => new EmployeeResource($employee)
        ], 200); // ok

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        // get employee via ID
        $employee = Employee::find($id);

        // if id does not exist
        if (!$employee) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Employee not found'
            ], 404); // 404 not found
        }

        // delete employee
        $employee->delete();

        // success response and message
        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully'
        ], 204); // 204 for no content.
    }
}
