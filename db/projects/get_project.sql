SELECT c.username AS project_creator, p.project_creator_id, p.deadline, p.created, p.project_title AS title FROM projects p
JOIN colab_user c ON c.id = p.project_creator_id
WHERE p.id = $1;