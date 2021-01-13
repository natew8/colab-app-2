SELECT c.subject_line, c.song_time, c.song_version, c.body, c.convo_created, cu.profile_pic, cu.username FROM conversations c
JOIN colab_user cu ON cu.id = c.author_id 
WHERE c.id = $1;