# Hospital Information System

## Overview
The **Hospital Information System** is a web-based application designed to streamline hospital operations, including patient management, appointment scheduling, and doctor-patient interactions. The system provides an efficient way to manage hospital data securely and effectively.

## Features
- **User Authentication:** Secure login and registration system for hospital staff and administrators.
- **Patient Management:** Add, update, and delete patient records.
- **Doctor Management:** Assign doctors to patients, view schedules, and manage specializations.
- **Appointment Scheduling:** Book, update, and cancel appointments.
- **Medical Records:** Store patient history, prescriptions, and diagnostic reports.
- **Billing System:** Generate invoices and track patient payments.
- **Role-Based Access Control:** Different user roles such as Admin, Doctor, and Receptionist.
- **Search and Filtering:** Easily search for patient and doctor records.
- **Notifications & Alerts:** Automated notifications for upcoming appointments.

## Technologies Used
- **Backend:** .NET 9
- **Frontend:** React.js
- **Database:** PostgreSQL
- **Authentication:** JWT-based authentication
- **API Documentation:** Swagger/OpenAPI
- **Deployment:** Docker & Kubernetes
- **Logging & Monitoring:** Prometheus & Grafana

## Dependencies
The project uses the following dependencies for the .NET 9 backend:

- **DotNetEnv** (3.1.1)
- **FluentAssertions** (8.1.1)
- **Microsoft.AspNetCore.Authentication.JwtBearer** (9.0.2)
- **Microsoft.AspNetCore.Identity.EntityFrameworkCore** (9.0.2)
- **Microsoft.AspNetCore.Mvc.Testing** (9.0.2)
- **Microsoft.AspNetCore.OpenApi** (9.0.2)
- **Microsoft.EntityFrameworkCore** (9.0.2)
- **Microsoft.EntityFrameworkCore.Design** (9.0.2)
- **Microsoft.EntityFrameworkCore.InMemory** (9.0.2)
- **Microsoft.IdentityModel.Tokens** (8.6.0)
- **Microsoft.NET.Test.Sdk** (17.12.0)
- **Moq** (4.20.72)
- **Moq.EntityFrameworkCore** (9.0.0.1)
- **Newtonsoft.Json** (13.0.3)
- **Npgsql.EntityFrameworkCore.PostgreSQL** (9.0.3)
- **Swashbuckle.AspNetCore** (7.2.0)
- **System.IdentityModel.Tokens.Jwt** (8.6.0)
- **xunit** (2.9.3)
- **xunit.runner.visualstudio** (3.0.2)

## Installation Guide
### Prerequisites
- .NET 9 SDK
- Node.js 16+
- PostgreSQL
- Docker & Docker Compose (for containerized deployment)

### Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/hospital-info-system.git
   cd hospital-info-system
   ```

2. Set up the backend:
   ```sh
   cd backend
   dotnet restore
   dotnet build
   dotnet run
   ```

3. Set up the frontend:
   ```sh
   cd frontend
   npm install
   npm start
   ```

4. Configure environment variables:
   - Create a `.env` file in the backend directory and set the required database credentials.
   - Modify `config.js` in the frontend directory for API endpoints.

5. Run the system:
   ```sh
   docker-compose up --build
   ```

## API Endpoints
### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Authenticate and obtain a token

### Patients
- `GET /patients` - Retrieve all patients
- `POST /patients` - Add a new patient
- `PUT /patients/{id}` - Update patient details
- `DELETE /patients/{id}` - Remove a patient record

### Doctors
- `GET /doctors` - List all doctors
- `POST /doctors` - Add a doctor
- `PUT /doctors/{id}` - Update doctor details
- `DELETE /doctors/{id}` - Remove a doctor record

### Appointments
- `GET /appointments` - View all appointments
- `POST /appointments` - Schedule a new appointment
- `PUT /appointments/{id}` - Modify an appointment
- `DELETE /appointments/{id}` - Cancel an appointment

## Database Schema
- **Users:** Stores user login credentials and roles
- **Patients:** Stores patient details and medical history
- **Doctors:** Stores doctor information and specialties
- **Appointments:** Stores appointment records and timestamps
- **MedicalRecords:** Stores patient prescriptions and treatments

## Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

