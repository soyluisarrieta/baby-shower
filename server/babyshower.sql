-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2024 a las 23:07:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `babyshower`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gifts`
--

CREATE TABLE `gifts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `reserved` int(11) DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gifts`
--

INSERT INTO `gifts` (`id`, `name`, `reserved`, `update_at`) VALUES
(1, 'Conjunto de Baberos', NULL, NULL),
(2, 'Pañales tamaño recién nacido', NULL, NULL),
(3, 'Pañitos húmedos', NULL, NULL),
(4, 'Conjunto de ropa para bebé entre 3-6 meses', NULL, NULL),
(5, 'Cobija suave para bebé', NULL, NULL),
(6, 'Juguetes para bebé', NULL, NULL),
(7, 'Silla para bebé', NULL, NULL),
(8, 'Kit de cuidados con Termómetro digital', NULL, NULL),
(9, 'Kit de baño para bebé', NULL, NULL),
(10, 'Almohada de lactancia', NULL, NULL),
(11, 'Maletín pañalera', NULL, NULL),
(12, 'Bodies de algodón para bebé entre 0-3 meses', NULL, NULL),
(13, 'Alfombra de juegos para bebé', NULL, NULL),
(14, 'Pijama para bebé entre 0-6 meses', NULL, NULL),
(15, 'Guantes y medias para bebé', NULL, NULL),
(16, 'Crema antipañalitis', NULL, NULL),
(17, 'Sujetador de lactancia', NULL, NULL),
(18, 'Bañera para bebé', NULL, NULL),
(19, 'Conjunto de ropa para bebé entre 6-9 meses', NULL, NULL),
(20, 'Juego de sábanas (1x1.90 metros)', NULL, NULL),
(21, 'Pantuflas para mamá', NULL, NULL),
(22, 'Crema hidratante', NULL, NULL),
(23, 'Set semanario Bebé', NULL, NULL),
(24, 'Canguro para cargar al bebé', NULL, NULL),
(25, 'Bodies de algodón para bebé entre 6-9 meses', NULL, NULL),
(26, 'Vasenilla para bebé', NULL, NULL),
(27, 'Gorritos y medias de bebé', NULL, NULL),
(28, 'Pijama para bebé entre 6-12 meses', NULL, NULL),
(29, 'Loción hidratante para bebé', NULL, NULL),
(30, 'Set de aseo personal para bebé', NULL, NULL),
(31, 'Juguetes para bebé', NULL, NULL),
(32, 'Pañales tamaño recién nacido', NULL, NULL),
(33, 'Caminador para bebé', NULL, NULL),
(34, 'Termo para bebé', NULL, NULL),
(35, 'Guantes y medias para bebé', NULL, NULL),
(36, 'Pañitos húmedos', NULL, NULL),
(37, 'Kit de baño para bebé', NULL, NULL),
(38, 'Alfombra de juegos para bebé', NULL, NULL),
(39, 'Crema antipañalitis', NULL, NULL),
(40, 'Pañales tamaño recién nacido', NULL, NULL),
(61, 'Talco para bebé', NULL, NULL),
(62, 'Aceite para bebé', NULL, NULL),
(63, 'Alcohol y Gazas esterilizadas', NULL, NULL),
(64, 'Juguetes de baño para bebé', NULL, NULL),
(65, 'Juego de sábanas (1x1.90 metros)', NULL, NULL),
(66, 'Protector solar para bebé', NULL, NULL),
(67, 'Ropa interior para bebé', NULL, NULL),
(68, 'Crema hidratante para bebé', NULL, NULL),
(69, 'Pañitos húmedos', NULL, NULL),
(70, 'Loción hidratante', NULL, NULL),
(71, 'Crema antipañalitis', NULL, NULL),
(72, 'Jabón para ropa de bebé', NULL, NULL),
(73, 'Juego de sábanas (1.40x1.90metros)', NULL, NULL),
(74, 'Pañales tamaño recién nacido', NULL, NULL),
(75, 'Cubiertos y platos de silicona', NULL, NULL),
(76, 'Pijama para maternidad', NULL, NULL),
(77, 'Collar de lactancia', NULL, NULL),
(78, 'Crema para estrías', NULL, NULL),
(79, 'Pelota de ejercicio', NULL, NULL),
(80, 'Suavizante para ropa de bebé', NULL, NULL),
(81, 'Multivitamínico \"Gestavit\"', NULL, NULL),
(82, 'Cesta de frutas frescas', NULL, NULL),
(83, 'Funda impermeable para la cuna', NULL, NULL),
(84, 'Juego de sábanas (1.40x1.90metros)', NULL, NULL),
(85, 'Juego de sábanas (1x1.90 metros)', NULL, NULL),
(86, 'Aceite para bebé', NULL, NULL),
(87, 'Talco para bebé', NULL, NULL),
(88, 'Pañales tamaño recién nacido', NULL, NULL),
(89, 'Conjunto de ropa para bebé de 9-12 meses', NULL, NULL),
(90, 'Medias pantalón de lana para bebé', NULL, NULL),
(91, 'Cobija suave para bebé', NULL, NULL),
(92, 'Pañales para bebé de 3-6 meses', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_ip` varchar(45) NOT NULL,
  `user_hash` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gifts`
--
ALTER TABLE `gifts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gifts_users` (`reserved`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gifts`
--
ALTER TABLE `gifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gifts`
--
ALTER TABLE `gifts`
  ADD CONSTRAINT `fk_gifts_users` FOREIGN KEY (`reserved`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
