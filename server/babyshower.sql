-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2024 a las 03:21:15
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
  `reserved` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gifts`
--

INSERT INTO `gifts` (`id`, `name`, `reserved`) VALUES
(1, 'Conjunto de Baberos', 0),
(2, 'Pañales tamaño recién nacido', 0),
(3, 'Pañitos húmedos', 0),
(4, 'Conjunto de ropa para bebé', 0),
(5, 'Cobija suave para bebé', 0),
(6, 'Juguetes para bebé', 0),
(7, 'Silla para bebé', 0),
(8, 'Kit de cuidados con Termómetro digital', 0),
(9, 'Kit de baño para bebé', 0),
(10, 'Almohada de lactancia', 0),
(11, 'Maletín pañalera', 0),
(12, 'Bodies para bebé', 0),
(13, 'Alfombra de juegos para bebé', 0),
(14, 'Pijama para bebé', 0),
(15, 'Guantes y medias para bebé', 0),
(16, 'Crema antipañalitis', 0),
(17, 'Sujetador de lactancia', 0),
(18, 'Bañera para bebé', 0),
(19, 'Conjunto de ropa para bebé', 0),
(20, 'Juego de sábanas (1x1.90 metros)', 0),
(21, 'Pantuflas para mamá', 0),
(22, 'Crema hidratante', 0),
(23, 'Set semanario Bebé', 0),
(24, 'Canguro para cargar al bebé', 0),
(25, 'Bodies de algodón para bebé', 0),
(26, 'Vasenilla para bebé', 0),
(27, 'Gorritos y medias de bebé', 0),
(28, 'Pijama para bebé', 0),
(29, 'Loción hidratante para bebé', 0),
(30, 'Set de aseo personal para bebé', 0),
(31, 'Juguetes para bebé', 0),
(32, 'Pañales tamaño recién nacido', 0),
(33, 'Caminador para bebé', 0),
(34, 'Termo para bebé', 0),
(35, 'Guantes y medias para bebé', 0),
(36, 'Pañitos húmedos', 0),
(37, 'Kit de baño para bebé', 0),
(38, 'Alfombra de juegos para bebé', 0),
(39, 'Crema antipañalitis', 0),
(40, 'Pañales tamaño recién nacido', 0),
(61, 'Talco para bebé', 0),
(62, 'Aceite para bebé', 0),
(63, 'Alcohol y Gazas esterilizadas', 0),
(64, 'Juguetes de baño para bebé', 0),
(65, 'Juego de sábanas (1x1.90 metros)', 0),
(66, 'Protector solar para bebé', 0),
(67, 'Ropa interior para bebé', 0),
(68, 'Crema hidratante para bebé', 0),
(69, 'Pañitos húmedos', 0),
(70, 'Loción hidratante', 0),
(71, 'Crema antipañalitis', 0),
(72, 'Jabón para ropa de bebé', 0),
(73, 'Juego de sábanas (1.40x1.90metros)', 0),
(74, 'Pañales tamaño recién nacido', 0),
(75, 'Cubiertos y platos de silicona', 0),
(76, 'Pijama para maternidad', 0),
(77, 'Collar de lactancia', 0),
(78, 'Crema para estrías', 0),
(79, 'Pelota de ejercicio', 0),
(80, 'Suavizante para ropa de bebé', 0),
(81, 'Multivitamínico \"Gestavit\"', 0),
(82, 'Cesta de frutas frescas', 0),
(83, 'Funda impermeable para la cuna', 0),
(84, 'Juego de sábanas (1.40x1.90metros)', 0),
(85, 'Juego de sábanas (1x1.90 metros)', 0),
(86, 'Aceite para bebé', 0),
(87, 'Talco para bebé', 0),
(88, 'Pañales tamaño recién nacido', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `gift_id` int(11) DEFAULT NULL,
  `user_ip` varchar(45) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gifts`
--
ALTER TABLE `gifts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gift_id` (`gift_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gifts`
--
ALTER TABLE `gifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`gift_id`) REFERENCES `gifts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
