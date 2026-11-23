<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class OperationsController extends Controller
{
    public function calendar(): Response
    {
        return Inertia::render('Operations/Calendar', [
            'title' => 'Calendar',
        ]);
    }

    public function messages(): Response
    {
        return Inertia::render('Operations/Messages', [
            'title' => 'Messages',
        ]);
    }

    public function reporting(): Response
    {
        return Inertia::render('Operations/DailyReporting', [
            'title' => 'Daily Reporting',
        ]);
    }
}
