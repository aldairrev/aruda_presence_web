<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LinkMusicUrls extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'music:link {artist : The artist name} {title : The song title} {--spotify= : The Spotify link} {--youtube= : The YouTube link}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manually link Spotify and YouTube URLs to a track in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $artist = $this->argument('artist');
        $title = $this->argument('title');
        $spotify = $this->option('spotify');
        $youtube = $this->option('youtube');

        if (!$spotify && !$youtube) {
            $this->error('You must specify at least one link: --spotify or --youtube');
            return 1;
        }

        $track = \App\Models\MusicTrack::whereRaw('LOWER(artist) = ?', [strtolower(trim($artist))])
            ->whereRaw('LOWER(title) = ?', [strtolower(trim($title))])
            ->first();

        if ($track) {
            $data = [];
            if ($spotify) $data['spotify_url'] = $spotify;
            if ($youtube) $data['youtube_url'] = $youtube;

            $track->update($data);
            $this->info("Updated links for existing track: '{$track->title}' by {$track->artist}");
        } else {
            $lastfmUrl = "https://www.last.fm/music/" . urlencode($artist) . "/_/" . urlencode($title);

            $track = \App\Models\MusicTrack::create([
                'artist' => $artist,
                'title' => $title,
                'lastfm_url' => $lastfmUrl,
                'spotify_url' => $spotify,
                'youtube_url' => $youtube,
            ]);

            $this->info("Created new track record and linked: '{$track->title}' by {$track->artist}");
        }

        return 0;
    }
}
