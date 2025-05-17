<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Shelves\Models\Shelf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function index()
    {

        $shelves = Shelf::all('id', 'code');

        return Inertia::render(
            'shelves/Index',
            ['shelves' => $shelves],
        );
    }


    public function create(Request $request)
    {

        $shelves = Shelf::orderBy('code')->get(['id', 'code']);
        $book_list = Book::all()->pluck('title');

        return Inertia::render('books/Create', [
            'shelves' => $shelves,
            'books' => $book_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
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
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $book = $action($validator->validated());

        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));
    }

    public function edit(Request $request, Book $book)
    {
        $shelves = Shelf::orderBy('code')->get(['id', 'code']);
        return Inertia::render('books/Edit', [
            'book' => $book,
            'shelves' => $shelves,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
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
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated());

        $redirectUrl = route('books.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }

    public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }
}
