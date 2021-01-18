DELETE FROM projects
WHERE id = $1

returning *
