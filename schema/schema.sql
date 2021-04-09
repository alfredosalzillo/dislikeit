create extension if not exists moddatetime schema extensions;

create table users
(
    id         uuid                            default auth.uid() not null primary key,
    username   varchar(125)                    null unique,
    avatar_url varchar(255)                    null,
    created_at timestamp                       default now(),
    updated_at timestamp                       default now(),
    version    numeric                         default 1
);

create trigger handle_updated_at
    before update
    on users
    for each row
execute procedure extensions.moddatetime(updated_at);

create policy "all can read all users" on public.users for all using (true) with check (true);

create
    policy "individuals can create their own users" on public.users for
    insert with check (auth.uid() = id);

create
    policy "individuals can update their own users" on public.users for
    update using (auth.uid() = id)
    with check (auth.uid() = id);

create
    policy "individuals can delete their own users" on public.users for
    delete using (auth.uid() = id);

CREATE OR REPLACE FUNCTION auth.create_new_public_user()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO public.users(id)
    VALUES (new.id);
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE auth.create_new_public_user();

create or replace view me as
select *
from public.users
where id = auth.uid();
