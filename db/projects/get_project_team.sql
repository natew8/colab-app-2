SELECT c.id, c.username, c.role, c.profile_pic FROM colab_user c
JOIN projects_users pu ON c.id = pu.users_id
JOIN projects p ON p.id = pu.project_id
WHERE p.id =$1;