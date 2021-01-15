UPDATE colab_user
SET profile_pic = $2
WHERE id = $1
returning *;