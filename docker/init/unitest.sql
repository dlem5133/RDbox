-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.5.8-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- test 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `test`;
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;

-- 테이블 test.item 구조 내보내기
DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `cnt` int(10) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- 테이블 데이터 test.item:~2 rows (대략적) 내보내기
DELETE FROM `item`;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`id`, `name`, `cnt`) VALUES
	(1, '귤', 0000000008),
	(2, '토마호크', 0000000007);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- 테이블 test.user 구조 내보내기
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `kakaoid` varchar(50) CHARACTER SET utf8 NOT NULL,
  `nickname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `isdraw` tinyint(4) DEFAULT 0,
  `item` varchar(50) CHARACTER SET utf8 DEFAULT 'x',
  PRIMARY KEY (`kakaoid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 테이블 데이터 test.user:~2 rows (대략적) 내보내기
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`kakaoid`, `nickname`, `isdraw`, `item`) VALUES
	('1234', '조용우', 0, '귤'),
	('test', '김수현', 0, '귤');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
