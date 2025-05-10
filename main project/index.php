<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: ./" . $_SESSION['user_type'] . "/index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>College Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .main-title {
            color: #fff;
            margin-top: 40px;
            margin-bottom: 40px;
            text-align: center;
            font-weight: 700;
            letter-spacing: 2px;
        }
        .portal-card {
            border-radius: 18px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            transition: transform 0.2s, box-shadow 0.2s;
            background: #fff;
        }
        .portal-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 8px 32px rgba(102,126,234,0.18);
        }
        .portal-img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-top-left-radius: 18px;
            border-top-right-radius: 18px;
        }
        .card-title {
            font-size: 1.4rem;
            font-weight: 600;
            color: #4b3fa7;
        }
        .card-text {
            color: #555;
        }
        .btn-portal {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            transition: background 0.2s;
        }
        .btn-portal:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            color: #fff;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">College Management System</a>
        </div>
    </nav>
    <div class="container">
        <h1 class="main-title">Welcome to the College Management System</h1>
        <div class="row justify-content-center g-4">
            <div class="col-md-4">
                <div class="card portal-card h-100">
                    <img src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-5325.jpg" class="portal-img" alt="Student Portal">
                    <div class="card-body text-center">
                        <h5 class="card-title">Student Portal</h5>
                        <p class="card-text">Access your academic records, assignments, and more.</p>
                        <a href="login.php" class="btn btn-portal w-100">Login as Student</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card portal-card h-100">
                    <img src="https://img.freepik.com/free-vector/teacher-concept-illustration_114360-1637.jpg" class="portal-img" alt="Teacher Portal">
                    <div class="card-body text-center">
                        <h5 class="card-title">Teacher Portal</h5>
                        <p class="card-text">Manage classes, grades, and student information.</p>
                        <a href="login.php" class="btn btn-portal w-100">Login as Teacher</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card portal-card h-100">
                    <img src="https://img.freepik.com/free-vector/admin-concept-illustration_114360-2581.jpg" class="portal-img" alt="Admin Portal">
                    <div class="card-body text-center">
                        <h5 class="card-title">Admin Portal</h5>
                        <p class="card-text">Administer users, courses, and system settings.</p>
                        <a href="login.php" class="btn btn-portal w-100">Login as Admin</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 