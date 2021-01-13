SELECT username, profile_pic, role, id FROM colab_user
WHERE id != $1;