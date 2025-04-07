<?php

namespace App\Floors\Controllers;

use App\Core\Controllers\Controller;
use Domain\Floors\Actions\FloorDestroyAction;
use Domain\Floors\Actions\FloorIndexAction;
use Domain\Floors\Actions\FloorStoreAction;
use Domain\Floors\Actions\FloorUpdateAction;
use Domain\Floors\Models\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class FloorController extends Controller
{
    public function index()
    {
        $floors = Floor::withCount('zones')
            ->orderBy('number')
            ->get()
            ->toArray();

        // dd($floors);
        return Inertia::render('floors/Index', ['floors_count' => $floors]);
    }


    public function create()
    {

        $floor_list = Floor::all()->pluck('number');

        return Inertia::render('floors/Create', ['floors' => $floor_list]);
    }

    public function store(Request $request, FloorStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'integer', 'unique:floors'],
            'capacity' => ['required', 'integer'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.created'));
    }

    public function edit(Request $request, Floor $floor)
    {

        return Inertia::render('floors/Edit', [
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'integer', Rule::unique('floors')->ignore($floor->id)],
            'capacity' => ['required', 'integer']
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($floor, $validator->validated());

        $redirectUrl = route('floors.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.floors.updated'));
    }

    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        $action($floor);

        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }
}
