<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use App\Models\MusicTrack;

class PresenceController extends Controller
{
    /**
     * Get the current presence status from Steam and Last.fm
     */
    public function getPresence(Request $request)
    {
        $lang = $request->header('Accept-Language', 'en');
        if (in_array($lang, ['en', 'ja'])) {
            app()->setLocale($lang);
        }

        $includeSteam = $request->query('steam') === 'true' || $request->query('steam') === '1';
        $includeMusic = $request->query('music') === 'true' || $request->query('music') === '1';
        $cacheKey = "presence_data_{$lang}_steam_" . ($includeSteam ? '1' : '0') . "_music_" . ($includeMusic ? '1' : '0');

        return Cache::remember($cacheKey, 8, function () use ($includeSteam, $includeMusic) {
            return [
                'steam' => $includeSteam ? $this->fetchSteamData() : [
                    'status' => 'disconnected',
                    'user' => [
                        'name' => '',
                        'avatar' => '',
                        'profile_url' => '#'
                    ],
                    'game' => null
                ],
                'music' => $includeMusic ? $this->fetchLastfmData() : [
                    'status' => 'disconnected',
                    'now_playing' => false,
                    'last_listened' => null,
                    'track' => null
                ],
                'timestamp' => now()->toIso8601String(),
            ];
        });
    }

    /**
     * Fetch player data from Steam API
     */
    private function fetchSteamData()
    {
        $apiKey = env('STEAM_API_KEY');
        $steamId = env('STEAM_ID');

        if (!$apiKey || !$steamId) {
            return [
                'status' => 'offline',
                'user' => [
                    'name' => '',
                    'avatar' => '',
                    'profile_url' => '#'
                ],
                'game' => null
            ];
        }

        try {
            $response = Http::timeout(5)->get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/", [
                'key' => $apiKey,
                'steamids' => $steamId
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $players = $data['response']['players'] ?? [];

                if (!empty($players)) {
                    $player = $players[0];
                    
                    $personaState = $player['personastate'] ?? 0;
                    $gameId = $player['gameid'] ?? null;
                    $gameExtraInfo = $player['gameextrainfo'] ?? null;

                    $status = 'offline';
                    if ($gameId) {
                        $status = 'ingame';
                    } elseif ($personaState == 3 || $personaState == 4) {
                        $status = 'away';
                    } elseif ($personaState > 0) {
                        $status = 'online';
                    }

                    $gameData = null;
                    if ($gameId) {
                        $gameName = $gameExtraInfo ?: $this->fetchGameNameFromStore($gameId);
                        $gameData = [
                            'id' => $gameId,
                            'name' => $gameName,
                            'header_image' => "https://cdn.cloudflare.steamstatic.com/steam/apps/{$gameId}/header.jpg",
                            'store_url' => "https://store.steampowered.com/app/{$gameId}/"
                        ];
                    }

                    return [
                        'status' => $status,
                        'user' => [
                            'name' => $player['personaname'] ?? __('messages.player'),
                            'avatar' => $player['avatarfull'] ?? 'https://avatars.githubusercontent.com/u/9919?s=200',
                            'profile_url' => $player['profileurl'] ?? 'https://steamcommunity.com/'
                        ],
                        'game' => $gameData
                    ];
                }
            }
        } catch (\Exception $e) {
            // Log or fallback
        }

        return [
            'status' => 'offline',
            'user' => [
                'name' => '',
                'avatar' => '',
                'profile_url' => '#'
            ],
            'game' => null
        ];
    }

    /**
     * Fetch game name from Steam Store API as a fallback, and cache it forever (since AppID names don't change)
     */
    private function fetchGameNameFromStore($gameId)
    {
        return Cache::remember("steam_game_name_{$gameId}", 86400 * 30, function () use ($gameId) {
            try {
                $response = Http::timeout(3)->get("https://store.steampowered.com/api/appdetails", [
                    'appids' => $gameId
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    if (isset($data[$gameId]['success']) && $data[$gameId]['success']) {
                        return $data[$gameId]['data']['name'] ?? __('messages.steam_game');
                    }
                }
            } catch (\Exception $e) {
                // Return fallback
            }
            return __('messages.steam_game');
        });
    }

    /**
     * Fetch currently playing/recent tracks from Last.fm
     */
    private function fetchLastfmData()
    {
        $apiKey = env('LASTFM_API_KEY');
        $username = env('LASTFM_USERNAME');

        if (!$apiKey || !$username) {
            return [
                'now_playing' => false,
                'track' => null
            ];
        }

        try {
            $response = Http::timeout(5)->get("https://ws.audioscrobbler.com/2.0/", [
                'method' => 'user.getrecenttracks',
                'user' => $username,
                'api_key' => $apiKey,
                'format' => 'json',
                'limit' => 1
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $tracks = $data['recenttracks']['track'] ?? [];

                if (!empty($tracks)) {
                    $track = isset($tracks[0]) ? $tracks[0] : $tracks;

                    $nowPlaying = isset($track['@attr']['nowplaying']) && $track['@attr']['nowplaying'] === 'true';
                    
                    $images = $track['image'] ?? [];
                    $imageUrl = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop'; // fallback
                    
                    if (!empty($images)) {
                        foreach ($images as $img) {
                            if ($img['size'] === 'large' || $img['size'] === 'extralarge') {
                                if (!empty($img['#text'])) {
                                    $imageUrl = $img['#text'];
                                }
                            }
                        }
                    }

                    $lastListened = null;
                    if (!$nowPlaying && isset($track['date']['uts'])) {
                        $uts = (int)$track['date']['uts'];
                        $diff = now()->timestamp - $uts;
                        if ($diff < 60) {
                            $lastListened = __('messages.just_now');
                        } elseif ($diff < 3600) {
                            $mins = round($diff / 60);
                            $lastListened = __('messages.mins_ago', ['mins' => $mins]);
                        } elseif ($diff < 86400) {
                            $hours = round($diff / 3600);
                            $lastListened = __('messages.hours_ago', ['hours' => $hours]);
                        } else {
                            $lastListened = date('d M H:i', $uts);
                        }
                    }

                    $lastfmUrl = $track['url'] ?? '#';
                    $title = $track['name'] ?? __('messages.unknown_track');
                    $artist = $track['artist']['#text'] ?? __('messages.unknown_artist');
                    $album = $track['album']['#text'] ?? __('messages.unknown_album');

                    $dbTrack = MusicTrack::firstOrCreate(
                        ['lastfm_url' => $lastfmUrl],
                        [
                            'artist' => $artist,
                            'title' => $title,
                            'album' => $album,
                            'image_url' => $imageUrl,
                        ]
                    );

                    if ($album && empty($dbTrack->album_artist)) {
                        $albumArtist = $this->fetchAlbumArtist($artist, $album);
                        if ($albumArtist) {
                            $dbTrack->update(['album_artist' => $albumArtist]);
                        }
                    }

                    if ($dbTrack->image_url !== $imageUrl || $dbTrack->album !== $album || $dbTrack->artist !== $artist || $dbTrack->title !== $title) {
                        $dbTrack->update([
                            'artist' => $artist,
                            'title' => $title,
                            'album' => $album,
                            'image_url' => $imageUrl,
                        ]);
                    }

                    return [
                        'now_playing' => $nowPlaying,
                        'last_listened' => $lastListened,
                        'track' => [
                            'title' => $dbTrack->title,
                            'artist' => $dbTrack->artist,
                            'album' => $dbTrack->album,
                            'album_artist' => $dbTrack->album_artist,
                            'image' => $dbTrack->image_url ?: $imageUrl,
                            'url' => $dbTrack->lastfm_url,
                            'spotify_url' => $dbTrack->spotify_url,
                            'youtube_url' => $dbTrack->youtube_url,
                        ]
                    ];
                }
            }
        } catch (\Exception $e) {
            // Fallback
        }

        return [
            'now_playing' => false,
            'last_listened' => null,
            'track' => null
        ];
    }

    /**
     * Fetch album details to get the Album Artist
     */
    private function fetchAlbumArtist($artist, $album)
    {
        $apiKey = env('LASTFM_API_KEY');
        if (!$apiKey || empty($artist) || empty($album)) {
            return null;
        }

        try {
            $response = Http::timeout(3)->get("https://ws.audioscrobbler.com/2.0/", [
                'method' => 'album.getinfo',
                'artist' => $artist,
                'album' => $album,
                'api_key' => $apiKey,
                'format' => 'json'
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['album']['artist'] ?? null;
            }
        } catch (\Exception $e) {
            // Ignore
        }

        return null;
    }
}
