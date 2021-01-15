UPDATE colab_user 
SET email = $2
WHERE id = $1
AND email <> $2;


UPDATE colab_user
SET username = $3
WHERE id = $1
AND username <> $3;


UPDATE colab_user
SET role = $4
WHERE id = $1
AND role <> $4
returning *;
