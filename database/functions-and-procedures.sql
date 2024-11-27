

create or replace function MakeLatLangDataPoint(latitude double precision, longitude double precision)
RETURNS speeddemonschema.LATLANG AS
    $$
    DECLARE
        result speeddemonschema.LATLANG;
    BEGIN
        result.latitude := latitude;
        result.longitude := longitude;
    RETURN result;
    END;
    $$ LANGUAGE plpgsql;


create or replace function HaservineEquation(changeInLat double precision, changeInLong double precision, latStart double precision, latEnd double precision)
RETURNS double precision AS
    $$
    DECLARE
        a double precision;
        c double precision;
        earthRadius double precision := 6371;
        totalDisatnce double precision;
    BEGIN
        --Haservine Formula
        a := sin(changeInLat / 2)^2 + cos(latStart) * cos(latEnd) * sin(changeInLong / 2)^2;
        c := 2 * atan2(sqrt(a), sqrt(1 - a));
        totalDisatnce := earthRadius * c;
        RETURN totalDisatnce;
END;
$$ LANGUAGE plpgsql;


create or replace function CalculateTotalDistance(coordinatesStart speeddemonschema.LATLANG, coordinatesEnd speeddemonschema.LATLANG)
RETURNS double precision AS
    $$
    DECLARE
        totalDistance double precision := 0;
        latStart double precision;
        longStart double precision;
        latEnd double precision;
        longEnd double precision;
        changeInLat double precision;
        changeInLong double precision;

    BEGIN

            latStart := radians(coordinatesStart.latitude);
            longStart := radians(coordinatesStart.longitude);
            latEnd := radians(coordinatesEnd.latitude);
            longEnd := radians(coordinatesEnd.longitude);

            changeInLat := latEnd - latStart;
            changeInLong := longEnd - longStart;

            totalDistance := totalDistance + HaservineEquation(changeInLat, changeInLong, latStart, latEnd);


        RETURN ROUND(totalDistance, 2);

    END;
    $$ LANGUAGE plpgsql;

--Adresses issue where autoincrementing was not working
CREATE SEQUENCE speeddemonschema.user_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE speeddemonschema.log_id_seq START WITH 1 INCREMENT BY 1;




CREATE OR REPLACE PROCEDURE InsertNewUser(p_user_name VARCHAR(20),
                                                p_user_email VARCHAR(30),
                                                p_password VARCHAR(20))
    LANGUAGE plpgsql
    AS $$
        DECLARE
            v_user_id INTEGER;
        BEGIN
            --Autoincrement v_user_id
            v_user_id := nextval('speeddemonschema.user_id_seq');

            INSERT INTO speeddemonschema.users (user_id, username, email, password)
            VALUES(v_user_id, p_user_name,p_user_email, p_password );
            EXCEPTION
                WHEN OTHERS THEN
                RAISE NOTICE 'Error occurred, Data Not Added: %', SQLERRM;
                ROLLBACK;
        END
    $$;

--IMPORTANT NOTE: Data must be read from user end in THIS order:
    --stating latitude
    --starting longitude
    --ending latitude
    --ending longitude
    --start time ('YYYY-MM-DD HH:MM:SS.mmm')
    --end time ('YYYY-MM-DD HH:MM:SS.mmm')
    --mode of transport

CREATE OR REPLACE PROCEDURE InsertActivityLogData(
                             p_username varchar(20),
                             p_start_position speeddemonschema.latlang,
                             p_end_position speeddemonschema.latlang,
                             p_time_elapsed TIME,
                             p_mode_of_transport VARCHAR(20)
                            )

     LANGUAGE plpgsql
     AS $$
         DECLARE
             v_user_id INTEGER := 0;
             v_log_id INTEGER:= 0;
             v_total_distance_traveled double precision;


         BEGIN
             v_total_distance_traveled := calculatetotaldistance(p_start_position, p_end_position);
             v_log_id := nextval('speeddemonschema.log_id_seq');

             --Sets value of v_user_id using p_username to satisfy foreign key constraints
             SELECT user_id INTO v_user_id
                FROM speeddemonschema.users
                WHERE username = p_username;

             INSERT INTO speeddemonschema.activity_log (log_id, mode_of_transport, user_id, time_elapsed, distance_traveled)
                 VALUES (v_log_id, p_mode_of_transport, v_user_id, p_time_elapsed, null);

             INSERT INTO speeddemonschema.location_tracker (log_id, start_point, end_point)
                 VALUES (v_log_id, p_start_position, p_end_position);

             UPDATE speeddemonschema.activity_log
                 SET distance_traveled = v_total_distance_traveled
                 WHERE log_id = v_log_id;
         EXCEPTION
             WHEN OTHERS THEN
             RAISE NOTICE 'Error occurred, Data Not Added: %', SQLERRM;
             ROLLBACK;
         END;
     $$;

--EXAMPLE CALL OF PROCEDURE InsertNewUser
 --Must Insert in this order:
    --username,
    -- email,
    -- password
CALL InsertNewUser(
    'amy',
    'amy@sutff.com',
    'pass'
     );

--EXAMPLE CALL OF PROCEDURE InsertActivityLogData
-- Must Insert in this order
    --username
    --start position latlang
    --end position latlang
    -- time elapsed
    --mode of transport
CALL InsertActivityLogData(
    'amy',
    (43.628184,-111.773525),
     (43.716342, -111.765832),
    '15:45:00',
    'bike'
    );







