<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - College Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-container { background: #fff; border-radius: 15px; padding: 2rem; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        .login-header { text-align: center; margin-bottom: 2rem; }
        .login-header h1 { color: #333; font-size: 1.8rem; margin-bottom: 0.5rem; }
        .form-control { border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem; }
        .btn-login { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; padding: 0.8rem; width: 100%; font-weight: 600; margin-top: 1rem; }
        .btn-login:hover { opacity: 0.9; color: #fff; }
        .user-type-selector { margin-bottom: 1.5rem; }
        .alert { border-radius: 8px; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>Welcome Back</h1>
            <p class="text-muted">Please login to your account</p>
        </div>
        
        <?php
        session_start();
        if (isset($_SESSION['error'])) {
            echo '<div class="alert alert-danger">' . $_SESSION['error'] . '</div>';
            unset($_SESSION['error']);
        }
        ?>

        <form action="auth.php" method="POST">
            <div class="user-type-selector">
                <select name="user_type" class="form-select" required>
                    <option value="">Select User Type</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            
            <div class="mb-3">
                <input type="text" name="id" class="form-control" placeholder="ID" required>
            </div>
            
            <div class="mb-3">
                <input type="password" name="password" class="form-control" placeholder="Password" required>
            </div>
            
            <button type="submit" class="btn btn-login">Login</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 