INSERT INTO projects_users(users_id, project_id)
VALUES ($1,$2);

SELECT c.id, c.username, c.role FROM colab_user c
JOIN projects_users pu ON c.id = pu.users_id
JOIN projects p ON p.id = pu.project_id 
WHERE pu.users_id = $1
AND pu.project_id = $2;