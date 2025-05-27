<?php

namespace App\Reservations\Controllers;

use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Actions\ReservationIndexAction;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Reservations\Actions\ReservationUpdateAction;
use Domain\Reservations\Models\Reservation;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;



class ReservationController extends Controller
{
    public function index()
    {

        return Inertia::render('reservations/Index',);
    }


    public function create(Request $request)
    {

        $books = Book::orderBy('title')->get(['id', 'title']);
        $users = User::orderBy('email')->get(['id', 'email']);
        $reservations_list = Reservation::all()->pluck('code');

        return Inertia::render('reservations/Create', [
            'books' => $books,
            'users' => $users,
            'reservations' => $reservations_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function store(Request $request, ReservationStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'book_id' => ['required', 'string'],
            'user_id' => ['required', 'string'],
        ]);
        // dd($validator);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $reservation = $action($validator->validated());

        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.created'));
    }

    public function edit(Request $request, Reservation $reservation)
    {
        $books = Book::orderBy('title')->get(['id', 'title']);
        $users = User::orderBy('email')->get(['id', 'email']);
        $reservation_list = Reservation::all()->pluck('code');

        return Inertia::render('reservations/Edit', [
            'reservation' => $reservation,
            'books' => $books,
            'users' => $users,
            'reservations' => $reservation_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Reservation $reservation, ReservationUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'book_id' => ['required', 'string'],
            'user_id' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($reservation, $validator->validated());

        $redirectUrl = route('reservations.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.reservations.updated'));
    }

    public function destroy(Reservation $reservation, ReservationDestroyAction $action)
    {
        $action($reservation);

        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.deleted'));
    }
}
