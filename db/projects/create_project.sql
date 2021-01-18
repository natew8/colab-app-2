INSERT INTO projects (project_title, deadline, project_creator_id)
VALUES ($1,$2,$3)
returning *