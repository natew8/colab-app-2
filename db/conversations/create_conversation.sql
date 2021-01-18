INSERT INTO conversations (author_id, subject_line,song_time, body, song_version, song_id)
VALUES ($1,$2,$3,$4,$5,$6)
returning *;