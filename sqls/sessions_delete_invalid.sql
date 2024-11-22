DELETE FROM
    `sessions`
WHERE
    `valid_until` < :date