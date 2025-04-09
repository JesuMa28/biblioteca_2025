<?php

namespace App\Zones\Controllers;

use App\Core\Controllers\Controller;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneIndexAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Domain\Categories\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ZoneController extends Controller
{
    public function index()
    {
        $zones = Zone::withCount('shelves')->orderBy('name')->get()->toArray();

        $floors = Floor::all('id', 'number');
        $categories = Category::all('id', 'name');

        return Inertia::render(
            'zones/Index',
            ['zones_count' => $zones],
            ['floors' => $floors],
            ['categories' => $categories],
        );
    }


    public function create(Request $request)
    {

        $floors = Floor::orderBy('number')->get(['id', 'number']);
        $categories = Category::orderBy('name')->get(['id', 'name']);
        $zone_list = Zone::all()->pluck('name');

        return Inertia::render('zones/Create', [
            'floors' => $floors,
            'categories' => $categories,
            'zones' => $zone_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function store(Request $request, ZoneStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'capacity' => ['required', 'int'],
            'floor_id' => ['required', 'string'],
            'category_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $zone = $action($validator->validated());

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));
    }

    public function edit(Request $request, Zone $zone)
    {
        $floors = Floor::orderBy('number')->get(['id', 'number']);
        $categories = Category::orderBy('name')->get(['id', 'name']);
        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'floors' => $floors,
            'categories' => $categories,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'capacity' => ['required', 'int'],
            'floor_id' => ['required', 'string'],
            'category_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($zone, $validator->validated());

        $redirectUrl = route('zones.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));
    }

    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        $action($zone);

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
}
