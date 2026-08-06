<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['title', 'background_file_id'])]
class Board extends Model
{

    use HasFactory;

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function lists(): HasMany
    {
        return $this->hasMany(BoardList::class, 'board_id');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'members', 'board_id', 'user_id')->withTimestamps();
    }

    public function backgroundFile(): BelongsTo
    {
        return $this->belongsTo(File::class, 'background_file_id');
    }
}
