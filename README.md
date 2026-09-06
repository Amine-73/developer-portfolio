# Developer Portfolio

A modern full-stack developer portfolio built to showcase my projects, technical skills, professional experience, and development work.

The application includes a public portfolio website and a private admin dashboard for managing projects dynamically through a REST API.

## 🚀 Live Demo

Coming soon.

## 📸 Preview

<img width="1348" height="648" alt="image" src="https://github.com/user-attachments/assets/1f17c45f-7f20-480e-9800-a451d06e33f6" />


<img width="1348" height="648" alt="image" src="https://github.com/user-attachments/assets/e0ef03ad-c0ad-4603-8f80-e79b76dbb0d2" />



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

## 🐳 Running the Project with Docker

  1. Clone the repository
     
  git clone https://github.com/Amine-73/developer-portfolio.git
  
  2. Enter the project
     
  cd developer-portfolio
  
  3. Start the containers
     
  docker compose up -d
  
  4. Check running containers
     
  docker compose ps
  
  5. Open the application
      
  Frontend:
      
  http://localhost:3000
        
  Admin login:
        
  http://localhost:3000/admin/login
        
  Backend API:
        
  http://localhost:8000

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

