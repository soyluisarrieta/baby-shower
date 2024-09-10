<?php

class CorsConfig
{
  private $allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ];

  public function configure()
  {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $this->allowedOrigins)) {
      header("Access-Control-Allow-Origin: $origin");
      header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");

      // Manejar solicitudes de verificación previa
      if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
          exit(0);
      }
    }
  }
}
