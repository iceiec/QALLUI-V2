<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function compliance(): Response
    {
        return Inertia::render('Admin/Compliance', [
            'title' => 'Compliance',
        ]);
    }

    public function secondaryApproval(): Response
    {
        return Inertia::render('Admin/SecondaryApproval', [
            'title' => 'Secondary Approval',
        ]);
    }

    public function voip(): Response
    {
        return Inertia::render('Admin/Voip', [
            'title' => 'VoIP',
        ]);
    }

    public function users(): Response
    {
        return Inertia::render('Admin/Users', [
            'title' => 'User & Advisor Management',
        ]);
    }

    public function kanban(): Response
    {
        return Inertia::render('Admin/Kanban', [
            'title' => 'Kanban Board',
        ]);
    }
}
