-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2022 at 07:15 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tour`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `Cell` char(13) NOT NULL
) ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `Name`, `Email`, `Password`, `Cell`) VALUES
(93, 'Ismail Ahmed Ansari', 'k200228@nu.edu.pk', '992f0d650e67d627b61d54ba63f864ac', '+923471678725'),
(94, 'Dada', 'k200247@nu.edu.pk', '65bc12cd009390700762841a592fc0ff', '+923471678725');

--
-- Triggers `admin`
--
DELIMITER $$
CREATE TRIGGER `encryptpassword1` BEFORE INSERT ON `admin` FOR EACH ROW BEGIN
INSERT INTO users_fake VALUES (NULL,MD5(NEW.Password));
SET NEW.Password := (SELECT Password from users_fake where ID = LAST_INSERT_ID());
DELETE from users_fake where ID = LAST_INSERT_ID();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `adminjoin`
-- (See below for the actual view)
--
CREATE TABLE `adminjoin` (
`Amount` int(11)
,`ChildrenSeats` int(11)
,`AdultSeats` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `adminjoin1`
-- (See below for the actual view)
--
CREATE TABLE `adminjoin1` (
`Price` int(11)
,`ChildrenSeats` int(11)
,`AdultSeats` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `adminjoin2`
-- (See below for the actual view)
--
CREATE TABLE `adminjoin2` (
`Amount` int(11)
,`TotalSeats` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `adminjoin3`
-- (See below for the actual view)
--
CREATE TABLE `adminjoin3` (
`Price` int(11)
,`TotalRooms` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `booknow`
--

CREATE TABLE `booknow` (
  `TourID` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `TransportID` int(11) NOT NULL DEFAULT 0,
  `HotelID` int(11) NOT NULL DEFAULT 0,
  `DepartureDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booknow_history`
--

CREATE TABLE `booknow_history` (
  `TourID` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `TransportID` int(11) NOT NULL,
  `HotelID` int(11) NOT NULL,
  `DepartureDate` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booknow_temp`
--

CREATE TABLE `booknow_temp` (
  `TourID` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `TransportID` int(11) NOT NULL,
  `HotelID` int(11) NOT NULL,
  `DepartureDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `ID` int(11) NOT NULL,
  `Airline` varchar(256) NOT NULL,
  `Departure` varchar(256) NOT NULL,
  `Destination` varchar(256) NOT NULL,
  `Date` varchar(256) NOT NULL,
  `Time` time NOT NULL,
  `Amount` int(11) NOT NULL,
  `Seats` int(11) NOT NULL,
  `Booked` int(11) NOT NULL
) ;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`ID`, `Airline`, `Departure`, `Destination`, `Date`, `Time`, `Amount`, `Seats`, `Booked`) VALUES
(50, 'AirSial', 'Gujranwala', 'Skardu', '2023-01-02', '17:00:00', 7500, 300, 164),
(51, 'AirSial', 'Lahore', 'Skardu', '2023-01-01', '17:00:00', 7500, 300, 98),
(53, 'AirSial', 'Islamabad', 'Skardu', '2023-01-03', '12:00:00', 7500, 300, 8),
(54, 'AirSial', 'Karachi', 'Islamabad', '2023-01-02', '09:00:00', 7000, 300, 123),
(55, 'PakistanInternationalAirlines', 'Karachi', 'Islamabad', '2023-01-01', '23:00:00', 10500, 650, 321),
(56, 'PakistanInternationalAirlines', 'Quetta', 'Skardu', '2023-01-04', '09:00:00', 8500, 500, 459),
(57, 'PakistanInternationalAirlines', 'Islamabad', 'Skardu', '2023-01-03', '10:00:00', 12500, 650, 54),
(58, 'PakistanInternationalAirlines', 'Lahore', 'Skardu', '2023-01-02', '22:00:00', 13500, 500, 77),
(59, 'PakistanInternationalAirlines', 'Gujranwala', 'Skardu', '2023-01-01', '18:00:00', 12500, 150, 99),
(60, 'Emirates', 'Quetta', 'Islamabad', '2023-01-03', '17:00:00', 7500, 300, 89),
(61, 'Emirates', 'Quetta', 'Lahore', '2023-01-04', '13:00:00', 7000, 300, 65),
(62, 'Emirates', 'Islamabad', 'Skardu', '2023-01-03', '12:00:00', 7500, 300, 90),
(63, 'Emirates', 'Quetta', 'Skardu', '2023-01-04', '09:00:00', 7000, 300, 140),
(64, 'Airblue', 'Multan', 'Skardu', '2023-01-03', '23:00:00', 10500, 650, 320),
(65, 'Airblue', 'Lahore', 'Islamabad', '2023-01-04', '09:00:00', 8500, 500, 100),
(66, 'PakistanInternationalAirlines', 'Islamabad', 'Skardu', '2023-01-03', '10:00:00', 12500, 650, 200),
(67, 'PakistanInternationalAirlines', 'Karachi', 'Skardu', '2023-01-04', '22:00:00', 13500, 500, 400),
(68, 'QatarAirways', 'Karachi', 'Skardu', '2023-01-04', '18:00:00', 12500, 150, 89),
(69, 'QatarAirways', 'Islamabad', 'Skardu', '2023-01-03', '18:00:00', 5500, 100, 90),
(70, 'PakistanInternationalAirlines', 'Multan', 'Islamabad', '2023-01-04', '17:00:00', 7500, 300, 15),
(71, 'PakistanInternationalAirlines', 'Gujranwala', 'Islamabad', '2023-01-03', '13:00:00', 7000, 300, 289),
(72, 'GulfAir', 'Gujranwala', 'Skardu', '2023-01-04', '12:00:00', 7500, 300, 100),
(73, 'GulfAir', 'Gujranwala', 'Skardu', '2023-01-03', '09:00:00', 7000, 300, 200),
(74, 'AirArabia', 'Karachi', 'Skardu', '2023-01-04', '23:00:00', 10500, 650, 34),
(75, 'AirArabia', 'Lahore', 'Skardu', '2023-01-03', '09:00:00', 8500, 500, 259),
(76, 'Serene', 'Karachi', 'Lahore', '2023-01-04', '10:00:00', 12500, 650, 600),
(77, 'Serene', 'Islamabad', 'Karachi', '2023-01-03', '22:00:00', 13500, 500, 399),
(78, 'Lufthansa', 'Karachi', 'Skardu', '2023-01-04', '18:00:00', 12500, 150, 140),
(79, 'Lufthansa', 'Islamabad', 'Skardu', '2023-01-03', '18:00:00', 5500, 100, 80),
(80, 'Emirates', 'Quetta', 'Islamabad', '2023-01-02', '17:00:00', 7500, 300, 100),
(81, 'Emirates', 'Quetta', 'Lahore', '2023-01-01', '13:00:00', 7000, 300, 90),
(82, 'Emirates', 'Islamabad', 'Skardu', '2023-01-02', '12:00:00', 7500, 300, 50),
(83, 'Emirates', 'Quetta', 'Skardu', '2023-01-01', '09:00:00', 7000, 300, 30),
(84, 'Airblue', 'Multan', 'Skardu', '2023-01-02', '23:00:00', 10500, 650, 50),
(85, 'Airblue', 'Lahore', 'Islamabad', '2023-01-01', '09:00:00', 8500, 500, 30),
(86, 'PakistanInternationalAirlines', 'Islamabad', 'Skardu', '2023-01-02', '10:00:00', 12500, 650, 50),
(87, 'PakistanInternationalAirlines', 'Karachi', 'Skardu', '2023-01-01', '22:00:00', 13500, 500, 30),
(88, 'QatarAirways', 'Karachi', 'Skardu', '2023-01-02', '18:00:00', 12500, 150, 50),
(89, 'QatarAirways', 'Islamabad', 'Skardu', '2023-01-01', '18:00:00', 5500, 100, 30),
(90, 'GulfAir', 'Multan', 'Islamabad', '2023-01-02', '17:00:00', 7500, 300, 100),
(91, 'GulfAir', 'Gujranwala', 'Islamabad', '2023-01-01', '13:00:00', 7000, 300, 90),
(92, 'GulfAir', 'Gujranwala', 'Skardu', '2023-01-02', '12:00:00', 7500, 300, 50),
(93, 'GulfAir', 'Gujranwala', 'Skardu', '2023-01-01', '09:00:00', 7000, 300, 30),
(94, 'AirArabia', 'Karachi', 'Skardu', '2023-01-02', '23:00:00', 10500, 650, 50),
(95, 'AirArabia', 'Lahore', 'Skardu', '2023-01-02', '09:00:00', 8500, 500, 30),
(96, 'Serene', 'Karachi', 'Lahore', '2023-01-01', '10:00:00', 12500, 650, 50),
(97, 'Serene', 'Islamabad', 'Karachi', '2023-01-01', '22:00:00', 13500, 500, 30),
(98, 'AirSial', 'Karachi', 'Skardu', '2023-01-01', '18:00:00', 12500, 150, 50),
(99, 'Lufthansa', 'Islamabad', 'Skardu', '2023-01-01', '18:00:00', 5500, 100, 30),
(463, 'PIA', 'Lahore', 'Skardu', '2022-12-09', '10:56:00', 12000, 120, 12);

-- --------------------------------------------------------

--
-- Table structure for table `flightsbooked`
--

CREATE TABLE `flightsbooked` (
  `UserID` int(11) NOT NULL,
  `FlightID` int(11) NOT NULL,
  `ChildrenSeats` int(11) NOT NULL,
  `AdultSeats` int(11) NOT NULL,
  `SeatsBooked` int(11) NOT NULL,
  `Amount` int(11) NOT NULL
) ;

--
-- Triggers `flightsbooked`
--
DELIMITER $$
CREATE TRIGGER `updateFlights` BEFORE DELETE ON `flightsbooked` FOR EACH ROW update flights set Booked = Booked - OLD.SeatsBooked where ID = OLD.FlightID
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateFlights1` AFTER INSERT ON `flightsbooked` FOR EACH ROW update flights set Booked = Booked + NEW.SeatsBooked where ID = NEW.FlightID
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateFlights2` AFTER UPDATE ON `flightsbooked` FOR EACH ROW update flights set Booked = Booked - OLD.SeatsBooked + NEW.SeatsBooked where ID = NEW.FlightID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `ID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Location` varchar(256) NOT NULL,
  `Rooms` int(11) NOT NULL,
  `Booked` int(11) NOT NULL,
  `Price` int(11) NOT NULL
) ;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`ID`, `Name`, `Location`, `Rooms`, `Booked`, `Price`) VALUES
(0, '', '', 0, 0, 0),
(1, 'Hotel One Naran', 'NK', 60, 30, 17000),
(2, 'Royal Saeed Hotel', 'NK', 120, 28, 13000),
(3, 'River View Hotel', 'NK', 80, 50, 22000),
(4, 'Hotel Mount View', 'NK', 50, 34, 19000),
(5, 'Pine Park Lake Luxury Resort', 'NK', 80, 34, 24000),
(6, 'Pine top Hotel', 'NK', 100, 84, 25000),
(7, 'Mount Feast Hotel', 'NK', 60, 28, 14000),
(8, 'Royal Hotel Naran', 'NK', 90, 83, 28000),
(9, 'Snow Crest Lodges', 'NK', 30, 19, 12000),
(10, 'Imperial Hotel', 'NK', 40, 16, 14000),
(11, 'Sakura Lodges Hunza', 'Hunza', 75, 32, 18000),
(12, 'Baltit Heritage Hotel', 'Hunza', 80, 56, 25000),
(13, 'Roomy Daastaan Hotel', 'Hunza', 90, 45, 16000),
(14, 'Hunza Continental Palace', 'Hunza', 32, 14, 18000),
(15, 'Embassy Villa Suites', 'Hunza', 60, 54, 19000),
(16, 'Tourist Cottage Hunza', 'Hunza', 30, 23, 14000),
(17, 'Hunza Darbar Hotel', 'Hunza', 60, 46, 19000),
(18, 'Mulberry Hotel', 'Hunza', 55, 34, 20000),
(19, 'Hotel Blue Moon', 'Hunza', 70, 45, 21000),
(20, 'Shaheen Resort Hunza', 'Hunza', 45, 27, 12000),
(21, 'Swat Serena Hotel', 'Swat', 50, 34, 26000),
(22, 'Hotel Pameer', 'Swat', 30, 12, 14000),
(23, 'Burj Ul Swat', 'Swat', 60, 20, 17000),
(24, 'Swat Hilton Hotel', 'Swat', 85, 63, 24000),
(25, 'Hotel Parkway', 'Swat', 20, 9, 18000),
(26, 'Swat View Hotel', 'Swat', 52, 19, 23000),
(27, 'Rock City Resort', 'Swat', 30, 30, 19000),
(28, 'Stay inn Hotel', 'Swat', 65, 34, 19000),
(29, 'Hotel Swat Regency', 'Swat', 25, 12, 32000),
(30, 'Swat Abshar Hotel', 'Swat', 45, 34, 19000),
(31, 'Paradise hotel', 'Skardu', 40, 30, 17000),
(32, 'Shangrila Resort', 'Skardu', 30, 14, 32000),
(33, 'Hotel Mashabrum', 'Skardu', 60, 43, 13000),
(34, 'Shambala Hotel', 'Skardu', 130, 75, 23000),
(35, 'Byarsa Hotel', 'Skardu', 60, 38, 19000),
(36, 'Continental guest House', 'Skardu', 90, 33, 14000),
(37, 'Hotel Deewan-e-Khaas', 'Skardu', 70, 48, 19000),
(38, 'Himalaya Hotel', 'Skardu', 130, 67, 12000),
(39, 'Hotel Travellodge', 'Skardu', 70, 34, 16000),
(40, 'Hotel Xhansa', 'Skardu', 80, 34, 14000),
(41, 'Chitral Inn', 'Chitral', 55, 39, 14000),
(42, 'Legend Hotel', 'Chitral', 50, 34, 21000),
(43, 'hindukush Heights Hotel', 'Chitral', 45, 21, 19000),
(44, 'Kalash Continental Hotel', 'Chitral', 70, 53, 26000),
(45, 'Roomi Hindukush Sarai', 'Chitral', 80, 46, 21000),
(46, 'Tirichmir View Hotel', 'Chitral', 60, 29, 14000),
(47, 'Gahirat Castle', 'Chitral', 30, 12, 12000),
(48, 'Ayun fort Inn', 'Chitral', 40, 22, 19000),
(49, 'Drosh Hotel', 'Chitral', 70, 45, 32800),
(50, 'Hotel Injigaan', 'Chitral', 60, 47, 19000),
(51, 'Hotel One Mall Road', 'Murree', 40, 21, 32000),
(52, 'Grand Taj Hotel', 'Murree', 30, 21, 12000),
(53, 'Mount Heaven Hotel', 'Murree', 50, 25, 18000),
(54, 'Kashmir Continental Hotel', 'Murree', 30, 23, 21000),
(55, 'Reina Boutique Hotel', 'Murree', 40, 23, 19000),
(56, 'the Smart Hotel', 'Murree', 70, 45, 23000),
(57, 'Brightlands Hotel', 'Murree', 30, 12, 17000),
(58, 'Move n Pick Murree', 'Murree', 50, 32, 37000),
(59, 'Dreamland Hotel', 'Murree', 40, 21, 19000),
(60, 'Roomy Junction Hotel', 'Murree', 45, 20, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `hotelsbooked`
--

CREATE TABLE `hotelsbooked` (
  `HotelID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `TotalRooms` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `hotelsbooked`
--
DELIMITER $$
CREATE TRIGGER `deleteDuplicateH` AFTER INSERT ON `hotelsbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteDuplicateH1` AFTER UPDATE ON `hotelsbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteDuplicateH2` AFTER DELETE ON `hotelsbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateRelatedH` BEFORE DELETE ON `hotelsbooked` FOR EACH ROW BEGIN
update booknow set HotelID = 0, Price = Price - OLD.Amount where UserID = OLD.UserID and HotelID = OLD.HotelID;
update hotels set Booked = Booked - OLD.TotalRooms where ID = OLD.HotelID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `showmybookhoteljoin`
-- (See below for the actual view)
--
CREATE TABLE `showmybookhoteljoin` (
`UserID` int(11)
,`Email` varchar(256)
,`HotelID` int(11)
,`Name` varchar(256)
,`Location` varchar(256)
,`Amount` int(11)
,`TotalRooms` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `showmybookjoin`
-- (See below for the actual view)
--
CREATE TABLE `showmybookjoin` (
`UserID` int(11)
,`Email` varchar(256)
,`FlightID` int(11)
,`Airline` varchar(256)
,`Departure` varchar(256)
,`Destination` varchar(256)
,`ChildrenSeats` int(11)
,`AdultSeats` int(11)
,`SeatsBooked` int(11)
,`Amount` int(11)
,`Date` varchar(256)
,`Time` time
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `showmybooktransportjoin`
-- (See below for the actual view)
--
CREATE TABLE `showmybooktransportjoin` (
`UserID` int(11)
,`Email` varchar(256)
,`TransportID` int(11)
,`Mode` varchar(256)
,`Brand` varchar(256)
,`TotalSeats` int(11)
,`AC` varchar(1)
,`Amount` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `showmytourbookjoin`
-- (See below for the actual view)
--
CREATE TABLE `showmytourbookjoin` (
`UserID` int(11)
,`Email` varchar(256)
,`TourID` int(11)
,`Location` varchar(20)
,`ChildrenSeats` int(11)
,`AdultSeats` int(11)
,`TotalSeats` int(11)
,`Amount` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `takestour`
--

CREATE TABLE `takestour` (
  `TourguideID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `TourID` int(11) NOT NULL,
  `DepartureDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `tourguidejoin1`
-- (See below for the actual view)
--
CREATE TABLE `tourguidejoin1` (
`UserID` int(11)
,`Email` varchar(256)
,`TourID` int(11)
,`DepartureDate` datetime
,`TourguideID` int(11)
,`Name` varchar(256)
,`Days` int(11)
,`Location` varchar(20)
);

-- --------------------------------------------------------

--
-- Table structure for table `tourguides`
--

CREATE TABLE `tourguides` (
  `ID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `Cell` char(13) NOT NULL,
  `Location` varchar(256) NOT NULL,
  `Status` varchar(6) NOT NULL
) ;

--
-- Dumping data for table `tourguides`
--

INSERT INTO `tourguides` (`ID`, `Name`, `Email`, `Password`, `Cell`, `Location`, `Status`) VALUES
(7, 'Insha Samnani', 'k200247@nu.edu.pk', '7808faf2493e65c46c56630d4f7f6a80', '+923471678725', 'NK', 'Free'),
(8, 'Yusra Adam', 'k200207@nu.edu.pk', 'fc5e038d38a57032085441e7fe7010b0', '+923471678725', 'Chitral', 'Free');

--
-- Triggers `tourguides`
--
DELIMITER $$
CREATE TRIGGER `encryptpassword2` BEFORE INSERT ON `tourguides` FOR EACH ROW BEGIN
INSERT INTO users_fake VALUES (NULL,MD5(NEW.Password));
SET NEW.Password := (SELECT Password from users_fake where ID = LAST_INSERT_ID());
DELETE from users_fake where ID = LAST_INSERT_ID();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `ID` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `Days` int(11) NOT NULL,
  `Location` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`ID`, `Price`, `Days`, `Location`) VALUES
(1, 14000, 0, 'NK'),
(2, 10000, 7, 'Chitral'),
(3, 13000, 7, 'Hunza'),
(4, 20000, 8, 'Murree'),
(5, 17500, 8, 'Swat'),
(6, 12000, 7, 'Skardu');

-- --------------------------------------------------------

--
-- Table structure for table `toursbooked`
--

CREATE TABLE `toursbooked` (
  `TourID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ChildrenSeats` int(11) NOT NULL,
  `AdultSeats` int(11) NOT NULL,
  `TotalSeats` int(11) NOT NULL,
  `Amount` int(11) NOT NULL
) ;

--
-- Triggers `toursbooked`
--
DELIMITER $$
CREATE TRIGGER `deleteDuplicateTo-insertBooknowTo` AFTER INSERT ON `toursbooked` FOR EACH ROW BEGIN
declare today date;
set today = now();
INSERT INTO booknow(TourID, Price, UserID, DepartureDate) Values (NEW.TourID, NEW.Amount, NEW.UserID, date_add(today, interval 7 day));
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteDuplicateTo1-updateBooknowTo` AFTER UPDATE ON `toursbooked` FOR EACH ROW BEGIN
update booknow set Price = Price - OLD.Amount + NEW.Amount where UserID = NEW.UserID and TourID = NEW.TourID;
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteDuplicateTo2` AFTER DELETE ON `toursbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteRelatedTo` BEFORE DELETE ON `toursbooked` FOR EACH ROW delete from booknow where UserID = OLD.UserID and TourID = OLD.TourID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `transport`
--

CREATE TABLE `transport` (
  `ID` int(11) NOT NULL,
  `Mode` varchar(256) NOT NULL,
  `Brand` varchar(256) NOT NULL,
  `Seats` int(11) NOT NULL,
  `AC` varchar(1) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Status` varchar(256) NOT NULL
) ;

--
-- Dumping data for table `transport`
--

INSERT INTO `transport` (`ID`, `Mode`, `Brand`, `Seats`, `AC`, `Amount`, `Status`) VALUES
(0, '', '', 0, '', 0, 'Booked'),
(4, 'Car', 'Corolla', 0, '1', 1200, 'Booked'),
(5, 'Train', 'Karachi Express', 0, '0', 3500, 'Booked'),
(6, 'Train', 'Khyber Mail', 4, '1', 7000, 'Free'),
(7, 'Train', 'Pakistan Business Express', 3, '0', 4000, 'Free'),
(8, 'Train', 'Pakistan Express', 2, '1', 5000, 'Free'),
(9, 'Train', 'Sir Syed Express', 9, '0', 3500, 'Free'),
(10, 'Train', 'Green Line Express', 3, '0', 5000, 'Free'),
(11, 'Train', 'Taizgam Express', 12, '0', 3400, 'Free'),
(12, 'Train', 'Hazara Express', 1, '1', 5500, 'Free'),
(13, 'Train', 'Islamabad Express', 7, '0', 3200, 'Free'),
(14, 'Car', 'Swift', 4, '1', 3200, 'Free'),
(15, 'Car', 'Mehran', 1, '0', 800, 'Free'),
(16, 'Car', 'Audi', 4, '0', 1350, 'Free'),
(17, 'Car', 'Audi', 4, '1', 1700, 'Free'),
(18, 'Car', 'Mercedes', 4, '1', 9050, 'Free'),
(19, 'Hiroof', 'Suzuki', 7, '0', 2000, 'Free'),
(20, 'Hiroof', 'Suzuki', 7, '1', 3500, 'Free'),
(21, 'Hiroof', 'Toyota Hiace', 7, '0', 3500, 'Free'),
(22, 'Hiroof', 'Toyota Hiace', 7, '1', 4500, 'Free'),
(23, 'Hiroof', 'Daihatsu Charade', 6, '0', 3000, 'Free'),
(24, 'Hiroof', 'Daihatsu Charade', 7, '1', 4500, 'Free'),
(25, 'Hiace', 'Toyota', 14, '1', 4000, 'Free'),
(26, 'Car', 'Yaris', 2, '1', 5600, 'Free'),
(27, 'Car', 'Pirus', 4, '1', 5600, 'Free'),
(28, 'Car', 'Camry', 4, '1', 5600, 'Free'),
(29, 'Car', 'Avanza', 4, '1', 5800, 'Free'),
(30, 'Hiace', 'Toyota', 16, '0', 3000, 'Free'),
(31, 'Hiace', 'Toyota 2', 15, '1', 3800, 'Free'),
(32, 'Hiace', 'Toyota 3', 15, '0', 2800, 'Free'),
(33, 'Hiace', 'Toyota 4', 14, '1', 3800, 'Free'),
(34, 'Hiace', 'Toyota 5', 0, '1', 2700, 'Booked'),
(35, 'Car', 'Alto', 4, '1', 3000, 'Free'),
(36, 'Car', 'Alto', 4, '0', 2100, 'Free'),
(37, 'Bus', 'Faisal Movers', 10, '1', 6500, 'Free'),
(38, 'Bus', 'Daewoo Express', 10, '1', 7000, 'Free'),
(39, 'Bus', 'Sada Bahar Coaches', 6, '1', 5600, 'Free'),
(40, 'Bus', 'Road Master', 8, '1', 6700, 'Free'),
(41, 'Bus', 'Waraich Express', 10, '1', 5400, 'Free'),
(42, 'Bus', 'Niazi Express', 8, '1', 3600, 'Free'),
(43, 'Bus', 'Manthar Transport Company', 9, '1', 6700, 'Free'),
(44, 'Bus', 'Q Connect', 2, '1', 5600, 'Free'),
(45, 'Bus', 'Skyways', 0, '1', 6600, 'Booked'),
(46, 'Jeep', 'Jeep Wrangler', 4, '0', 2800, 'Free'),
(47, 'Jeep', 'Jeep M 151', 5, '0', 3000, 'Free'),
(48, 'Jeep', 'Jeep Cherokee', 5, '0', 2500, 'Free'),
(49, 'Jeep', 'Jeep Gladiator', 17, '0', 2900, 'Free'),
(50, 'Jeep', 'Jeep CJ 5', 3, '0', 2500, 'Free'),
(101, 'Car', 'Luzi', 5, '0', 12000, 'Free');

-- --------------------------------------------------------

--
-- Table structure for table `transportbooked`
--

CREATE TABLE `transportbooked` (
  `TransportID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `TotalSeats` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `transportbooked`
--
DELIMITER $$
CREATE TRIGGER `deleteDuplicateT1` AFTER UPDATE ON `transportbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteDuplicateT2` AFTER DELETE ON `transportbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deleteDuplicatedT` AFTER INSERT ON `transportbooked` FOR EACH ROW BEGIN
INSERT INTO booknow_temp SELECT * FROM booknow GROUP BY TourID,Price,UserID,TransportID,HotelID,DepartureDate;
DELETE FROM booknow;
INSERT INTO booknow SELECT * FROM booknow_temp;
DELETE FROM booknow_temp;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateRelatedT` BEFORE DELETE ON `transportbooked` FOR EACH ROW BEGIN
update booknow set TransportID = 0, Price = Price - OLD.Amount where UserID = OLD.UserID and TransportID = OLD.TransportID;
update transport set Seats = Seats + OLD.TotalSeats, status = 'Free' where ID = OLD.TransportID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `Cell` char(13) NOT NULL
) ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Name`, `Email`, `Password`, `Cell`) VALUES
(37, 'Muazzam', 'muazzam.ali72@gmail.com', '7747e1d89a2ea084064735bb4167ef46', '+923471678725'),
(41, 'Insha Samnani', 'insha.samnani2002@gmail.com', '902cf12873451182806aad0bc8d808cc', '+923471678725'),
(42, 'Rayyan', 'k201083@nu.edu.pk', 'b86d1b6311f7ee1d7701f326051c8158', '+923471678725');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `encryptpassword` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
INSERT INTO users_fake VALUES (NULL,MD5(NEW.Password));
SET NEW.Password := (SELECT Password from users_fake where ID = LAST_INSERT_ID());
DELETE from users_fake where ID = LAST_INSERT_ID();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users_fake`
--

CREATE TABLE `users_fake` (
  `ID` int(11) NOT NULL,
  `Password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure for view `adminjoin`
--
DROP TABLE IF EXISTS `adminjoin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `adminjoin`  AS SELECT `ffl`.`Amount` AS `Amount`, `f`.`ChildrenSeats` AS `ChildrenSeats`, `f`.`AdultSeats` AS `AdultSeats` FROM (`flights` `ffl` join `flightsbooked` `f` on(`ffl`.`ID` = `f`.`FlightID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `adminjoin1`
--
DROP TABLE IF EXISTS `adminjoin1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `adminjoin1`  AS SELECT `tt`.`Price` AS `Price`, `t`.`ChildrenSeats` AS `ChildrenSeats`, `t`.`AdultSeats` AS `AdultSeats` FROM (`toursbooked` `t` join `tours` `tt` on(`t`.`TourID` = `tt`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `adminjoin2`
--
DROP TABLE IF EXISTS `adminjoin2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `adminjoin2`  AS SELECT `ttr`.`Amount` AS `Amount`, `tr`.`TotalSeats` AS `TotalSeats` FROM (`transportbooked` `tr` join `transport` `ttr` on(`tr`.`TransportID` = `ttr`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `adminjoin3`
--
DROP TABLE IF EXISTS `adminjoin3`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `adminjoin3`  AS SELECT `hh`.`Price` AS `Price`, `h`.`TotalRooms` AS `TotalRooms` FROM (`hotelsbooked` `h` join `hotels` `hh` on(`h`.`HotelID` = `hh`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `showmybookhoteljoin`
--
DROP TABLE IF EXISTS `showmybookhoteljoin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `showmybookhoteljoin`  AS SELECT `hotelsbooked`.`UserID` AS `UserID`, `users`.`Email` AS `Email`, `hotelsbooked`.`HotelID` AS `HotelID`, `hotels`.`Name` AS `Name`, `hotels`.`Location` AS `Location`, `hotelsbooked`.`Amount` AS `Amount`, `hotelsbooked`.`TotalRooms` AS `TotalRooms` FROM ((`hotelsbooked` join `hotels` on(`hotelsbooked`.`HotelID` = `hotels`.`ID`)) join `users` on(`hotelsbooked`.`UserID` = `users`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `showmybookjoin`
--
DROP TABLE IF EXISTS `showmybookjoin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `showmybookjoin`  AS SELECT `flightsbooked`.`UserID` AS `UserID`, `users`.`Email` AS `Email`, `flightsbooked`.`FlightID` AS `FlightID`, `flights`.`Airline` AS `Airline`, `flights`.`Departure` AS `Departure`, `flights`.`Destination` AS `Destination`, `flightsbooked`.`ChildrenSeats` AS `ChildrenSeats`, `flightsbooked`.`AdultSeats` AS `AdultSeats`, `flightsbooked`.`SeatsBooked` AS `SeatsBooked`, `flightsbooked`.`Amount` AS `Amount`, `flights`.`Date` AS `Date`, `flights`.`Time` AS `Time` FROM ((`flightsbooked` join `flights` on(`flightsbooked`.`FlightID` = `flights`.`ID`)) join `users` on(`flightsbooked`.`UserID` = `users`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `showmybooktransportjoin`
--
DROP TABLE IF EXISTS `showmybooktransportjoin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `showmybooktransportjoin`  AS SELECT `transportbooked`.`UserID` AS `UserID`, `users`.`Email` AS `Email`, `transportbooked`.`TransportID` AS `TransportID`, `transport`.`Mode` AS `Mode`, `transport`.`Brand` AS `Brand`, `transportbooked`.`TotalSeats` AS `TotalSeats`, `transport`.`AC` AS `AC`, `transportbooked`.`Amount` AS `Amount` FROM ((`transportbooked` join `transport` on(`transportbooked`.`TransportID` = `transport`.`ID`)) join `users` on(`transportbooked`.`UserID` = `users`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `showmytourbookjoin`
--
DROP TABLE IF EXISTS `showmytourbookjoin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `showmytourbookjoin`  AS SELECT `toursbooked`.`UserID` AS `UserID`, `users`.`Email` AS `Email`, `toursbooked`.`TourID` AS `TourID`, `tours`.`Location` AS `Location`, `toursbooked`.`ChildrenSeats` AS `ChildrenSeats`, `toursbooked`.`AdultSeats` AS `AdultSeats`, `toursbooked`.`TotalSeats` AS `TotalSeats`, `toursbooked`.`Amount` AS `Amount` FROM ((`toursbooked` join `tours` on(`toursbooked`.`TourID` = `tours`.`ID`)) join `users` on(`toursbooked`.`UserID` = `users`.`ID`))  ;

-- --------------------------------------------------------

--
-- Structure for view `tourguidejoin1`
--
DROP TABLE IF EXISTS `tourguidejoin1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tourguidejoin1`  AS SELECT `takestour`.`UserID` AS `UserID`, `users`.`Email` AS `Email`, `takestour`.`TourID` AS `TourID`, `takestour`.`DepartureDate` AS `DepartureDate`, `takestour`.`TourguideID` AS `TourguideID`, `users`.`Name` AS `Name`, `tours`.`Days` AS `Days`, `tours`.`Location` AS `Location` FROM ((`takestour` join `tours` on(`takestour`.`TourID` = `tours`.`ID`)) join `users` on(`takestour`.`UserID` <> 0))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `booknow`
--
ALTER TABLE `booknow`
  ADD KEY `booknow_fk1` (`UserID`),
  ADD KEY `booknow_fk2` (`TourID`),
  ADD KEY `booknow_fk3` (`TransportID`),
  ADD KEY `booknow_fk4` (`HotelID`);

--
-- Indexes for table `booknow_history`
--
ALTER TABLE `booknow_history`
  ADD KEY `booknowhistory_fk1` (`UserID`),
  ADD KEY `booknowhistory_fk2` (`TourID`),
  ADD KEY `booknowhistory_fk3` (`TransportID`),
  ADD KEY `booknowhistory_fk4` (`HotelID`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `flightsbooked`
--
ALTER TABLE `flightsbooked`
  ADD PRIMARY KEY (`UserID`,`FlightID`),
  ADD KEY `flightsbooked_fk2` (`FlightID`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `hotelsbooked`
--
ALTER TABLE `hotelsbooked`
  ADD PRIMARY KEY (`HotelID`,`UserID`),
  ADD KEY `hotelsbooked_fk1` (`UserID`);

--
-- Indexes for table `takestour`
--
ALTER TABLE `takestour`
  ADD PRIMARY KEY (`TourguideID`),
  ADD KEY `takestour_fk1` (`UserID`),
  ADD KEY `takestour_fk2` (`TourID`);

--
-- Indexes for table `tourguides`
--
ALTER TABLE `tourguides`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `toursbooked`
--
ALTER TABLE `toursbooked`
  ADD PRIMARY KEY (`TourID`,`UserID`),
  ADD KEY `toursbooked_fk2` (`UserID`);

--
-- Indexes for table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `transportbooked`
--
ALTER TABLE `transportbooked`
  ADD PRIMARY KEY (`TransportID`,`UserID`),
  ADD KEY `transportbooked_fk1` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `users_fake`
--
ALTER TABLE `users_fake`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tourguides`
--
ALTER TABLE `tourguides`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transport`
--
ALTER TABLE `transport`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_fake`
--
ALTER TABLE `users_fake`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booknow`
--
ALTER TABLE `booknow`
  ADD CONSTRAINT `booknow_fk1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `booknow_fk2` FOREIGN KEY (`TourID`) REFERENCES `tours` (`ID`),
  ADD CONSTRAINT `booknow_fk3` FOREIGN KEY (`TransportID`) REFERENCES `transport` (`ID`),
  ADD CONSTRAINT `booknow_fk4` FOREIGN KEY (`HotelID`) REFERENCES `hotels` (`ID`);

--
-- Constraints for table `booknow_history`
--
ALTER TABLE `booknow_history`
  ADD CONSTRAINT `booknow_history_fk1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `flightsbooked`
--
ALTER TABLE `flightsbooked`
  ADD CONSTRAINT `flightsbooked_fk1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `flightsbooked_fk2` FOREIGN KEY (`FlightID`) REFERENCES `flights` (`ID`),
  ADD CONSTRAINT `flightsbooked_ibfk_1` FOREIGN KEY (`FlightID`) REFERENCES `flights` (`ID`),
  ADD CONSTRAINT `flightsbooked_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `hotelsbooked`
--
ALTER TABLE `hotelsbooked`
  ADD CONSTRAINT `hotelsbooked_fk1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `hotelsbooked_fk2` FOREIGN KEY (`HotelID`) REFERENCES `hotels` (`ID`);

--
-- Constraints for table `takestour`
--
ALTER TABLE `takestour`
  ADD CONSTRAINT `takestour_fk1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `takestour_fk2` FOREIGN KEY (`TourID`) REFERENCES `tours` (`ID`),
  ADD CONSTRAINT `takestour_fk3` FOREIGN KEY (`TourguideID`) REFERENCES `tourguides` (`ID`);

--
-- Constraints for table `toursbooked`
--
ALTER TABLE `toursbooked`
  ADD CONSTRAINT `toursbooked_fk1` FOREIGN KEY (`TourID`) REFERENCES `tours` (`ID`),
  ADD CONSTRAINT `toursbooked_fk2` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `transportbooked`
--
ALTER TABLE `transportbooked`
  ADD CONSTRAINT `transportbooked_fk1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `transportbooked_fk2` FOREIGN KEY (`TransportID`) REFERENCES `transport` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
