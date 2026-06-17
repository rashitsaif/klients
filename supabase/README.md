# Supabase migrations

Apply migrations from the project root with Supabase CLI after linking the project.

Required check for Stage 6:

- register user A and confirm one profile row is created;
- register user B and confirm one profile row is created;
- user A can read only user A profile;
- user B can read only user B profile;
- frontend update must not include role;
- database grants allow update only for full_name and company_name.
