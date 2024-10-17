<?php

namespace App\Http\Controllers;

use App\Services\PeopleService;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PeopleController extends Controller
{
    protected $peopleService;

    public function __construct(PeopleService $peopleService)
    {
        $this->peopleService = $peopleService;
    }

    protected function validationRules($id = null)
    {
        return [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'south_african_id_number' => 'required|string|max:13|unique:people,south_african_id_number' . ($id ? ',' . $id : ''),
            'mobile_number' => 'required|string|max:15|unique:people,mobile_number' . ($id ? ',' . $id : ''),
            'email' => 'required|email|max:255|unique:people,email' . ($id ? ',' . $id : ''),
            'date_of_birth' => 'required|date',
            'language' => 'required|string|max:50',
            'interests' => 'required|array',
        ];
    }

    public function index()
    {
        return Inertia::render('Dashboard', [
            'people' => $this->peopleService->getAllPeople(auth()->id())
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate($this->validationRules());

        try {
            $validatedData['user_id'] = auth()->id();

            $this->peopleService->createPerson($validatedData);

            return Inertia::location('/dashboard');
        } catch (\Exception $e) {
            Log::error('Unexpected error while creating person: ' . $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            return response()->json($this->peopleService->getPerson($id, auth()->id()), 200);
        }  catch (\Exception $e) {
            Log::error('Error retrieving person: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate($this->validationRules($id));
        try {
            $this->peopleService->updatePerson($id, $validatedData, auth()->id());

            return Inertia::location('/dashboard');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }


    public function destroy($id)
    {
        try {
            $this->peopleService->deletePerson($id, auth()->id());

            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }


}
