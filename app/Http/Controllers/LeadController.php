<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function all(): Response
    {
        return Inertia::render('Leads/LeadsIndex', [
            'mode' => 'all',
            'title' => 'All Leads',
            'subtitle' => 'Master exchange book across all inbound channels and advisors',
        ]);
    }

    public function static(): Response
    {
        return Inertia::render('Leads/LeadsIndex', [
            'mode' => 'static',
            'title' => 'Static Leads',
            'subtitle' => 'Static rescue pool and reassigned advisor recovery queue',
        ]);
    }

    public function pool(): Response
    {
        return Inertia::render('Leads/LeadsIndex', [
            'mode' => 'pool',
            'title' => 'Leads Pool',
            'subtitle' => 'Unassigned & shared leads available for advisor claim',
        ]);
    }
}
