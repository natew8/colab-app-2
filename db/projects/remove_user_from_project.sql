DELETE FROM projects_users
WHERE users_id = $1 and project_id = $2;

SELECT c.id, c.username, c.role FROM colab_user c
JOIN projects_users pu ON c.id = pu.users_id
JOIN projects p ON p.id = pu.project_id
WHERE p.id = $2;