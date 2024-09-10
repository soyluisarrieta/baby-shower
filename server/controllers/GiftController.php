<?php
class GiftController {
  private $pdo;

  public function __construct($pdo) {
    $this->pdo = $pdo;
  }

  // Obtiene todos los regalos
  public function getGifts($userIp) {
    // Si el user_ip ya ha confirmado su regalo
    $checkSql = "SELECT COUNT(*) FROM users WHERE user_ip = :userIp";
    $checkStmt = $this->pdo->prepare($checkSql);
    $checkStmt->execute(['userIp' => $userIp]);
    $exists = $checkStmt->fetchColumn();

    // Si el user_ip no existe, obtiene todos los regalos
    $sql = "SELECT * FROM gifts";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();

    $gifts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return [
      'success' => true,
      'message' => 'Lista de regalos obtenidos correctamente.',
      'data' => [
        'gifts' => $gifts,
        'user_exists' => $exists > 0
      ]
    ];
  }


  // Confirma un regalo
  public function confirmGift($userIp, $gifts) {
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
      $insertSql = "INSERT INTO users (user_ip, gift_id) VALUES (?, ?)";
      $insertStmt = $this->pdo->prepare($insertSql);

      // Actualizar estado de los regalos
      $updateSql = "UPDATE gifts SET reserved = 1 WHERE id = ?";
      $updateStmt = $this->pdo->prepare($updateSql);

      foreach ($selectedGifts as $gift) {
        $insertStmt->execute([$userIp, $gift['id']]);
        $updateStmt->execute([$gift['id']]);
      }

      $this->pdo->commit();
      return ['success' => true, 'message' => 'Los regalos han sido confirmados correctamente'];
    } catch (Exception $e) {
      $this->pdo->rollBack();
      return ['success' => false, 'message' => 'Error al confirmar el regalo.'];
    }
  }
}
