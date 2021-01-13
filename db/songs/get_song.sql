SELECT song_title AS title, artist_name AS artist, song_key AS key, song_bpm AS bpm, song_time AS time, created, id, status FROM songs
WHERE id = $1;