create or replace function MakeStartAndEndTime(starttime TIMESTAMP, endtime TIMESTAMP)
RETURNS speeddemonschema.startendtime AS
    $$
    DECLARE
        result speeddemonschema.STARTENDTIME;
    BEGIN
        result.start_time := starttime;
        result.end_time := endtime;
    RETURN result;
    END;
    $$ LANGUAGE plpgsql;

drop function makelatlangdatapoint(latitude double precision, longitude double precision)
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

        RETURN totalDistance;

    END;
    $$ LANGUAGE plpgsql;


CREATE FUNCTION CalculateTimeElapsed(starttime TIMESTAMP, endtime TIMESTAMP)
RETURNS TIME AS
$$
    BEGIN
        RETURN (endtime - starttime)::TIME;
    END
$$ LANGUAGE plpgsql;

--Adresses issue where autoincrementing was not working
CREATE SEQUENCE speeddemonschema.user_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE speeddemonschema.log_id_seq START WITH 1 INCREMENT BY 1;

--IMPORTANT NOTE: Data must be read from user end in THIS order:
    --username
    --email
    --password
    --stating latitude
    --starting longitude
    --ending latitude
    --ending longitude
    --start time ('YYYY-MM-DD HH:MM:SS.mmm')
    --end time ('YYYY-MM-DD HH:MM:SS.mmm')
    --mode of transport

CREATE OR REPLACE PROCEDURE InsertActivityLogData(
                             p_user_name VARCHAR(20),
                             p_user_email VARCHAR(30),
                             p_password VARCHAR(20),
                             p_start_point_lat double precision,
                             p_start_point_long double precision,
                             p_end_point_lat double precision,
                             p_end_point_long double precision,
                             p_start_time TIMESTAMP,
                             p_end_time TIMESTAMP,
                             p_mode_of_transport VARCHAR(20)
                            )

     LANGUAGE plpgsql
     AS $$
         DECLARE
             v_user_id INTEGER := 0;
             v_log_id INTEGER:= 0;
             v_temp_log_id INTEGER;
             v_start_point speeddemonschema.latlang;
             v_end_point speeddemonschema.latlang;
             v_time_elapsed time;
             v_total_distance_traveled double precision;


         BEGIN
             v_start_point := MakeLatLangDataPoint(p_start_point_lat, p_start_point_long);
             v_end_point := MakeLatLangDataPoint(p_end_point_lat, p_end_point_long);
             v_time_elapsed := CalculateTimeElapsed(p_start_time, p_end_time);
             v_total_distance_traveled := calculatetotaldistance(v_start_point, v_end_point);
             v_user_id := nextval('speeddemonschema.user_id_seq');
             v_log_id := nextval('speeddemonschema.log_id_seq');


             INSERT INTO speeddemonschema.users (user_id, username, email, password)
                 VALUES(v_user_id, p_user_name,p_user_email, p_password );

             INSERT INTO speeddemonschema.activity_log (log_id, mode_of_transport, user_id, time_elapsed, distance_traveled)
                 VALUES (v_log_id, p_mode_of_transport, v_user_id, v_time_elapsed, null);

             INSERT INTO speeddemonschema.location_tracker (log_id, start_point, end_point)
                 VALUES (v_log_id, v_start_point,v_end_point) --need to make autoincrement
                 RETURNING log_id INTO v_temp_log_id;

             UPDATE speeddemonschema.activity_log
                 SET distance_traveled = v_total_distance_traveled
                 WHERE log_id = v_log_id;
         EXCEPTION
             WHEN OTHERS THEN
             RAISE NOTICE 'Error occurred, Data Not Added: %', SQLERRM;
         END;
     $$;

CALL InsertActivityLogData(
    'harris',
    'hayden@sutff.com',
    'mypassword',
    43.628184,
    -111.773525,
    43.716342,
    -111.765832,
    '2024-11-07 10:35:20',
    '2024-11-07 15:45:00',
    'bike'
);
