<?php
session_start();
require_once 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = trim($_POST['id']);
    $password = $_POST['password'];
    $user_type = $_POST['user_type'];

    // Validate input
    if (empty($id) || empty($password) || empty($user_type)) {
        $_SESSION['error'] = "All fields are required";
        header("Location: login.php");
        exit();
    }

    try {
        // Determine which table to query based on user type
        $table = $user_type . 's'; // students, teachers, or admins
        
        $stmt = $pdo->prepare("SELECT * FROM $table WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch();

        // Plain text password check
        if ($user && $password === $user['password']) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_type'] = $user_type;
            $_SESSION['user_email'] = $user['email'];

            // Redirect based on user type
            switch ($user_type) {
                case 'student':
                    header("Location: student/index.html");
                    break;
                case 'teacher':
                    header("Location: teacher/index.html");
                    break;
                case 'admin':
                    header("Location: admin/index.html");
                    break;
                default:
                    header("Location: login.php");
            }
            exit();
        } else {
            $_SESSION['error'] = "Invalid credentials";
            header("Location: login.php");
            exit();
        }
    } catch (PDOException $e) {
        $_SESSION['error'] = "An error occurred. Please try again later.";
        header("Location: login.php");
        exit();
    }
} else {
    header("Location: login.php");
    exit();
} 