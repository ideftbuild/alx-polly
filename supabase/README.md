# Database Schema Setup

This directory contains the database schema for the Polling App with QR Code Sharing.

## Files

- `schema.sql` - Complete database schema with tables, constraints, triggers, and RLS policies

## Setup Instructions

### 1. Supabase Project Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

### 2. Database Schema Installation

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `schema.sql`
4. Execute the SQL script

Alternatively, you can use the Supabase CLI:

```bash
supabase db reset
supabase db push
```

### 3. Schema Overview

The schema includes the following tables:

#### `users`
- Extends Supabase auth.users
- Stores user profile information (name, avatar)
- Automatically populated when users sign up

#### `polls`
- Stores poll information (title, description, settings)
- Links to creator via `creator_id`
- Tracks poll status (active, inactive, expired)
- Supports expiration dates and multiple vote settings

#### `poll_options`
- Stores individual poll options
- Links to parent poll via `poll_id`
- Tracks vote count for each option

#### `votes`
- Records individual votes
- Links user, poll, and option
- Enforces single vote per poll (unless multiple votes allowed)

### 4. Key Features

#### Automatic Vote Counting
- Triggers automatically update vote counts when votes are added/removed
- Poll total votes are maintained automatically

#### Row Level Security (RLS)
- Users can only view active polls
- Users can only modify their own polls
- Users can only vote on active polls
- Respects poll settings (multiple votes allowed)

#### Data Integrity
- Foreign key constraints ensure data consistency
- Unique constraints prevent duplicate votes
- Automatic timestamp updates

#### Performance
- Indexes on frequently queried columns
- Optimized for common query patterns

### 5. Helper Functions

#### `can_user_vote(poll_uuid, user_uuid)`
- Checks if a user can vote on a specific poll
- Respects poll settings and existing votes
- Returns boolean

#### `handle_new_user()`
- Automatically creates user profile when auth user is created
- Triggered by Supabase auth system

### 6. Usage Examples

#### Check if user can vote
```sql
SELECT can_user_vote('poll-uuid', 'user-uuid');
```

#### Get active polls with vote counts
```sql
SELECT p.*, po.text, po.votes
FROM polls p
JOIN poll_options po ON p.id = po.poll_id
WHERE p.status = 'active'
ORDER BY p.created_at DESC;
```

#### Get user's polls
```sql
SELECT * FROM polls
WHERE creator_id = auth.uid()
ORDER BY created_at DESC;
```

## Security Notes

- All tables have Row Level Security enabled
- Users can only access data they're authorized to see
- Poll creators have full control over their polls
- Anonymous users can view active polls but cannot vote without authentication



