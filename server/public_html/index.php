<?php

require '../config.php';
require '../middlewares/CorsConfig.php';
require '../middlewares/RequestHandler.php';
require '../controllers/GiftController.php';

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
    $this->requestHandler = new RequestHandler($controller, __FILE__);
  }

  public function run()
  {
    $this->corsConfig->configure();
    $this->requestHandler->handleRequest();
  }
}

// Ejecutar la aplicación
$app = new App();
$app->run();
