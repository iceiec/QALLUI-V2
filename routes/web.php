<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OperationsController;
use App\Http\Controllers\OtherController;
use Illuminate\Support\Facades\Route;

Route::get('/login', fn () => \Inertia\Inertia::render('Auth/Login'))->name('login');
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::prefix('finance')->name('finance.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/billing', fn () => \Inertia\Inertia::render('Billing/Billing'))->name('billing');
    Route::get('/billing/payment-failures', fn () => \Inertia\Inertia::render('Billing/PaymentFailures'))->name('payment-failures');
    Route::get('/billing/ledger', fn () => \Inertia\Inertia::render('Billing/Ledger'))->name('ledger');
    Route::get('/reports/externals', fn () => \Inertia\Inertia::render('Reports/Externals'))->name('externals');
});

Route::prefix('junior')->name('junior.')->group(function () {
    Route::get('/login', fn () => \Inertia\Inertia::render('Auth/Login'))->name('login');
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/leads', [LeadController::class, 'all'])->name('leads');
    Route::get('/leads/add', fn () => \Inertia\Inertia::render('Leads/AddLead'))->name('leads.add');
    Route::get('/leads/static', [LeadController::class, 'static'])->name('leads.static');
    Route::get('/leads/pool', [LeadController::class, 'pool'])->name('leads.pool');
    Route::get('/billing/payment-failures', fn () => \Inertia\Inertia::render('Billing/PaymentFailures'))->name('payment-failures');
    Route::get('/reports/rejected-pool', fn () => \Inertia\Inertia::render('Reports/PoolLeads', ['mode' => 'rejected', 'title' => 'Rejected Leads']))->name('rejected-pool');
    Route::get('/calendar', [OperationsController::class, 'calendar'])->name('calendar');
    Route::get('/kanban', [AdminController::class, 'kanban'])->name('kanban');
});

Route::prefix('leads')->name('leads.')->group(function () {
    Route::get('/', [LeadController::class, 'all'])->name('all');
    Route::get('/static', [LeadController::class, 'static'])->name('static');
    Route::get('/pool', [LeadController::class, 'pool'])->name('pool');
    Route::get('/edit', fn () => \Inertia\Inertia::render('Leads/LeadEdit'))->name('edit');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/compliance', [AdminController::class, 'compliance'])->name('compliance');
    Route::get('/secondary-approval', [AdminController::class, 'secondaryApproval'])->name('secondary-approval');
    Route::get('/voip', [AdminController::class, 'voip'])->name('voip');
    Route::get('/calendar', [OperationsController::class, 'calendar'])->name('calendar');
});

Route::get('/messages', [OperationsController::class, 'messages'])->name('messages');
Route::get('/reporting', [OperationsController::class, 'reporting'])->name('reporting');

// Others: Billing, Manage Customer, Report, Settings, Kanban Board
Route::prefix('billing')->name('billing.')->group(function () {
    Route::get('/', fn () => \Inertia\Inertia::render('Billing/Billing'))->name('index');
    Route::get('/payment-failures', fn () => \Inertia\Inertia::render('Billing/PaymentFailures'))->name('failures');
    Route::get('/ledger', fn () => \Inertia\Inertia::render('Billing/Ledger'))->name('ledger');
});

Route::get('/customers', fn () => \Inertia\Inertia::render('Customers/Customers'))->name('customers');

Route::prefix('reports')->name('reports.')->group(function () {
    Route::get('/daily', [OperationsController::class, 'reporting'])->name('daily');
    Route::get('/dead-pool', fn () => \Inertia\Inertia::render('Reports/PoolLeads', ['mode' => 'dead', 'title' => 'Dead Leads']))->name('dead-pool');
    Route::get('/rejected-pool', fn () => \Inertia\Inertia::render('Reports/PoolLeads', ['mode' => 'rejected', 'title' => 'Rejected Leads']))->name('rejected-pool');
    Route::get('/externals', fn () => \Inertia\Inertia::render('Reports/Externals'))->name('externals');
    Route::get('/commission-variance', fn () => \Inertia\Inertia::render('Reports/CommissionVariance'))->name('commission-variance');
});

Route::prefix('settings')->name('settings.')->group(function () {
    Route::get('/users', fn () => \Inertia\Inertia::render('Settings/Users'))->name('users');
    Route::get('/lead-sources', fn () => \Inertia\Inertia::render('Settings/LeadSources'))->name('lead-sources');
    Route::get('/db-backups', fn () => \Inertia\Inertia::render('Settings/DbBackups'))->name('db-backups');
    Route::get('/admin', fn () => \Inertia\Inertia::render('Settings/AdminSetting'))->name('admin');
    Route::get('/bill-to', fn () => \Inertia\Inertia::render('Settings/BillTo'))->name('bill-to');
});

Route::get('/kanban', [AdminController::class, 'kanban'])->name('kanban');
