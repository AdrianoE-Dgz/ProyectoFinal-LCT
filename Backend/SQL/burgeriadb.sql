-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2026 a las 19:03:01
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
-- Base de datos: `burgeriadb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `usuarios_id` int(11) NOT NULL,
  `contenido` varchar(500) DEFAULT NULL,
  `fechaPedido` date DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `precio` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `usuarios_id`, `contenido`, `fechaPedido`, `fechaEntrega`, `precio`) VALUES
(1, 2, 'Pan blanco, pollo, carne, tomate', '2026-06-18', '2026-06-30', 20.2),
(2, 2, 'Pan blanco, carne, carne, lechuga', '2026-06-18', '2026-06-30', 15.3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `existencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `tipo`, `nombre`, `imagen`, `descripcion`, `precio`, `existencia`) VALUES
(1, 1, 'Pan Blanco (Tapa)', 'Bun-Top.svg', 'Tapa de pan de hamburguesa blanco con semillas de sésamo', 1.00, 200),
(2, 2, 'Pan Blanco (base)', 'Bun-Bottom.svg', 'Parte inferior de pan blanco con semillas de sésamo', 1.00, 300),
(3, 3, 'Pollo', 'Chicken.svg', 'Carne de hamburguesa de pollo', 4.50, 150),
(4, 3, 'Carne Termino 1', 'Pattie1.svg', 'Carne de hamburguesa de res con un termino bien cocido', 3.00, 300),
(5, 3, 'Carne Termino 2', 'Pattie2.svg', 'Carne de hamburguesa de res con un termino de tres cuartos', 3.00, 300),
(6, 3, 'Carne Termino 3', 'Pattie3.svg', 'Carne de hamburguesa de res con un termino medio', 3.00, 300),
(7, 4, 'Salsa BBQ', 'BBQ.svg', 'Salsa tipo BBQ', 2.00, 250),
(8, 4, 'Salsa Ketchup', 'Ketchup.svg', 'Salsa tipo Ketchup (Catsup)', 1.00, 300),
(9, 4, 'Mostaza', 'Mustard.svg', 'Mostaza esparcida por el pan de hamburguesa', 1.50, 300),
(10, 4, 'Mayonesa', 'Mayo.svg', 'Mayonesa esparcida por el pan de hamburguesa', 1.50, 300),
(11, 5, 'Queso', 'Cheese.svg', 'Rebandada de queso amarillo sobre la carne de hamburguesa', 1.50, 300),
(12, 5, 'Lechuga', 'Lettuce.svg', 'Hoja de lechuga', 1.50, 200),
(13, 5, 'Cebolla', 'Onion.svg', 'Rodajas de cebolla blanca', 2.00, 150),
(14, 5, 'Pepinillo', 'Pickle.svg', 'Rodaja de pepinillo', 2.00, 100),
(15, 5, 'Tomate', 'Tomato.svg', 'Rodaja de tomate', 1.50, 150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `user` varchar(12) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `rol` varchar(45) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `nombre`, `email`, `password`, `rol`) VALUES
(1, 'admin', 'Administrador', 'admin@gmail.com', '$2b$10$VcHtgWYXKh/v4OEaC4.nbe5cjL6NIGdmH7.63KaOLfyZW6yfle4.W', 'admin'),
(2, 'uwu', 'Angel', 'angeluwu@gmail.com', '$2b$10$tyoWJASzNXAv0gkkaSwBguvDHg9a.lPjH4PSHrzvIdsmpGOxzE8ty', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
