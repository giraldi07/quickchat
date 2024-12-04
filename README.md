

## Features

- **User Authentication**: Secure signup and signin processes, including password reset and account confirmation.
- **Profile Management**: Users can update their profiles, including setting a profile picture and editing personal information.
- **Real-Time Chat**: Send and receive messages instantly.
- **Protected Routes**: Access control for authenticated users, protecting sensitive routes and data.
- **Responsive Design**: A user-friendly interface that adapts to various screen sizes and devices.
- **Dark Mode**: Toggle between dark and light themes based on user preference.
- **Sidebar and Menus**: Easy navigation with a collapsible sidebar, friend list, and account settings.
- **Search Functionality**: Quickly find and connect with other users.
- **Error Handling**: Toast notifications to inform users of errors and important updates.
- **Optimized Performance**: Efficient state management and data fetching with React Query.

## Database Design

I've kept the Supabase setup as simple as possible, focusing more on the React side of things. In the public schema, there are two tables and two views derived from `auth.users`. I opted for views instead of separate tables to avoid creating triggers and keeping user data management simpler. Views update automatically based on `auth.users`.

### Tables and Views

#### Tables

1. **Conversations**
2. **Messages**

#### Views

1. **Users**
2. **Usernames**

### Why a Separate Usernames Table?

I have a `username` column in the `users` view, so why a separate `usernames` table? It's for security. On the signup page, the user isn't authenticated yet but needs to pick a username. When a username is typed, it checks the `usernames` table to see if it's already taken, accessible to anonymous users. This avoids giving anonymous users access to the `users` table, which is reserved for authenticated users.

### Conversations Table

The `conversations` table handles the connections between two users. Real-time updates are enabled for this table.

**Row Level Security:**

- **INSERT**: Applied to authenticated users
- **SELECT**: Applied to authenticated users
- **UPDATE** (especially the `last_message` column): Applied to authenticated users

**Columns:**

- `id`: UUID, Primary, Default Value: `gen_random_uuid()`
- `created_at`: Timestamptz, Default Value: `now()`
- `user1_id`: UUID, Default Value: `auth.uid()`
- `user2_id`: UUID
- `last_message`: JSONB, Nullable

### Messages Table

The `messages` table stores message content and related information. Real-time updates are enabled for this table.

**Row Level Security:**

- **INSERT**: Applied to authenticated users
- **SELECT**: Applied to authenticated users

**Columns:**

- `id`: UUID, Primary
- `created_at`: Timestamptz, Default Value: `now()`
- `sender_id`: UUID, Default Value: `auth.uid()`
- `conversation_id`: UUID
- `content`: Text

### Views

#### Usernames View

The `usernames` view has a single column for storing usernames.

**Columns:**

- `username`: Text

**SQL Creation:**

```sql
CREATE VIEW public.usernames AS
SELECT
  raw_user_meta_data ->> 'username' AS username
FROM auth.users;
```

**Grant Access:**

```sql
GRANT SELECT ON TABLE public.usernames TO anon;
```

#### Users View

The `users` view contains essential user information.

**Columns:**

- `id`: UUID
- `email`: Varchar
- `username`: Text
- `fullname`: Text
- `avatar_url`: Text
- `bio`: Text

**SQL Creation:**

```sql
CREATE VIEW public.users AS
SELECT
  id,
  email,
  raw_user_meta_data->>'username' AS username,
  raw_user_meta_data->>'fullname' AS fullname,
  raw_user_meta_data->>'avatar_url' AS avatar_url,
  raw_user_meta_data->>'bio' AS bio
FROM auth.users;
```

**Grant Access:**

```sql
GRANT SELECT ON TABLE public.users TO authenticated;
```

### Buckets

A single bucket is used to store user profile pictures.

**Bucket Name:**

- `avatars`

**Configuration:**

- Public bucket: Enabled
- Restrict file upload size: Enabled
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

## Security Considerations

Since Convayto is a React web app, it doesn’t have server-side security measures built in. Instead, I rely on Supabase for backend services and database management, which provides the necessary security features.

- **Row-Level Security**: Supabase's Row-Level Security (RLS) ensures users only access and modify authorized data.

- **Authentication and Authorization**: I integrated Supabase's authentication service to handle user registration, login, and password reset processes. Supabase provides secure and reliable authentication mechanisms, including email verification and password hashing, to protect user accounts.

- **Protected Routes**: To restrict access to certain pages and features only to authenticated users I used protected routes. This prevents unauthorized access to sensitive information and actions.

## Challenges and Solutions

During the development of Convayto, I encountered several challenges and came up with these solutions:

1. **Real-time Messaging**: Getting real-time messaging to work was tricky because everything needed to update instantly. I used Supabase's real-time features along with React Query to make sure messages updated smoothly and right away.

2. **User Authentication**: I relied on Supabase's built-in authentication tools, including password reset, account confirmation, and secure signup/signin processes to make sure user authentication was secure.

3. **Responsive Design**: Making the app look good on different screen sizes and devices was a challenge. I used Tailwind CSS's responsive utility classes to create a user interface that adapts well to any screen size.

4. **Error Handling**: To handle errors properly and display clear messages when something goes wrong, I used the `react-hot-toast` package to show informative toast notifications.

5. **Optimized Performance**: Handling a large amount of data and maintaining performance was a significant challenge. To address this, I implemented infinite pagination for messages, allowing the app to fetch chunks of messages as you scroll up. This approach keeps initial load times short and ensures smooth performance, even with extensive chat histories. Additionally, when a user logs in, it prefetches the first ten conversation histories.

## Future Improvements

Here are some ideas for future enhancements to Convayto that I plan to implement as I continue learning other technologies:

- **Message Editing and Deletion**: Allow users to modify and remove their messages.
- **Message Reactions**: Enable emoji reactions for messages.
- **File Sharing**: Support sharing images and documents in chat.
- **Notification System**: Introduce notifications for new messages or updates.
- **Emoji Picker**: Add an emoji picker for easier message personalization.
- **TypeScript Integration**: Update the entire project with TypeScript for better type safety and code maintainability.

### Project Structure

The project is organized for clarity and modularity, following a typical React application structure:

- **Public Assets**

  - `public/`: Contains static assets, including fonts, images, `robots.txt`, and `sitemap.xml`.

- **Source Code**
  - `src/`: Main application source code.
    - `main.jsx`: Main entry point for rendering the application.
    - `App.jsx`: Application entry point.
    - `components/`: Reusable UI components.
    - `contexts/`: Global state management.
    - `features/`: Feature-specific modules (authentication, messaging, sidebar, user profile, user search).
    - `services/`: External service integrations, e.g., Supabase.
    - `styles/`: Custom and global styles.
    - `utils/`: Utility functions and hooks.

## Contributing

Contributions to Convayto are welcome! Before contributing, please ensure you follow these guidelines:

### .env File

Convayto uses environment variables stored in a `.env` file to manage sensitive information. Ensure you have the following variables set up:

```plaintext
VITE_SUPABASE_URL = https://your-supabase-url.com
VITE_SUPABASE_KEY = your-supabase-key
```

You can find a template for these variables in `.env.example`.

### Installation

To contribute to Convayto, follow these steps:

- Fork the repository and clone it locally.
- Install dependencies: `npm install`.
- Set up your `.env` file using `.env.example` as a template.
- Make your changes and test them thoroughly.
- Submit a pull request with a clear description of your changes and their purpose.

