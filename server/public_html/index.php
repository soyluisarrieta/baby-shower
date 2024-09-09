<?php

require '../config.php';
require '../GiftController.php';

// Clase principal
class App
{
  private $corsConfig;
  private $requestHandler;

  public function __construct()
  {
    $this->corsConfig = new CorsConfig();
    $db = new Database();
    $pdo = $db->getPdo();
    $controller = new GiftController($pdo);
    $this->requestHandler = new RequestHandler($controller);
  }

  public function run()
  {
    $this->corsConfig->configure();
    $this->requestHandler->handleRequest();
  }
}

// Configuración de CORS
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

// Manejo de solicitudes HTTP
class RequestHandler
{
  private $controller;
  private $routes = [];

  public function __construct(GiftController $controller)
  {
    $this->controller = $controller;
    $this->defineRoutes();
  }

  // Definir rutas y métodos
  private function defineRoutes()
  {
    $this->routes = [
      'GET' => [
      ],
      'POST' => [
        '/gifts' => 'getGifts',
        '/confirm-gifts' => 'confirmGift'
      ]
    ];
  }

  // Manejo de solicitudes HTTP
  public function handleRequest()
  {
    $method = $_SERVER['REQUEST_METHOD'];
    $route = $this->getRoute();

    if (isset($this->routes[$method][$route])) {
      $handlerMethod = $this->routes[$method][$route];
      if (method_exists($this, $handlerMethod)) {
        $this->$handlerMethod();
      } else {
        $this->response('Error interno del servidor', 500);
      }
    } else {
      $this->response('No encontrado', 404);
    }
  }

  // Obtener la ruta a partir de la ubicación actual
  private function getRoute()
  {
    $requestUri = $_SERVER['REQUEST_URI'];
    $documentRoot = $_SERVER['DOCUMENT_ROOT'];
    $currentFilePath = __FILE__;

    $currentFilePathUrl = str_replace('\\', '/', $currentFilePath);
    $documentRootUrl = str_replace('\\', '/', $documentRoot);

    $currentUrlPath = str_replace($documentRootUrl, '', $currentFilePathUrl);
    $currentUrlPath = dirname($currentUrlPath);
    $routePath = str_replace($currentUrlPath, '', $requestUri);

    return $routePath ?? '/';
  }

  // Métodos para manejar acciones
  private function getGifts()
  {
    $data = json_decode(file_get_contents('php://input'), true);
    $userIp = $data['userIp'] ?? '';
    $responseData = $this->controller->getGifts($userIp);
    $statusCode = $responseData['success'] ? 200 : 400;
    $this->response($responseData['message'], $statusCode, $responseData['data']);
  }

  private function confirmGift()
  {
    $data = json_decode(file_get_contents('php://input'), true);
    $userIp = $data['userIp'] ?? '';
    $gifts = $data['gifts'] ?? [];
    if ($this->validateConfirmGift($userIp, $gifts)) {
      $confirmedGift = $this->controller->confirmGift($userIp, $gifts);
      $statusCode = $confirmedGift['success'] ? 200 : 400;
      $this->response($confirmedGift['message'], $statusCode);
    } else {
      $this->response('Error al recibir la información de los regalos seleccionados.', 400);
    }
  }

  // Validar los datos para confirmar un regalo
  private function validateConfirmGift($userIp, $gifts)
  {
    return is_string($userIp) && is_array($gifts);
  }

  // Respuesta del servidor
  private function response($message = 'Success', $statusCode = 200, $data = [])
  {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode(['success' => $statusCode === 200, 'message' => $message, 'data' => $data]);
  }
}

// Ejecutar la aplicación
$app = new App();
$app->run();
