<?php
session_start();
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['type'];
    $id = $_POST['id'];
    $password = $_POST['password'];
    
    $table = '';
    switch($type) {
        case 'student':
            $table = 'students';
            break;
        case 'teacher':
            $table = 'teachers';
            break;
        case 'admin':
            $table = 'admins';
            break;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM $table WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_type'] = $type;
            $_SESSION['name'] = $user['name'];
            
            echo json_encode(['success' => true, 'redirect' => "./$type/index.php"]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
}
?> 