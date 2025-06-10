<?php

namespace App\Shelves\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Shelves\Actions\ShelfDestroyAction;
use Domain\Shelves\Actions\ShelfIndexAction;
use Domain\Shelves\Actions\ShelfStoreAction;
use Domain\Shelves\Actions\ShelfUpdateAction;
use Domain\Shelves\Models\Shelf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ShelfApiController extends Controller
{
    public function index(Request $request, ShelfIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Shelf $shelf)
    {
        return response()->json(['shelf' => $shelf]);
    }

    public function store(Request $request, ShelfStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'floor_number' => ['required', 'integer'],
            'capacity' => ['required', 'integer'],
            'zone_id' => ['required', 'string'],
            'category_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $shelf = $action($validator->validated());

        return response()->json([
            'message' => __('messages.shelves.created'),
            'shelf' => $shelf
        ]);
    }

    public function update(Request $request, Shelf $shelf, ShelfUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'floor_number' => ['required', 'integer'],
            'capacity' => ['required', 'integer'],
            'zone_id' => ['required', 'string'],
            'category_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedShelf = $action($shelf, $validator->validated());

        return response()->json([
            'message' => __('messages.shelves.updated'),
            'shelf' => $updatedShelf
        ]);
    }

    public function destroy(Shelf $shelf, ShelfDestroyAction $action)
    {
        $action($shelf);

        return response()->json([
            'message' => __('messages.shelves.deleted')
        ]);
    }

}
