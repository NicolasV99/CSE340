CREATE TYPE public.account_type AS ENUM
    ('Cliente', 'Employee', 'Admin');

ALTER TYPE public.account_type
    OWNER TO cse340;