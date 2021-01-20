INSERT INTO comments (convo_id, author_id, comment)
VALUES ($1, $2, $3);


SELECT cu.profile_pic, cu.username, co.comment, co.date_created FROM comments co
JOIN colab_user cu ON cu.id = co.author_id
JOIN conversations cv ON cv.id = co.convo_id
WHERE cv.id = $1
ORDER BY co.date_created ;