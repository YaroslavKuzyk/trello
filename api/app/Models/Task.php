<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'title',
    'sort_order',
    'list_id',
    'assignee_id',
    'is_completed',
    'start_date',
    'due_date',
    'content',
    'cover_file_id',
])]
class Task extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
            'start_date' => 'datetime',
            'due_date' => 'datetime',
        ];
    }

    public function list(): BelongsTo
    {
        return $this->belongsTo(BoardList::class, 'list_id');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function tags(): HasMany
    {
        return $this->hasMany(Tag::class, 'task_id');
    }

    public function files(): BelongsToMany
    {
        return $this->belongsToMany(File::class, 'task_files', 'task_id', 'file_id');
    }

    public function checkpoints(): HasMany
    {
        return $this->hasMany(TaskCheckpoint::class, 'task_id');
    }

    public function coverFile(): BelongsTo
    {
        return $this->belongsTo(File::class, 'cover_file_id');
    }
}
