<?php
echo "Student: " . password_hash('student123', PASSWORD_DEFAULT) . "<br>";
echo "Teacher: " . password_hash('teacher123', PASSWORD_DEFAULT) . "<br>";
echo "Admin: " . password_hash('admin123', PASSWORD_DEFAULT) . "<br>";
?>