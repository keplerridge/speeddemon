--Truncate all Tables
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'speeddemonschema') LOOP
        EXECUTE 'TRUNCATE TABLE speeddemonschema.' || r.tablename || ' RESTART IDENTITY CASCADE';
    END LOOP;
END $$;

