<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class OtherController extends Controller
{
    public function page(string $section, string $title, string $subtitle): Response
    {
        return Inertia::render('Other/ModulePage', [
            'section' => $section,
            'title' => $title,
            'subtitle' => $subtitle,
        ]);
    }
}
