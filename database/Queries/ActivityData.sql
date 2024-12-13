SELECT
    activity_log.log_id AS "log_id",
    users.username AS "username",
    activity_log.route_name AS "route_name",
    activity_log.mode_of_transport AS "mode_of_transport",  -- Ensure this column is in activity_log
    activity_log.time_elapsed AS "time_elapsed",  -- Renamed to avoid confusion with SQL TIME keyword
    round(cast(activity_log.distance_traveled AS numeric), 3) AS "distance_traveled",
    location_tracker.start_point AS "start_point",
    location_tracker.end_point AS "end_point"
FROM speeddemonschema.activity_log AS activity_log
JOIN speeddemonschema.location_tracker AS location_tracker
    ON activity_log.log_id = location_tracker.log_id
JOIN speeddemonschema.users AS users
    ON activity_log.user_id = users.user_id
ORDER BY log_id desc LIMIT 10;