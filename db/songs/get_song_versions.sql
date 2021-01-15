SELECT version_title, upload_date, audio_file FROM song_versions
WHERE song_id = $1;