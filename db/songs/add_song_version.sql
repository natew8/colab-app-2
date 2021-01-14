INSERT INTO song_versions (song_id,uploader_id,version_title,upload_date,audio_file)
VALUES($1,$2,$3,now(),$4)
returning *;