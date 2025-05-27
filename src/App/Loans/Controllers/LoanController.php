<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;



class LoanController extends Controller
{
    public function index()
    {

        return Inertia::render('loans/Index',);
    }


    public function create(Request $request)
    {

        $books = Book::orderBy('title')->get(['id', 'title']);
        $users = User::orderBy('email')->get(['id', 'email']);
        $loan_list = Loan::all()->pluck('code');

        return Inertia::render('loans/Create', [
            'books' => $books,
            'users' => $users,
            'loans' => $loan_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function store(Request $request, LoanStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'book_id' => ['required', 'string'],
            'user_id' => ['required', 'string'],
            'loan_date' => ['required', 'string'],
            'return_date' => ['required', 'string'],
            'status' => ['required',  'string'],
        ]);
        // dd($validator);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $loan = $action($validator->validated());

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
    }

    public function edit(Request $request, Loan $loan)
    {
        $books = Book::orderBy('title')->get(['id', 'title']);
        $users = User::orderBy('email')->get(['id', 'email']);
        $loan_list = Loan::all()->pluck('code');

        return Inertia::render('loans/Edit', [
            'loan' => $loan,
            'books' => $books,
            'users' => $users,
            'loans' => $loan_list,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'code' => ['required', 'string'],
            'book_id' => ['required', 'string'],
            'user_id' => ['required', 'string'],
            'loan_date' => ['required', 'string'],
            'return_date' => ['required', 'string'],
            'status' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        $redirectUrl = route('loans.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }
}
