<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicTrack extends Model
{
    protected $fillable = [
        'artist',
        'title',
        'album',
        'album_artist',
        'image_url',
        'lastfm_url',
        'spotify_url',
        'youtube_url',
    ];
}
