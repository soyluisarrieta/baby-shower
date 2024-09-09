<?php 
class Database {
    private $pdo;
    private $host = 'localhost';
    private $db = 'babyshower';
    private $user = 'root';
    private $pass = '';

    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host={$this->host};dbname={$this->db}", 
                $this->user, 
                $this->pass, 
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function getPdo() {
        return $this->pdo;
    }
}
