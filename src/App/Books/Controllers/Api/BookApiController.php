<?php

namespace App\Books\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class BookApiController extends Controller
{
    public function index(Request $request, BookIndexAction $action)
    {
        $search = $request->input('search');  // filtro general
        $title = $request->input('title');    // filtro título
        $author = $request->input('author');  // filtro autor
        $status = $request->input('status');  // filtro autor
        $perPage = $request->integer('per_page', 10);

        return response()->json($action($search, $title, $author, $status, $perPage));

    }

    public function show(Book $book)
    {
        return response()->json(['book' => $book]);
    }

    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'editorial' => ['required', 'string'],
            'language' => ['required', 'string'],
            'year' => ['required', 'integer'],
            'isbn' => ['required', 'string'],
            'pages' => ['required', 'integer'],
            'shelf_id' => ['required', 'string'],
            'status' => ['required', 'in:available,loaned,reserved'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book = $action($validator->validated());

        return response()->json([
            'message' => __('messages.books.created'),
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'editorial' => ['required', 'string'],
            'language' => ['required', 'string'],
            'year' => ['required', 'integer'],
            'isbn' => ['required', 'string'],
            'pages' => ['required', 'integer'],
            'shelf_id' => ['required', 'string'],
            'status' => ['required', 'in:available,loaned,reserved'],

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedBook = $action($book, $validator->validated());

        return response()->json([
            'message' => __('messages.books.updated'),
            'book' => $updatedBook
        ]);
    }

    public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return response()->json([
            'message' => __('messages.books.deleted')
        ]);
    }

}
