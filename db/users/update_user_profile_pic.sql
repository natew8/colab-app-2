UPDATE colab_user
SET profile_pic = $2
WHERE id = $1;


SELECT username, profile_pic FROM colab_user
WHERE id = $1;