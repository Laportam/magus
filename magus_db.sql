SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `magus_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `image` longtext NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `category_id`) VALUES
(2, 'Mother Asrock H310CM-HDV Socket 1151 8va Gen', 'CARACTERISTICAS GENERALES Plataforma Intel Socket 1151 8va Chipsets Principal Intel H310 CONECTIVIDAD Cantidad De Slot Pci 0 Cantidad De Slot Pci-e 16X 1 Cantidad De Slot Pci-e 1X 1 Tecnología Multi Gpu 0 Puertos Sata 4 Puertos Ide 0 Salidas Vga 1 Salidas Hdmi 1 Salidas Dvi 1 Salidas Display Ports 0 Cantidad De Slot M2 0 Placa Wifi Integrada No Placa De Red Gigabit LAN 10/100/1000 Mb/s Puerto Ps/2 No Puertos Usb 2.0 Traseros 4 Puertos Usb 3.0 Traseros 2 Puertos Usb 3.1 Traseros 0 ', '1.jpg', 1),
(13, 'Mother Asrock H310CM-HDV Socket 1151 8va Gen', 'CARACTERISTICAS GENERALES Plataforma Intel Socket 1151 8va Chipsets Principal Intel H310 CONECTIVIDAD Cantidad De Slot Pci 0 Cantidad De Slot Pci-e 16X 1 Cantidad De Slot Pci-e 1X 1 Tecnología Multi Gpu 0 Puertos Sata 4 Puertos Ide 0 Salidas Vga 1 Salidas Hdmi 1 Salidas Dvi 1 Salidas Display Ports 0 Cantidad De Slot M2 0 Placa Wifi Integrada No Placa De Red Gigabit LAN 10/100/1000 Mb/s Puerto Ps/2 No Puertos Usb 2.0 Traseros 4 Puertos Usb 3.0 Traseros 2 Puertos Usb 3.1 Traseros 0 ', '2.jpg', 1),
(14, 'Placa de Video GeForce MSI GT 710 1GB LP Disipador', 'CARACTERISTICAS GENERALES Tipo pcie Chipset Gpu GT 710 Entrada Video No Puente Para Sli/croosfirex - Doble Puente No Características Especiales Otras tecnologías CONECTIVIDAD Vga 1 Dvi Digital 1 Hdmi 1 Rca No S-video 0 Displayports 0 Dvi Analógico/digital 0 ', '3.jpg', 1),
(15, 'Gabinete Corsair Crystal 680X RGB TG Smart Black', 'CARACTERISTICAS GENERALES Factor Mother ITX,M-ATX,ATX Fuente En Posición Superior No Con Ventana Si Tipo De Ventana Vidrio templado Colores Negro CONECTIVIDAD Usb 2.0 Frontal 0 Usb 3.0 Frontal 0 Usb 3.1 Frontal 3 Usb 3.1 Interno 2 Lector De Tarjetas Frontal No Audio Ac97 Frontal No Audio Hd Frontal Si', '4.jpg', 1),
(17, 'Monitor LG 22\\\" 22MK600M IPS Full HD Bordes Ultra Finos', 'CARACTERISTICAS GENERALES Tipo De Ilumunación LED Tipo De Panel IPS Pantalla Curva No CONECTIVIDAD Conexión 3.5 Mm - Entrada No Conexión 3.5 Mm - Salida No Hdmi 2 Dvi 0 Vga 1 Display Port 0 Puertos Usb 2.0 0 Puertos Usb 3.0 0 Puertos Usb 3.1 0 Mini Display Port 0 ', '5.jpg', 2),
(18, 'Monitor Portátil Asus ZenScreen 15.6\\\" MB16AC', 'CARACTERISTICAS GENERALES Tipo De Ilumunación LED Tipo De Panel IPS Pantalla Curva No CONECTIVIDAD Conexión 3.5 Mm - Entrada No Conexión 3.5 Mm - Salida No Hdmi 0 Dvi 0 Vga 0 Display Port 0 Puertos Usb 2.0 0 Puertos Usb 3.0 0 Puertos Usb 3.1 1 Mini Display Port 0 ', '6.jpg', 2),
(19, 'Mouse Logitech G903 Lightspeed Wireless Gaming 16.000dpi', 'CARACTERISTICAS GENERALES Color Negro Cantidad De Botones 11 Tipo De Sensor Óptico Sensor Hero Tipo Inalámbrico Si Orientación Para ambidiestros Agarre Palm Grip Si Agarre Claw Grip Si Agarre Finger Grip Si Agarre Ergonómico Vertical No', '7.jpg', 2),
(20, 'Teclado Marvo KG880 Retroiluminado Multimedia', 'CARACTERISTICAS GENERALES Tipo De Teclado Completo Color Negro Tipo De Mecanismo Semi Mecánico Material Plástico Touchpad No ', '8.jpg', 2),
(21, 'Auriculares HyperX Gaming Cloud II Wireless', 'CARACTERISTICAS GENERALES Audio 7.1 Colores Negro,Rojo Conexión Inalámbrico Con Micrófono Si Tipo De Audio Virtual Tipo Headset CONECTIVIDAD Usb Si Inalámbrico Con Receptor Si Inalámbrico Por Bluetooth No Usb De Alimentación Si ', '1a.jpg', 2),
(22, 'Memoria OLOy DDR4 32GB (2x16GB) Owl Red 3000MHz CL16', 'CARACTERISTICAS GENERALES Capacidad 32 gb Velocidad 3000 mhz Tipo DDR4 Cantidad De Memorias 2 Latencia 16 cl Voltaje 1.35 v COMPATIBILIDAD Tipo Sodimm No COOLERS Y DISIPADORES Disipador Si Disipador Alto Si ', '1b.jpg', 1),
(23, 'Memoria Kingston DDR3 8GB 1866MHz HyperX Fury Blue', 'CARACTERISTICAS GENERALES Capacidad 8 gb Velocidad 1866 mhz Tipo DDR3 Cantidad De Memorias 1 Latencia 10 cl Voltaje 1.50 v COMPATIBILIDAD Tipo Sodimm No COOLERS Y DISIPADORES Disipador Si Disipador Alto No ', '1c.jpg', 1),
(24, 'Placa de Video Zotac GeForce RTX 3090 24GB GDDR6X Trinity', 'CARACTERISTICAS GENERALES Tipo pcie Chipset Gpu GTX 1650 Entrada Video No Puente Para Sli/croosfirex - Doble Puente No CONECTIVIDAD Vga 0 Dvi Digital 1 Hdmi 1 Rca No S-video 0 Displayports 1 Dvi Analógico/digital 0 Usb Type-c 0 ', '1d.jpg', 1)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_category`
--

CREATE TABLE `products_category` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products_category`
--

INSERT INTO `products_category` (`id`, `title`) VALUES
(1, 'componentes'),
(2, 'perifericos'),
(3, 'pcs');

-- --------------------------------------------------------

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category_idx` (`category_id`);

--
-- Indices de la tabla `products_category`
--
ALTER TABLE `products_category`
  ADD PRIMARY KEY (`id`);


--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `products_category`
--
ALTER TABLE `products_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fkprodcat` FOREIGN KEY (`category_id`) REFERENCES `products_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;