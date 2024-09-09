-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2024 a las 01:50:59
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
  `reserved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gifts`
--

INSERT INTO `gifts` (`id`, `name`, `reserved`) VALUES
(1, 'Babero con nombre personalizado', 0),
(2, 'Caja de pañales tamaño recién nacido', 0),
(3, 'Chupetes de silicona', 0),
(4, 'Conjunto de ropa para bebés', 0),
(5, 'Manta suave para bebé', 0),
(6, 'Juguetes de estimulación temprana', 0),
(7, 'Silla para coche', 0),
(8, 'Termómetro digital para bebé', 0),
(9, 'Kit de cuidado personal para bebé', 0),
(10, 'Almohada de lactancia', 0),
(11, 'Cambiador portátil', 0),
(12, 'Móvil musical para cuna', 0),
(13, 'Alfombra de juegos para bebé', 0),
(14, 'Set de biberones', 0),
(15, 'Monitor de bebé', 0),
(16, 'Espejo para coche', 0),
(17, 'Silla de paseo', 0),
(18, 'Bañera para bebé', 0),
(19, 'Toallas con capucha', 0),
(20, 'Juego de sábanas para cuna', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `gift_id` int(11) DEFAULT NULL,
  `user_ip` varchar(45) DEFAULT NULL,
  `timestamps` timestamp NOT NULL DEFAULT current_timestamp()
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

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
