INSERT INTO song_versions (song_id,uploader_id,version_title,audio_file)
VALUES($1,$2,$3,$4)
returning *;