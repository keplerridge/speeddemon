create type startendtime as
(
    start_time timestamp,
    end_time   timestamp
);

create type latlang as
(
    latitude  double precision,
    longitude double precision
);

create table users
(
    user_id  serial primary key,
    username varchar(20) not null unique,
    email    varchar(30) unique,
    password varchar(20) not null
);

create table activity_log
(
    log_id            serial primary key,
    mode_of_transport varchar(20),
    user_id           integer references users,
    time_elapsed      time,
    distance_traveled double precision
);

create table location_tracker
(
    start_point speeddemonschema.latlang,
    end_point   speeddemonschema.latlang,
    log_id      integer not null references activity_log
);

create table time_tracker
(
    start_end_time speeddemonschema.startendtime not null,
    log_id         integer references activity_log
);