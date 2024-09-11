<?php
class GiftController {
  private $pdo;

  public function __construct($pdo) {
    $this->pdo = $pdo;
  }

  // Obtiene todos los regalos
  public function getGifts($user) {
    // Si el user_hash ya ha confirmado su regalo
    $checkSql = "SELECT * FROM users WHERE user_hash = :userHash LIMIT 1";
    $checkStmt = $this->pdo->prepare($checkSql);
    $checkStmt->execute(['userHash' => $user['hash']]);
    $user = $checkStmt->fetch(PDO::FETCH_ASSOC);

    // Si el user_hash no existe, obtiene todos los regalos
    $sql = "SELECT * FROM gifts";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();

    $gifts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return [
      'success' => true,
      'message' => 'Lista de regalos obtenidos correctamente.',
      'data' => [
        'gifts' => $gifts,
        'timestamp' => $user['timestamp'] ?? null
      ]
    ];
  }


  // Confirma un regalo
  public function confirmGift($user, $gifts) {
    $this->pdo->beginTransaction();

    try {
      // Obtener los IDs de los regalos seleccionados
      $selectedGifts = array_filter($gifts, fn($gift) => $gift['selected']);
      $selectedGiftIds = array_column($selectedGifts, 'id');

      // Verificar si el número de regalos seleccionados excede el límite
      if (count($selectedGiftIds) > 3) {
        $this->pdo->rollBack();
        return [
          'success' => false,
          'message' => 'No puedes seleccionar más de 3 regalos.'
        ];
      }

      // Verificar si alguno de los regalos está reservado
      $placeholders = implode(',', array_fill(0, count($selectedGiftIds), '?'));
      $sql = "SELECT id, gifts.name, reserved FROM gifts WHERE id IN ($placeholders) FOR UPDATE";
      $stmt = $this->pdo->prepare($sql);
      $stmt->execute($selectedGiftIds);

      $reservedGifts = $stmt->fetchAll(PDO::FETCH_ASSOC);

      foreach ($reservedGifts as $gift) {
        if ($gift['reserved']) {
          $this->pdo->rollBack();
          return [
            'success' => false,
            'message' => "Justo en este momento, el regalo '{$gift['name']}' ya ha sido reservado por otro invitado."
          ];
        }
      }

      // Insertar registros en la tabla "users"
      $insertSql = "INSERT INTO users (user_ip, user_hash) VALUES (?, ?)";
      $insertStmt = $this->pdo->prepare($insertSql);
      $insertStmt->execute([$user['ip'], $user['hash']]);
      $lastInsertId = $this->pdo->lastInsertId();

      // Actualizar estado de los regalos
      $updateSql = "UPDATE gifts SET reserved = ? WHERE id = ?";
      $updateStmt = $this->pdo->prepare($updateSql);

      foreach ($selectedGifts as $gift) {
        $updateStmt->execute([$lastInsertId, $gift['id']]);
      }

      $this->pdo->commit();
      return ['success' => true, 'message' => 'Los regalos han sido confirmados correctamente'];
    } catch (Exception $e) {
      $this->pdo->rollBack();
      return ['success' => false, 'message' => 'Error al confirmar el regalo.'];
    }
  }
}
