SELECT
    activity_log.log_id AS "log_id",
    users.username AS "username",
    mode_of_transport AS "mode_of_transport",
    time_elapsed AS "time",
    distance_traveled AS "distance_traveled",
    location_tracker.start_point AS "start_point",
    location_tracker.end_point AS "end_point"

FROM speeddemonschema.activity_log AS activity_log

JOIN
    speeddemonschema.location_tracker AS location_tracker 
    ON activity_log.log_id = location_tracker.log_id;
JOIN 
    speeddemonschema.user AS users
    ON activity_log.user_id = users.user_id;


    
