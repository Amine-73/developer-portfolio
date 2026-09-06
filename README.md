# Developer Portfolio

A modern full-stack developer portfolio built to showcase my projects, technical skills, professional experience, and development work.

The application includes a public portfolio website and a private admin dashboard for managing projects dynamically through a REST API.

## 🚀 Live Demo

Coming soon.

## 📸 Preview

Screenshots will be added soon.

## ✨ Features

### Public Portfolio

- Responsive and modern portfolio interface
- Hero section with introduction and social links
- About section
- Technical skills and technologies
- Featured projects
- Dynamic project details pages
- Project screenshots
- GitHub and live demo links
- Contact section
- Responsive design for desktop, tablet, and mobile

### Admin Dashboard

- Admin authentication
- Login / logout
- Session-based authentication
- Project management
- Create projects
- Edit projects
- Delete projects
- Mark projects as featured
- Add project technologies
- Add project images
- Manage GitHub and live demo URLs

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- PHP 8.3
- REST API
- PDO

### Database

- MySQL 8.4

### DevOps / Tools

- Docker
- Docker Compose
- Git
- GitHub

## 🏗️ Architecture

The project follows a simple full-stack architecture:

```text
                    ┌─────────────────────┐
                    │      Next.js        │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │       PHP API       │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               │ PDO
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
