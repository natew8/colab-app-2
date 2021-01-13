SELECT co.id, co.subject_line, co.convo_created, co.body, cu.username,cu.profile_pic FROM conversations co
JOIN colab_user cu ON cu.id = co.author_id
WHERE co.song_id = $1
ORDER BY co.convo_created desc;