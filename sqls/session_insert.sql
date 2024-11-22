INSERT
    OR REPLACE INTO `sessions` (`session_id`, `valid_until`, `json_object`)
VALUES
    (:session_id, :valid_until, :json_object)