<?php

namespace App\Shelves\Controllers;

use App\Core\Controllers\Controller;
use Domain\Shelves\Actions\ShelfDestroyAction;
use Domain\Shelves\Actions\ShelfIndexAction;
use Domain\Shelves\Actions\ShelfStoreAction;
use Domain\Shelves\Actions\ShelfUpdateAction;
use Domain\Shelves\Data\Resources\ShelfResource;
use Domain\Shelves\Models\Shelf;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Domain\Categories\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ShelfController extends Controller
{
    public function index()
    {
        $shelves = Shelf::with(['books', 'zone.floor']) // zone y dentro de zone, floor
            ->orderBy('id')
            ->get()
            ->map(fn($shelf) => ShelfResource::fromModel($shelf));

        $zones = Zone::all('id', 'name');
        $categories = Category::all('id', 'name');

        return Inertia::render(
            'shelves/Index',
            ['shelves_count' => $shelves],
            ['zones' => $zones],
            ['categories' => $categories],
        );
    }


    public function create(Request $request)
    {

        $zones = Zone::orderBy('name')->get(['id', 'name']);
        $categories = Category::orderBy('name')->get(['id', 'name']);
        $shelf_list = Shelf::all()->pluck('code');

        return Inertia::render('shelves/Create', [
            'zones' => $zones,
            'categories' => $categories,
            'shelves' => $shelf_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function store(Request $request, ShelfStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'capacity' => ['required', 'int'],
            'zone_id' => ['required', 'string'],
            'category_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $shelf = $action($validator->validated());

        return redirect()->route('shelves.index')
            ->with('success', __('messages.shelves.created'));
    }

    public function edit(Request $request, Shelf $shelf)
    {
        $zones = Zone::orderBy('name')->get(['id', 'name']);
        $categories = Category::orderBy('name')->get(['id', 'name']);
        return Inertia::render('shelves/Edit', [
            'shelf' => $shelf,
            'zones' => $zones,
            'categories' => $categories,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Shelf $shelf, ShelfUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'capacity' => ['required', 'int'],
            'zone_id' => ['required', 'string'],
            'category_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($shelf, $validator->validated());

        $redirectUrl = route('shelves.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.shelves.updated'));
    }

    public function destroy(Shelf $shelf, ShelfDestroyAction $action)
    {
        $action($shelf);

        return redirect()->route('shelves.index')
            ->with('success', __('messages.shelves.deleted'));
    }
}
