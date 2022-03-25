<?php

namespace App\Http\Controllers;

use App\WordleSolver;
use Illuminate\Http\Request;

class SolverController extends Controller
{
    public function index(Request $request)
    {
        return (new WordleSolver())->solve($request->input('answers', []));
    }
}
