CREATE TABLE IF NOT EXISTS `sessions` (
    `session_id` TEXT PRIMARY KEY,
    `valid_until` INTEGER,
    `json_object` TEXT
)