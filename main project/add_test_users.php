<?php
require_once 'config/database.php';

// Test users data
$test_users = [
    'students' => [
        [
            'id' => 'STU001',
            'name' => 'John Student',
            'password' => password_hash('student123', PASSWORD_DEFAULT),
            'email' => 'john@student.com'
        ]
    ],
    'teachers' => [
        [
            'id' => 'TCH001',
            'name' => 'Sarah Teacher',
            'password' => password_hash('teacher123', PASSWORD_DEFAULT),
            'email' => 'sarah@teacher.com',
            'department' => 'Computer Science'
        ]
    ],
    'admins' => [
        [
            'id' => 'ADM001',
            'name' => 'Admin User',
            'password' => password_hash('admin123', PASSWORD_DEFAULT),
            'email' => 'admin@college.com'
        ]
    ]
];

try {
    // Insert test users
    foreach ($test_users as $table => $users) {
        foreach ($users as $user) {
            $columns = implode(', ', array_keys($user));
            $values = implode(', ', array_fill(0, count($user), '?'));
            
            $stmt = $pdo->prepare("INSERT INTO $table ($columns) VALUES ($values)");
            $stmt->execute(array_values($user));
        }
    }
    echo "Test users added successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?> 