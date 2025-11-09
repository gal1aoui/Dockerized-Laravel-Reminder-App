# Reminder App - Dockerized Laravel + React + Inertia

A full-stack web application for managing reminders with browser notifications. Built with Laravel 12, React, TypeScript, Inertia.js, Docker, and MySQL.

## Overview

This application demonstrates a complete modern web development stack with:
- **Backend**: Laravel 12 with REST API
- **Frontend**: React + TypeScript with Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL 8.0
- **Containerization**: Docker + Docker Compose
- **Notifications**: Web Notifications API

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 12, PHP 8.3 |
| Frontend | React 18, TypeScript, Inertia.js |
| Styling | Tailwind CSS |
| Database | MySQL 8.0 |
| Containerization | Docker, Docker Compose |
| Build Tool | Vite |
| Package Manager | Composer, npm |

## Features

- ✅ User Authentication (Register/Login/Logout)
- ✅ Create, Read, Update, Delete Reminders
- ✅ Set Due Dates and Times
- ✅ Browser Notifications (Web Notifications API)
- ✅ Responsive UI with Tailwind CSS
- ✅ Full TypeScript Type Safety
- ✅ Dockerized Setup (No Local PHP/MySQL Setup Required)

## Prerequisites

Before you begin, ensure you have installed:

- **Docker**: [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Included with Docker Desktop
- **PowerShell** (Windows) or Terminal (Mac/Linux)
- **Text Editor**: VS Code, Sublime, or any editor

> No need to install PHP, MySQL, or Node.js locally - Docker handles everything!

## Installation & Setup

### Step 1: Clone or Download Project

\`\`\`bash
cd your-projects-folder
# If cloned from Git
git clone <repository-url>
cd reminder-app

# If downloaded as ZIP, extract and navigate into the folder
\`\`\`

### Step 2: Create Environment File

Copy the example environment file:

\`\`\`bash
copy .env.example .env
\`\`\`

Or manually create `.env` with:

\`\`\`env
APP_NAME="Reminder App"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

APP_KEY=
APP_CIPHER=AES-256-CBC

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=reminder_db
DB_USERNAME=reminder_user
DB_PASSWORD=reminder_password

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=cookie
\`\`\`

### Step 3: Start Docker Containers

\`\`\`bash
docker-compose up -d
\`\`\`

This starts three containers:
- `reminder_app` (Laravel + PHP-FPM)
- `reminder_db` (MySQL)
- `reminder_nginx` (Nginx Web Server)

Check status:
\`\`\`bash
docker-compose ps
\`\`\`

### Step 4: Generate Application Key

\`\`\`bash
docker-compose exec app php artisan key:generate
\`\`\`

Verify your `.env` file now has `APP_KEY=base64:...`

### Step 5: Run Database Migrations

\`\`\`bash
docker-compose exec app php artisan migrate
\`\`\`

You should see:
\`\`\`
Migrating: 2024_01_01_000000_create_users_table
Migrated: 2024_01_01_000000_create_users_table
Migrating: 2024_01_01_000001_create_reminders_table
Migrated: 2024_01_01_000001_create_reminders_table
\`\`\`

### Step 6: Build Frontend Assets

\`\`\`bash
docker-compose exec app npm run build
\`\`\`

Wait for completion. You should see `✓ built in XXXms`

### Step 7: Access the App

Open your browser and visit:

\`\`\`
http://localhost
\`\`\`

You'll be redirected to the login page.

## Quick Start

Once installed, here's the typical workflow:

\`\`\`bash
# Start app
docker-compose up -d

# Build assets (after code changes)
docker-compose exec app npm run build

# View logs
docker-compose logs -f app

# Stop app
docker-compose down
\`\`\`

## Project Structure

\`\`\`
reminder-app/
├── app/                           # Laravel application code
│   ├── Models/
│   │   ├── User.php              # User model
│   │   └── Reminder.php          # Reminder model
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php    # Auth logic
│   │   │   └── ReminderController.php # CRUD logic
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Policies/
│       └── ReminderPolicy.php    # Authorization
├── database/
│   ├── migrations/               # Database schemas
│   └── seeders/                  # Database seeders
├── resources/
│   ├── js/
│   │   ├── app.tsx              # React app entry point
│   │   ├── Pages/               # Inertia pages
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   └── Reminders/
│   │   │       ├── Index.tsx
│   │   │       ├── Create.tsx
│   │   │       └── Edit.tsx
│   │   ├── Layouts/
│   │   │   └── AppLayout.tsx    # Main layout
│   │   ├── Components/
│   │   │   └── ReminderForm.tsx # Reminder form
│   │   └── types/
│   │       └── index.ts         # TypeScript types
│   ├── css/
│   │   └── app.css              # Tailwind CSS
│   └── views/
│       └── app.blade.php        # Main Blade template
├── routes/
│   └── web.php                  # Web routes
├── docker/
│   └── nginx.conf               # Nginx configuration
├── Dockerfile                   # Docker image config
├── docker-compose.yml           # Docker services
├── vite.config.ts               # Vite build config
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
└── .env                         # Environment variables
\`\`\`

## Using the App

### Register & Login

1. Visit `http://localhost`
2. Click "Register"
3. Enter name, email, and password
4. Click "Register"
5. You're automatically logged in and redirected to reminders page

### Create a Reminder

1. Click "+ Create Reminder"
2. Fill in:
   - **Title**: Reminder name (required)
   - **Description**: Additional details (optional)
   - **Due Date & Time**: When the reminder should trigger
3. Click "Create Reminder"
4. You'll be redirected to the reminders list

### Edit a Reminder

1. On the reminders page, click "Edit" on any reminder
2. Update the details
3. Click "Update Reminder"

### Delete a Reminder

1. Click "Delete" on any reminder
2. Confirm deletion

### Browser Notifications

- Notifications are requested when you first log in
- Allow notifications in your browser
- When a reminder is due, you'll see a browser notification
- **Note**: Works on localhost; requires HTTPS in production

## Docker Commands Reference

| Command | Purpose |
|---------|---------|
| `docker-compose up -d` | Start all containers |
| `docker-compose down` | Stop all containers |
| `docker-compose ps` | View container status |
| `docker-compose logs -f app` | View Laravel logs |
| `docker-compose exec app bash` | Access app container shell |
| `docker-compose restart app` | Restart app container |
| `docker-compose build --no-cache` | Rebuild images |

## Development Workflow

### Backend Development

Changes to PHP/Laravel files auto-reload. No restart needed.

### Frontend Development (Watch Mode)

Watch for React/TypeScript changes:

\`\`\`bash
docker-compose exec app npm run dev
\`\`\`

Assets rebuild automatically. Refresh your browser to see changes.

### Database Commands

\`\`\`bash
# Run migrations
docker-compose exec app php artisan migrate

# Reset database
docker-compose exec app php artisan migrate:fresh

# Access database shell
docker-compose exec db mysql -u reminder_user -p reminder_db
# Password: reminder_password
\`\`\`

### Laravel Commands

\`\`\`bash
# Clear all caches
docker-compose exec app php artisan cache:clear

# Tinker (interactive shell)
docker-compose exec app php artisan tinker

# Create new model
docker-compose exec app php artisan make:model ModelName

# Create new controller
docker-compose exec app php artisan make:controller ControllerName
\`\`\`

## Troubleshooting

### Port 80 Already in Use

Edit `docker-compose.yml`:

\`\`\`yaml
nginx:
  ports:
    - "8080:80"  # Change to 8080:80
\`\`\`

Then access: `http://localhost:8080`

### Encryption Key Error

\`\`\`
Unsupported cipher or incorrect key length
\`\`\`

Generate the key:

\`\`\`bash
docker-compose exec app php artisan key:generate
\`\`\`

### Database Connection Error

Ensure `reminder_db` container is running:

\`\`\`bash
docker-compose ps
docker-compose logs db
\`\`\`

### Assets Not Loading (CSS/JS Broken)

Rebuild assets:

\`\`\`bash
docker-compose exec app npm run build
\`\`\`

### Can't Login After Registering

Verify migrations ran:

\`\`\`bash
docker-compose exec app php artisan migrate
\`\`\`

### Containers Exit Immediately

Check logs:

\`\`\`bash
docker-compose logs app
docker-compose logs db
\`\`\`

### Permission Denied Error

On Windows, ensure Docker Desktop is running and you're using PowerShell.

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/` | Redirect to reminders/login |
| GET | `/login` | Login form |
| POST | `/login` | Handle login |
| GET | `/register` | Register form |
| POST | `/register` | Handle registration |
| POST | `/logout` | Handle logout |
| GET | `/reminders` | List all reminders |
| GET | `/reminders/create` | Create form |
| POST | `/reminders` | Store reminder |
| GET | `/reminders/{id}/edit` | Edit form |
| PUT | `/reminders/{id}` | Update reminder |
| DELETE | `/reminders/{id}` | Delete reminder |

## Performance Considerations

- Reminders are sorted by `due_at` for optimal query performance
- Notifications check every minute (configurable interval)
- MySQL indexes on `user_id` and `due_at` for fast queries
- Vite bundles and minifies frontend assets
- Browser caches static assets

## Security Features

- CSRF token protection on all forms
- Password hashing with bcrypt
- User authorization checks (can only edit/delete own reminders)
- SQL injection protection via Laravel ORM
- XSS protection via React/Inertia

## Deployment

To deploy to production:

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Use HTTPS (required for notifications)
4. Configure proper database backups
5. Use environment variables for sensitive data
6. Deploy with a service like Vercel, Heroku, or your own VPS

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit: `git commit -m "Add feature description"`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

## Code Quality

This project follows:
- **PHP Standards**: PSR-12 coding standards
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting
- **ESLint**: JavaScript linting

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review Laravel docs: https://laravel.com/docs
3. Review Inertia docs: https://inertiajs.com/
4. Review React docs: https://react.dev

## Contact

For technical interview questions or inquiries, please refer to the project structure and code comments.

---

**Happy Reminding!** 🚀
