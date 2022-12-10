-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: cu_data
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add product',7,'add_product'),(26,'Can change product',7,'change_product'),(27,'Can delete product',7,'delete_product'),(28,'Can view product',7,'view_product'),(29,'Can add tag',8,'add_tag'),(30,'Can change tag',8,'change_tag'),(31,'Can delete tag',8,'delete_tag'),(32,'Can view tag',8,'view_tag'),(33,'Can add rate',9,'add_rate'),(34,'Can change rate',9,'change_rate'),(35,'Can delete rate',9,'delete_rate'),(36,'Can view rate',9,'view_rate'),(37,'Can add like',10,'add_like'),(38,'Can change like',10,'change_like'),(39,'Can delete like',10,'delete_like'),(40,'Can view like',10,'view_like'),(41,'Can add Token',11,'add_token'),(42,'Can change Token',11,'change_token'),(43,'Can delete Token',11,'delete_token'),(44,'Can view Token',11,'view_token'),(45,'Can add token',12,'add_tokenproxy'),(46,'Can change token',12,'change_tokenproxy'),(47,'Can delete token',12,'delete_tokenproxy'),(48,'Can view token',12,'view_tokenproxy');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2022-12-05 15:13:22.775000','2','도)벌교꼬막비빔밥',2,'[{\"changed\": {\"fields\": [\"LikedCount\"]}}]',9,1),(2,'2022-12-05 18:45:39.898000','15','Like object (15)',3,'',10,1),(3,'2022-12-05 18:45:39.913000','10','Like object (10)',3,'',10,1),(4,'2022-12-05 18:45:39.924000','9','Like object (9)',3,'',10,1),(5,'2022-12-05 18:45:39.937000','5','Like object (5)',3,'',10,1),(6,'2022-12-05 18:45:39.950000','4','Like object (4)',3,'',10,1),(7,'2022-12-05 18:45:39.963000','3','Like object (3)',3,'',10,1),(8,'2022-12-05 18:45:39.976000','1','Like object (1)',3,'',10,1),(9,'2022-12-05 18:45:44.517000','17','Like object (17)',3,'',10,1),(10,'2022-12-05 18:45:50.044000','14','라벨리)옥수수익어가는바',3,'',9,1),(11,'2022-12-05 18:45:50.058000','13','도)자이언트일품닭강정',3,'',9,1),(12,'2022-12-05 18:45:50.073000','12','도)자이언트일품닭강정',3,'',9,1),(13,'2022-12-05 18:45:50.089000','10','도)벌교꼬막비빔밥',3,'',9,1),(14,'2022-12-05 18:45:50.102000','9','라벨리)옥수수익어가는바',3,'',9,1),(15,'2022-12-05 18:45:50.117000','8','도)자이언트일품닭강정',3,'',9,1),(16,'2022-12-05 18:45:50.130000','7','라벨리)옥수수익어가는바',3,'',9,1),(17,'2022-12-05 18:45:50.146000','6','도)자이언트일품닭강정',3,'',9,1),(18,'2022-12-05 18:45:50.159000','5','도)벌교꼬막비빔밥',3,'',9,1),(19,'2022-12-05 18:45:50.172000','4','도)벌교꼬막비빔밥',3,'',9,1),(20,'2022-12-05 18:45:50.186000','3','도)벌교꼬막비빔밥',3,'',9,1),(21,'2022-12-05 18:45:50.197000','2','도)벌교꼬막비빔밥',3,'',9,1),(22,'2022-12-05 18:45:50.211000','1','도)벌교꼬막비빔밥',3,'',9,1),(23,'2022-12-05 19:29:40.550000','31','도)유니짜장덮밥',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(24,'2022-12-05 19:29:46.428000','24','도)자이언트일품닭강정',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(25,'2022-12-05 20:30:29.445000','15','도)벌교꼬막비빔밥',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(26,'2022-12-05 20:30:37.688000','19','도)벌교꼬막비빔밥',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(27,'2022-12-05 20:30:46.156000','23','도)벌교꼬막비빔밥',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(28,'2022-12-05 20:31:17.390000','27','도)벌교꼬막비빔밥',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(29,'2022-12-05 20:32:00.692000','30','라벨리)옥수수익어가는바',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(30,'2022-12-05 20:32:11.008000','26','라벨리)옥수수익어가는바',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(31,'2022-12-05 20:32:19.380000','17','라벨리)옥수수익어가는바',2,'[{\"changed\": {\"fields\": [\"Created at\"]}}]',9,1),(32,'2022-12-05 20:46:01.837000','39','Like object (39)',3,'',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(11,'authtoken','token'),(12,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(10,'product','like'),(7,'product','product'),(9,'product','rate'),(8,'product','tag'),(5,'sessions','session'),(6,'user','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-12-10 06:47:52.743859'),(2,'contenttypes','0002_remove_content_type_name','2022-12-10 06:47:52.820417'),(3,'auth','0001_initial','2022-12-10 06:47:53.037565'),(4,'auth','0002_alter_permission_name_max_length','2022-12-10 06:47:53.104375'),(5,'auth','0003_alter_user_email_max_length','2022-12-10 06:47:53.112324'),(6,'auth','0004_alter_user_username_opts','2022-12-10 06:47:53.121497'),(7,'auth','0005_alter_user_last_login_null','2022-12-10 06:47:53.134290'),(8,'auth','0006_require_contenttypes_0002','2022-12-10 06:47:53.139489'),(9,'auth','0007_alter_validators_add_error_messages','2022-12-10 06:47:53.152201'),(10,'auth','0008_alter_user_username_max_length','2022-12-10 06:47:53.162431'),(11,'auth','0009_alter_user_last_name_max_length','2022-12-10 06:47:53.172795'),(12,'auth','0010_alter_group_name_max_length','2022-12-10 06:47:53.234237'),(13,'auth','0011_update_proxy_permissions','2022-12-10 06:47:53.245194'),(14,'auth','0012_alter_user_first_name_max_length','2022-12-10 06:47:53.255083'),(15,'user','0001_initial','2022-12-10 06:47:53.531888'),(16,'admin','0001_initial','2022-12-10 06:47:53.656581'),(17,'admin','0002_logentry_remove_auto_add','2022-12-10 06:47:53.666838'),(18,'admin','0003_logentry_add_action_flag_choices','2022-12-10 06:47:53.679066'),(19,'authtoken','0001_initial','2022-12-10 06:47:53.766822'),(20,'authtoken','0002_auto_20160226_1747','2022-12-10 06:47:53.797689'),(21,'authtoken','0003_tokenproxy','2022-12-10 06:47:53.806311'),(22,'product','0001_initial','2022-12-10 06:47:54.209689'),(23,'sessions','0001_initial','2022-12-10 06:47:54.250219');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('04pmtnj1uity0ilbdgjaxk7efxomqq7d','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2xJp:6QFyefM9COaFlttkgqlgMhTMYhR2-5O6FtLTwqanTRc','2022-12-22 01:30:49.575000'),('26af0ps7wssqkvo95hva0hzxmhbz6t56','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p24db:fboESMFk1dgcPUL_-PR-tEp-wmgBY0e9zFr9Pc3N8AU','2022-12-19 15:07:35.882000'),('3vzxtwja2hcpsypdwp41fsyf4mt4ikdl','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2t73:QY2M4KyZTP08KwOfkqS3Ft9krtr9cvUJmPslqGz7gHw','2022-12-21 21:01:21.294000'),('4g2c3cgwo8gkeebv7ofa6km0ds5pg1r9','.eJxVjEEOwiAQRe_C2hBogVKX7j1DMzPMSNVAUtqV8e7apAvd_vfef6kJtjVPW-NlmpM6K9up0--IQA8uO0l3KLeqqZZ1mVHvij5o09ea-Hk53L-DDC1_a4ngxYNYMKM31kdONjClSBggdoMbMPQAhj2R2OTIinPCLDh6hB7V-wMp8jl7:1p2sJr:zF3I-gIE3MgkwKCiCoaJzIfdb9v5-l2OSIWstR5aFAA','2022-12-21 20:10:31.309000'),('4zqspkl9gd8ppw3tgn4muxj1v9pshrxt','.eJxVjEEOwiAQRe_C2hAGpgFcuvcMZIBBqgaS0q6Md9cmXej2v_f-SwTa1hq2wUuYszgLI06_W6T04LaDfKd26zL1ti5zlLsiDzrktWd-Xg7376DSqN86lTyBQiIDPhe2hISgClnEjKSUK56dieCRTdEa0uTQIRNYhwZBi_cH7p83Yw:1p24X2:Laf1pGd79lZBHzMAmmA1MRBLSj9PAVZmXdgBxMXthLg','2022-12-19 15:00:48.242000'),('64e14md0dcrflq17437txclxbfzes566','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p24JK:5-Uzx5Ef0ZheQFGx84cytR6xgV5h-D5JEBUv0bkZr30','2022-12-19 14:46:38.831000'),('6qx3ve7suyki00f1qzmkxc92tl14bqbz','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p25ix:01-I59RIbXGm-Y5K2ubU_R8qWz9K9ENXtXH8OueMdYU','2022-12-19 16:17:11.470000'),('76bcfoh0i26kn2t7tpfoqeeyv6ah1ff5','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p3mOE:fv9sSJxLAyaOSNBGXwfROS7aACuPNASb3AwcwBD8ZqU','2022-12-24 08:02:46.842077'),('9sel73bxw5k7lc4l9b3ur5au148s89yi','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p24Lv:QyqYsCUiW-UkaYXBZ39WndjeA0nbVhuyIHrY4_P8hI4','2022-12-19 14:49:19.716000'),('c7hs5nllg5chthv0d1vu4sjxnee7lg6p','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2ltf:r1UL1xD74ljxWKWo56CkM6hg2_gMDer6MNw4Qq6NsRM','2022-12-21 13:19:03.251000'),('clga7y9vj3tp4wo4ei2xpjed7qxglaax','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2xS4:SIgrrL7PPxBWI01Dbxx8JgQVJcglupax3V_0nMASMAU','2022-12-22 01:39:20.069000'),('ful1ykqsmhl7pek213ckbvjj407pc6zr','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p1yqW:DfsFHE7mWPhzWDmRwu1kj2zQkd5MM79TT67_ICLavv8','2022-12-19 08:56:32.419000'),('g10j0x88xo60eafq6eoxplf40ytts06v','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2xLL:zv6sfZYOL9O1nUlRt7leAvxjt3f9GDwTI3sAsgq4pYc','2022-12-22 01:32:23.571000'),('ge8g9s9imh1w2q5ak7zrjmb9ifhgsh5t','.eJxVjMsOwiAQRf-FtSFDGQq4dO83kBkeUjU0Ke3K-O_apAvd3nPOfYlA21rD1vMSpiTOYhSn340pPnLbQbpTu80yzm1dJpa7Ig_a5XVO-Xk53L-DSr1-62iSwjKiTjEaqzwVZrRKgzMOEis_WEJg1BlwcGA4e83W6EKkLFgU7w_aTDcz:1p1yzJ:B_2pf_dfxq_F2bm3qw6X537Flc3KWWhIx5MRixNcZgc','2022-12-19 09:05:37.641000'),('gr5jibtd7dxax4mmrxu7lgq5i8bjp6c5','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2wlY:ykPjvXmnBW58jb-Aht-0Wxwk6N9SMuFObgCu5T6SUkk','2022-12-22 00:55:24.568000'),('huudf3pxehg1sr15953n8mq6xeuorlgh','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p2EIf:seLXJVizW-_e7GlnlPP3nwdkqLcPrGN5gvw0F42YP2c','2022-12-20 01:26:37.479000'),('nzmdw9s9xgezm1zouoo337ecswxrulao','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p2xSt:RFK2b8DG-A0Se7e6895Eth1KcqD9zNy1C5ta637nUgU','2022-12-22 01:40:11.895000'),('o71zrw49eorfukfh05pdhoua9a4z48mh','.eJxVjMsOwiAQRf-FtSFDGQq4dO83kBkeUjU0Ke3K-O_apAvd3nPOfYlA21rD1vMSpiTOYhSn340pPnLbQbpTu80yzm1dJpa7Ig_a5XVO-Xk53L-DSr1-62iSwjKiTjEaqzwVZrRKgzMOEis_WEJg1BlwcGA4e83W6EKkLFgU7w_aTDcz:1p2EKN:SFyvhfv8twYH6XhnFE2HBLqcvqZ8WZcPi8os9Ucdw6Q','2022-12-20 01:28:23.655000'),('p8r6p4gfh22bdl346kkf0pvai19g74ee','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p2TP6:sWaOthEirkQ5C5PasJLGQp6biqrVId6uJjhfUyZ2t_Q','2022-12-20 17:34:16.468000'),('pn8mlm89gdn460vg49q5x5wtescukbc5','.eJxVjEEOwiAQRe_C2pAp0AFcuvcMBBhGqoYmpV0Z765NutDtf-_9lwhxW2vYelnCROIsBiNOv2OK-VHaTuge222WeW7rMiW5K_KgXV5nKs_L4f4d1Njrt06Dt6MaFeqI3njNRntWbJETA1NElQkAoRhPbMA61JwVOlKuONYg3h_t7TeP:1p2xYu:pnzQpaPojkOgF27SxaVhkkzRxTxdbL1JbvTkMcJ6VXc','2022-12-22 01:46:24.355000'),('rixjtv4imkja7zn9u6b18fb1b58qxh63','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p2Ead:UU3qRxe8ecmlA_hj-R4R25KtHixffPVHIxmqraKN-e0','2022-12-20 01:45:11.750000'),('sprawcqxcdugz1vasg1z6c2jof2m1i45','.eJxVjMsOwiAQRf-FtSFDGQq4dO83kBkeUjU0Ke3K-O_apAvd3nPOfYlA21rD1vMSpiTOYhSn340pPnLbQbpTu80yzm1dJpa7Ig_a5XVO-Xk53L-DSr1-62iSwjKiTjEaqzwVZrRKgzMOEis_WEJg1BlwcGA4e83W6EKkLFgU7w_aTDcz:1p2Edo:AHegL7BGWJu-D6yVda4rJBhspmJ-hB9E4fPVaH-fBCw','2022-12-20 01:48:28.826000'),('swawdrgf7i0wejqe09i8itrr2fmozknr','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p24HS:bz4UfX-tRAeu_0OGALN7osa8zwe00jAVzT1yreXN7b0','2022-12-19 14:44:42.727000'),('ts0vb0q91g9i710kqmk6iqhym37fpa37','.eJxVjEEOwiAQRe_C2pAMUxBcuvcMZOgMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqiQJ1-t0TjU-oO-EH13vTY6jJPSe-KPmjXt8byuh7u30GhXr51GighoxXLZ8fCgMl6CAToGMAMFn0WQiPBCmdCl8kFlxkpJD8Yq94f8so4Ng:1p38n5:qdgpmoSY_ncgo1y3W-XQJ7r6I32-rlFWxlIXR4mjexA','2022-12-22 13:45:47.171000'),('vj640paly78v1tiugkave6ux9nx5xmi9','.eJxVjEEOwiAQRe_C2hBgwIJL956BzMBUqgaS0q6Md7dNutDtf-_9t4i4LiWunec4ZXERWpx-N8L05LqD_MB6bzK1uswTyV2RB-3y1jK_rof7d1Cwl60mCEaRI4vagQI1UPKjMxDYKEzWkmMO3gUckiIaN6gsY84MXhOcvfh8AdqwOCM:1p2TP6:sWaOthEirkQ5C5PasJLGQp6biqrVId6uJjhfUyZ2t_Q','2022-12-20 17:34:16.377000'),('wy2hdp0y0nne5frwvqcmcqkflse4e2us','.eJxVjDsOwjAQBe_iGln-xfZS0nOGaL27JgEUS_lUiLtDpBTQvpl5L9Xjtg79tsjcj6zOyqnT71aQHjLtgO843ZqmNq3zWPSu6IMu-tpYnpfD_TsYcBm-dYrVWPDReMBkOwqZnYQQMEqByMkbBxAAyRHV6EyORYA7w1JNRrLq_QG9yjd9:1p2m8f:lvZsBl07jiEwH6FPDUmgBb9pqupFW2tn7mqzaLvRQBw','2022-12-21 13:34:33.724000'),('zv8tb83piu01n0wsonf128qv6rs2dcsg','.eJxVjDEOwjAMRe-SGUW4NHHCyN4zRHbskgJqpKadEHdHlTrA-t97_20SbWtJW9MlTWKuxpnT78aUnzrvQB4036vNdV6Xie2u2IM2O1TR1-1w_w4KtbLXQYkBo1cfGPqxU3EeY9QxiqKcHSpr5s6LoPPkIbsOYISew4Uiovl8AQTMOFY:1p2533:UXYP0G4VtlIXKDtUjRAB_5R1K5byoyhDmPD8EQ2xNu0','2022-12-19 15:33:53.043000');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_like`
--

DROP TABLE IF EXISTS `product_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rate_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_like_rate_id_d734cfa1_fk_product_rate_id` (`rate_id`),
  KEY `product_like_user_id_afa8c60b_fk_user_user_id` (`user_id`),
  CONSTRAINT `product_like_rate_id_d734cfa1_fk_product_rate_id` FOREIGN KEY (`rate_id`) REFERENCES `product_rate` (`id`),
  CONSTRAINT `product_like_user_id_afa8c60b_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_like`
--

LOCK TABLES `product_like` WRITE;
/*!40000 ALTER TABLE `product_like` DISABLE KEYS */;
INSERT INTO `product_like` VALUES (18,15,6),(19,18,6),(20,26,5),(21,17,5),(22,15,5),(23,24,5),(24,28,5),(25,16,1),(26,28,1),(27,20,1),(28,18,1),(29,15,1),(30,23,1),(31,17,1),(50,28,3),(52,24,3),(53,23,3),(55,27,3),(56,15,3),(57,17,6),(60,23,6),(61,19,6),(69,40,11),(71,43,14),(72,71,14),(73,41,14),(74,46,14),(75,74,14),(76,75,1),(77,59,14);
/*!40000 ALTER TABLE `product_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_product`
--

DROP TABLE IF EXISTS `product_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `mainCategory` varchar(100) NOT NULL,
  `subCategory` varchar(300) NOT NULL,
  `imageUrl` varchar(200) NOT NULL,
  `details` longtext NOT NULL,
  `price` int NOT NULL,
  `newProduct` tinyint(1) NOT NULL,
  `averageScore` double NOT NULL,
  `rateCount` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_product`
--

LOCK TABLES `product_product` WRITE;
/*!40000 ALTER TABLE `product_product` DISABLE KEYS */;
INSERT INTO `product_product` VALUES (1,'도)벌교꼬막비빔밥','간편식사','도시락','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809196616970.jpg','꼬막을 풍성하게 구성항 외관과 비쥬얼을 극대화 하였음(일부지역 미운영)',5000,1,4.13,12),(2,'도)자이언트일품닭강정','간편식사','도시락','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025320.jpg','지금까지 출시한 자이언트 닭강정 시리즈 중 가장 인기있는 레시피 적용',9900,1,4.08,8),(3,'도)자이언트중화양장피','간편식사','도시락','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025399.jpg','든든한 용량! 보장된 맛! 합리적 가격! 자이언트 안주시리즈의 새로운 상품!',9900,1,4,1),(4,'도)유니짜장덮밥','간편식사','도시락','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809802266322.jpg','살짝 매콤한 맛으로 느끼하지 않고 깔끔하게 먹을 수 있는 짜장덮밥',3500,0,3.8,5),(5,'도)불짬뽕덮밥','간편식사','도시락','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025351.jpg','런치플레이션 시기 가성비 덮밥 출시!',3500,0,0,0),(6,'도)듀록목살찹스테이크','간편식사','도시락','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809802266223.jpg','찹스테이크를 메인으로 푸드트럭과 웨스턴컨셉을 조합한 프리미엄 상품',6900,0,0,0),(7,'햄)더블롱킹너비아니버거','간편식사','샌드위치/햄버거','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025474.jpg','두툼한 너비아니패티 2장에 마늘향이 가득한 마늘간장 소스를 듬뿍올린 더블롱킹너비아니버거(일부지역 미운영)',3500,1,0,0),(8,'핫)미트칠리빅핫도그','간편식사','샌드위치/햄버거','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg','육즙가득한 소시지에 매콤한 미트칠리소스를 가득 올린 미국식 핫도그',3600,1,0,0),(9,'핫)스노잉치즈빅핫도그','간편식사','샌드위치/햄버거','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957312.jpg','육즙가득한 통통한 롱소시지에 고소한 치즈를 가득 올린 미국식 핫도그',3600,1,0,0),(10,'햄)청양마요너비아니버거','간편식사','샌드위치/햄 버거','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953623.jpg','크리미한 머쉬룸 드레싱,청양소스,불고기소스로 풍부한 맛을 낸 너비아니 버거',3500,0,0,0),(11,'햄)파마산칠리치즈버거','간편식사','샌드위치/햄버거','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068406542.jpg','단짠 고소한 파마산번에 스테이크 패티에 슬라이스 치즈를 얹고 매콤달콤한 칠리소스와 크래프트 파마산가루를 토핑하여 맛의 풍미를 살린 한끼 대용 버거',3500,0,0,0),(12,'햄)파마산스테이크버거','간편식사','샌드위치/햄버거','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068406566.jpg','단짠 고소한 파마산번에 스테이크 패티에 야채샐러드와 더블햄을 넣어 든든함을 더하고 크래프트 파마산가루를 토핑하여 맛의 풍미를 살린 한끼 대용 버거',3500,0,0,0),(13,'주)수능대박소고기영양','간편식사','주먹밥/김밥','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809802265110.png','맛과 건강을 가득담은 소고기표고 버섯 삼각\"',1300,1,0,0),(14,'주)벌교꼬막비빔삼각','간편식사','주먹밥/김밥','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025436.jpg','11월 제철 원료인 꼬막 ,벌교꼬막과 매콤한 비빔장 토핑을 가득넣은 삼각김밥(일부지역 미운영)',1300,1,0,0),(15,'주)스팸데리마요밥바','간편식사','주먹밥/김밥','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957237.jpg','담백한 김가루+꼬들단무지밥과 데리마요소스+통스팸을 함께 곁들여 먹는 밥바',1900,1,0,0),(16,'주)참치마요&소고기더블','간편식사','주먹밥/김밥','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809453266634.jpg','스테디셀러 삼각김밥 2재가 붙어 있는 가성비 갑! 더블삼각김밥',1900,0,0,0),(17,'김)야키토리묵닭대파유부','간편식사','주먹밥/김밥','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809802266285.jpg','야키토리묵 특제 미소마요소스와 대파닭구이가 올라간 유부초밥',4200,0,0,0),(18,'주)듀록바베큐삼각','간편식사','주먹밥/김밥','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025276.jpg','세게 3대 품종중 하나인 듀록흑돼지 오븐구이를 바비큐소스에 듬뿍 버무린 삼각김밥',1300,0,0,0),(19,'대산)단백질쿠키다크초코','과자류','스낵/비스켓','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809524430582.jpg','건강한 식습관을 위해 꾸준히 추천되는 식물성 단백질로 단백질 함량을 채운 제품',1200,1,0,0),(20,'연세)초코생크림빵','과자류','스낵/비스켓','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801753108775.jpg','CU 단독연세우유 콜라보 ① 연세우유 전용목장 우유로 만들어서 아이도 안심하고 먹을 수 있는 초코생크림 ② 시판 크림빵 대비 중량은 30% UP! ③ 연세우유의 고소한 초코우유크림이 아낌없이 가득 들어간 빵빵한 초코크림빵 ④ CU만의 레시피로 더욱 촉촉하고 부드러운 빵',2800,1,3.7,2),(21,'대산)쿠키런빅별딸기스낵','과자류','스낵/비스켓','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107031.jpg','CU 단독특별한 공법으로 과자 속까지 딸기원료가 침투하여 특별한 식감을 구현하는 제품',2000,1,2.9,2),(22,'대산)쿠키런빅별초코스낵','과자류','스낵/비스켓','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107024.jpg','CU 단독특별한 공법으로 과자 속까지 초콜릿 원료가 침투하여 특별한 식감을 구현하는 제품',2000,0,0,0),(23,'삼양)쌀별뽀빠이강정100g','과자류','스낵/비스켓','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801073312821.jpg','CU 단독별뽀빠이 브랜드 50주년을 기념한 새로운 형태와 식감의 고소담백 달달한 스낵',2000,0,3,1),(24,'해태)하프버터크림스틱','과자류','스낵/비스켓','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801019317064.jpg','CU 단독하프커피 시그니쳐 버터크림라떼 플레이버 출시',1700,0,0,0),(25,'참조은)기로로고구마호빵','과자류','빵/디저트','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809523623121.jpg','CU 단독-케로로 콜라보 뜨겁게 데우면 치즈가 사르르 녹아 한입 베어물면 고소한 치즈가 쭈욱 늘어나는 프리미엄 고구마 호빵. 케로로 스티커가 들어있어요!',2200,1,0,0),(26,'삼립)포켓몬딸기우유슈','과자류','빵/디저트','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068408164.jpg','동그랗고 부드러운 슈 안에 딸기우유 카스타드 크림가 함유되어 한입 베어 물면 입안 가득 달콤함을 느낄 수 있는 디저트입니다.',2000,1,0,0),(27,'삼립)포켓몬딸기바닐라컵','과자류','빵/디저트','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068408157.jpg','부드럽고 촉촉한 쉬폰 컵케익에 달콤한 바닐라빈크림과 딸기잼이 함유되어 달콤 상콤한 맛을 진하게 느낄 수 있습니다',3500,1,0,0),(28,'조이)하프버터크림쿠키슈','과자류','빵/디저트','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953685.jpg','★CU단독★ 인기 카페 하프커피의 버터크림라떼를 쿠키슈로 구현한 냉장 디저트',2600,0,0,0),(29,'조이)퐁당쇼콜라','과자류','빵/디저트','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953654.jpg','CU 단독 ① Made in France! 디저트의 나라 프랑스에서 직수입한 디저트 ② 진한 초콜릿을 느낄 수 있는 클래식한 초콜릿 디저트 퐁당쇼콜라 ③ 냉장 그대로 차가운 온도에서는 꾸덕한 식감의 브라우니처럼, 렌지업으로 따뜻하게 데우면 촉촉한 초콜릿이 흘러내리는 떠먹는 디저트로 변신',2600,0,0,0),(30,'돌)후룻컵플러스망고','과자류','빵/디저트','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809654956020.jpg','① 간편하고 건강하게 과일을 즐기고 싶은 소비자를 위한 냉장 과일디저트 ② 과일주스에 한 입 크기로 손질한 망고 구아바를 담은 상품 ③ 비타민C, 식이섬유를 포함해 더욱 상큼하게! 198g의 소용량으로 언제 어디서든 간편하게!',3200,0,0,0),(31,'SC)크레용신짱새콤츄잉','과자류','껌/초콜릿/캔디','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809469910330.jpg','CU 단독 딸기, 블루베리, 사과, 오렌지, 레몬 총 다섯가지 맛의 새콤한 츄잉캔디가 들어 있습니다. 귀여운 짱구캐릭터로 포장되어 아이들이 더욱 좋아하는 제품입니다. ',1000,1,0,0),(32,'코코)케로로키링캔디','과자류','껌/초콜릿/캔디','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/6910289450561.jpg','CU 단독 ①달콤한 젤리와 케로로 캐릭터 키링이 20가지 랜덤으로 들어있습니다. ②젤리의 달콤함과 다양한 모양의 케로로 캐릭터 키링을 수집 할 수 있는 재미를 느낄 수 있습니다.',2500,1,0,0),(33,'거림)엉덩이탐정오뚝캔디','과자류','껌/초콜릿/캔디','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809369150935.jpg','아동 서적 1위 베스트셀러 엉덩이 탐정을 귀엽고 이쁜 오뚝이로 만들었으며 말랑말랑한 귀여운 곰모양의 젤리가 들어 있는 제품입니다.',2500,1,0,0),(34,'HEYROO마늘맛콘스낵N','과자류','껌/초콜릿/캔디','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8803173130039.jpg','CU 단독 ① 옥수수를 튀겨 마늘과 설탕시럽을 코팅해 옥수수의 진한 향과 씹을수록 고소한 맛 살아나는 장수 인기 스낵 ② 넉넉한 중량으로 안주나 간식용으로 즐기기 좋은 HEYROO 대표 인기 스낵',1700,0,0,0),(35,'서주)톡꿀젤리허니레몬','과자류','껌/초콜릿/캔디','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801725001035.jpg','귀여운 몰드(곰돌이, 꿀단지)로 다양한 방법으로 먹을 수 있는 제품',3000,0,0,0),(36,'롯데)허쉬코코아리치커피','과자류','껌/초콜릿/캔디','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/6942836723811.jpg','리치커피와 조화를 이룬 크리미한 달콤함!',1800,0,0,0),(37,'라벨리)옥수수익어가는바','아이스크림','아이스크림','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8805584111416.jpg','실제 옥수수알갱이가 16.9%이상 함유된 제품으로 한입 베어물때마다 씹히는 식감을 처음부터 끝까지 즐길 수 있는 제품',1200,1,3.23,7),(38,'하겐)레드벨벳치즈미니컵','아이스크림','아이스크림','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/3415587394294.jpg','① 풍부한맛의 치즈가 농축되어 특유의 꾸덕함과 진한 풍미 ② 비트에서 추출한 강렬한 붉은 빛의 레드벨벳 미니컵',5900,1,3.73,3),(39,'하겐)레드벨벳치즈파인트','아이스크림','아이스크림','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/3415587194290.jpg','① 풍부한맛의 치즈가 농축되어 특유의 꾸덕함과 진한 풍미 ② 비트에서 추출한 강렬한 붉은 빛의 레드벨벳 아이스크림',15900,1,3.2,1),(40,'빙그레)호두붕어싸만코','아이스크림','아이스크림','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801104675444.jpg','호두과자 컨셉의 붕어싸만코',2000,0,3.5,2),(41,'나뚜루)녹차초코넛파인트','아이스크림','아이스크림','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801062865536.jpg','식물성 원료에서 오는 풍부한 맛과 풍성한 식감 녹차초코 아이스크림, 견과(캐슈넛,아몬드) 페이스트 베이스로 동물성유크림 대체, 초코퍼지와 구운 피스타치오 첨가로 다양한 식감 및 전체적인 맛 밸런스 UP, 식물성 빵, 크래커,씨리얼 등 무엇과 곁들여도 꿀조합',12900,0,3.8,1),(42,'유니)벤앤초코퍼지파인트','아이스크림','아이스크림','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/0076840100477.jpg','초콜릿 베이스에 브라우니가 듬뿍 들어 있는 시그니처 아이스크림',12900,0,1.8,1),(43,'우양)점보체다모짜핫도그','식품','가공식사','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8805489002642.jpg','점보 빅사이즈의 크리스피한 빵에 고소한 체다와 모짜렐라치즈가 함께 있어 고소한 풍미가 가득한 핫도그',2500,1,0,1),(44,'삼양)리얼쯔란치킨200g','식품','가공식사','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801073010208.jpg','맵+단+짠 쯔란시즈닝으로 새로운 치킨의 맛!',5900,1,0,0),(45,'삼립)하이면황태칼국수','식품','가공식사','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068407907.jpg','국내산 황태와 멸치 계란고명이 들어가 개운하면서도 깊고 진한 국물맛 - 강원도 인제 용대리 황태 덕장의 황태를 넣었습니다.',3800,1,3.1,2),(46,'삼립)하이면딱새우칼국수','식품','가공식사','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068407891.jpg','제주도에서 자란 영양담백 딱새우를 넣어 바다내음 물씬- 수심 120m 이하에서 사는 딱새우(가시발새우)를 넣었습니다.',3800,0,0,0),(47,'프레)해물짬뽕순두부','식품','가공식사','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809558846076.jpg','돈사골 육수를 넣은 짬뽕소스에 식감이 살아있는 새우와 오징어를 담은 부드러운 순두부 맛이 일품인 짬뽕순두부',11900,0,0,0),(48,'프레)장칼국수','식품','가공식사','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809558842276.jpg','시골 장터에서 맛보던 칼국수 맛 그대로 재현해 넉넉한 양과 짙은 국물맛을 자랑하는 상품',9900,0,0,0),(49,'동원)그릴크림폴페타80g','식품','안주류','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801047574705.jpg','이탈리아 정통 가정식 폴페타(돼지고기와 구운 양파와 마늘) 속에 크림소스.',3500,1,3.6,1),(50,'CJ)맛군밤60g','식품','안주류','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801007427386.jpg','직화 불에 직접 구운 고소한 군밤',3500,1,3,1),(51,'바프)와사비맛땅콩120g','식품','안주류','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809617944842.jpg','달달하고 알싸한 와사비맛 시즈닝의 고소한 시즈닝 땅콩',3900,1,4.4,1),(52,'CJ)닭가슴살비엔나120g','식품','안주류','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801392001710.jpg','나트륨 25% down으로 짜지 않고 담백하면서 고단백 단백질 풍부한 안심반찬',3900,0,0,0),(53,'머거본)볶음땅콩100g','식품','안주류','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801133009364.jpg','고소하고 녹진한 맛과 부드러운 식감의 미국산 볶음 땅콩',3000,0,0,0),(54,'탑티어)불고기맛핫바90g','식품','안주류','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8802266500322.jpg','CU 단독T1 제휴 상품으로 한국의 전통 메뉴인 불고기맛을 입힌 핫바 상품',2300,0,0,0),(55,'팜스C)밀감400g(팩)','식품','식재료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809917000002.jpg','높은 당도를 유지하며 합리적인 가격의 상품',2700,1,0,0),(56,'해성)달콤한대봉4입(팩)','식품','식재료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809826440432.jpg','달달하여 부드러운 식감',4900,1,0,0),(57,'해성)달콤한대봉2입(팩)','식품','식재료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809826440425.jpg','달달하여 부드러운 식감',2900,1,3.6,1),(58,'H&B)엔비사과6입봉','식품','식재료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809529022270.jpg','아삭한 식감 / 높은 당도 / 풍부한 향미 / 노랜 바탕의 붉은 색택 / 갈변이 느리게 진행 / 높은 풍산성 엔비사과는 냉장보관시 저장기간이 오래갑니다. 아삭하고 엔비사과만의 특유한 향이 있어서 사과를 더욱 맛있게 합니다.',13500,0,0,0),(59,'H&B)엔비사과2입팩','식품','식재료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809226300237.jpg','아삭한식감 / 풍부한향미 / 노란색에 붉은 색택 / 갈변이 천천히 이루어짐',6000,0,0,0),(60,'H&B)엔비세척사과1입','식품','식재료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809226252116.jpg','아삭한식감 / 높은 당도 / 풍부한향미 / 노란 바탕의 붉은 색택 / 갈변이 느리게 진행됨',3300,0,0,0),(61,'하프)말차크림라떼250ml','음료','음료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809350889035.jpg','CU 단독 국내산 1급A 원유 사용(45%)한 달콤쌉싸름한 가을과 어울리는 말차크림라떼',2500,1,2.2,1),(62,'하프)버터크림라떼250ml','음료','음료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809350889028.jpg','CU 단독 ① 국내산 1급A원유 사용(원유함량 50%)한 스카치캔디맛의 버터맛 커피 ② 스카치 캔디맛의 버터 풍미를 느낄 수 있는 상품',2500,1,3,2),(63,'하프)바나나크림라떼250ml','음료','음료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801104940191.jpg','CU 단독버터크림라떼 원조의 스페셜티 커피전문점 하프커피 콜라보 커피',2700,1,0,0),(64,'하프)아메리카노P410','음료','음료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801104940177.jpg','CU 단독버터크림라떼 원조의 스페셜티 커피전문점 하프커피 콜라보 커피',2700,0,3.6,1),(65,'칸타타)콜드브루캔275ml','음료','음료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801056032159.jpg','① 언제 어디서나 간편하게 즐기는 프리미엄 원두커피 ② 찬물로 추출하여 커피 맛과 향이 신선하고 부드러운 블랙커피',2200,0,3,1),(66,'랩노쉬)프로틴바나나P350','음료','음료','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809495075560.jpg','① 바나나의 달콤한 맛이 느껴지는 프로틴 드링크 ② 저당/저지방 (Low SUGAR Low FAT) 설계로 건강하게 단백질 섭취 ③ 칼슘식이섬유 그리고 BCAA까지 포함된 균형잡힌 프로틴드링크!',3200,0,2.8,1),(67,'롯데)스크류바에이드230ml','음료','아이스드링크','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801062874941.jpg','CU 단독빙과 메가 브랜드 스크류바를 활용한 파우치 음료,빙과류 이미지 활용 제품',1200,1,2.4,2),(68,'롯데)수박바에이드230ml','음료','아이스드링크','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801062874934.jpg','CU 단독 빙과류 메가브랜드 수박바를 활용한 파우치 음료, 여름에 시원한 수박바 이미지 제품.',1200,1,0,0),(69,'광동)비타500에이드230ml','음료','아이스드링크','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8806002013398.jpg','CU 단독건강음료 1위 비타500의 아이스드링크 상품. 파우치(1800원)',1200,1,3.1,2),(70,'남양)초코에몽에이드230ml','음료','아이스드링크','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801069408989.jpg','얼음과 함께 시원하게 마시는 초코에몽 드링크',1200,0,4.6,1),(71,'코카)조지아스윗아메230ml','음료','아이스드링크','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801094546403.jpg','① 세계 1위 RTD 커피 브랜드 조지아의 아이스 아메리카노 ② 파우치(1800원)',1200,0,5,1),(72,'롯데)칸타타바닐라아메230','음료','아이스드링크','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801056228149.jpg','① 롯데칠성 칸타타 브랜드의 바닐라향 아메리카노 커피 ② 브라질산 원두 농충액 사용 ③ 바닐라향 첨가된 신제품',1200,0,2.6,1),(73,'빙그레)요플레토핑쿠키','음료','유제품','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801104308267.jpg','① 요플레의 요거트와 대중성을 높인 쿠키앤크림 토핑으로 담은 상품 ② 바삭바삭한 토핑으로 식감을 즐기며 즐길 수 있는 간편 대용식',2000,1,0,0),(74,'롯데)편한하루캐모마일4입','음료','유제품','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801207159322.jpg','특허받은 유당분해 공법으로 유당이 없으며 더욱 속을 편안하게 하는 건강 발효유 (4입)',6800,1,0,0),(75,'롯데)편한하루캐모마일','음료','유제품','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801207159315.jpg','① 특허받은 유당분해 공법으로 유당이 없으며더욱 속을 편안하게 하는 건강 발효유',1700,1,0,0),(76,'서울FB)딩대우유커피250ml','음료','유제품','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809350889011.jpg','CU 단독 EBS 캐릭터 딩대의 붱철조교 패키지를 활용한 국내산 1A원유 40% 함유 고카페인 커피. HACCP 인증을 받은 제조시설에서 Acepitics(무균)공정으로 안전하게 제조.',2200,0,0,0),(77,'서울FB)딩대우유초코250ml음료','유제품','유제품','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809350881466.jpg','CU 단독 EBS 캐릭터 딩대의 낄희교수 활용한 단백질 10g 함유한 저지방 너티초코맛 우유. HACCP인증을 받은 제조시설에서 Aceptics(무균)공정으로 안전하게 제조.',2200,0,0,0),(78,'올가)올라프로틴코코아','음료','유제품','https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809490591706.jpg','① 비건인증 식물성 프로틴음료 ② 식물성프로틴 12g트랜스지방 포화지방 0% 식이섬유 10g이 들어간 상품',2200,0,0,0);
/*!40000 ALTER TABLE `product_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_product_tags`
--

DROP TABLE IF EXISTS `product_product_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_product_tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_product_tags_product_id_tag_id_f9d19e54_uniq` (`product_id`,`tag_id`),
  KEY `product_product_tags_tag_id_2e44bb40_fk_product_tag_id` (`tag_id`),
  CONSTRAINT `product_product_tags_product_id_a72c644e_fk_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product_product` (`id`),
  CONSTRAINT `product_product_tags_tag_id_2e44bb40_fk_product_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `product_tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_product_tags`
--

LOCK TABLES `product_product_tags` WRITE;
/*!40000 ALTER TABLE `product_product_tags` DISABLE KEYS */;
INSERT INTO `product_product_tags` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,3,1),(6,3,2),(7,4,1),(8,4,2),(9,5,1),(10,5,2),(11,6,1),(12,6,2),(14,7,2),(13,7,3),(16,8,2),(15,8,4),(18,9,2),(17,9,4),(20,10,2),(19,10,3),(22,11,2),(21,11,3),(24,12,2),(23,12,3),(27,13,2),(25,13,5),(26,13,6),(30,14,2),(28,14,5),(29,14,6),(32,15,2),(31,15,6),(34,16,2),(33,16,5),(36,17,2),(35,17,7),(39,18,2),(37,18,5),(38,18,6),(40,19,8),(41,19,9),(42,20,10),(43,20,11),(44,21,12),(45,21,13),(46,22,12),(47,22,13),(48,23,12),(49,23,13),(50,24,8),(51,24,13),(52,25,14),(53,25,15),(54,26,10),(55,26,11),(56,27,10),(57,27,11),(58,28,10),(59,28,11),(60,29,10),(61,29,11),(64,30,11),(62,30,16),(63,30,17),(65,31,18),(66,31,19),(67,32,20),(68,33,20),(69,33,21),(70,34,12),(71,34,13),(72,34,22),(73,35,23),(74,36,24),(75,37,25),(76,38,25),(77,39,25),(78,40,25),(79,41,25),(80,42,25),(81,43,26),(82,43,27),(83,43,28),(84,44,26),(85,44,27),(86,44,28),(88,45,27),(87,45,29),(90,46,27),(89,46,29),(91,47,30),(93,48,28),(92,48,30),(94,49,31),(95,49,32),(96,49,33),(97,50,34),(98,50,35),(99,51,34),(100,51,35),(101,52,31),(102,52,32),(103,52,35),(104,53,34),(105,53,35),(107,54,35),(106,54,36),(108,55,37),(109,55,38),(110,56,37),(111,56,38),(112,57,37),(113,57,38),(114,58,37),(115,58,38),(116,59,37),(117,59,38),(118,60,37),(119,60,38),(120,61,39),(121,62,39),(122,62,40),(124,63,40),(123,63,41),(126,64,40),(125,64,41),(128,65,40),(127,65,41),(129,66,42),(130,66,43),(132,67,43),(131,67,44),(134,68,43),(133,68,44),(136,69,43),(135,69,44),(138,70,43),(137,70,44),(140,71,43),(139,71,44),(141,72,44),(142,73,45),(143,73,46),(145,74,45),(144,74,47),(147,75,45),(146,75,47),(148,76,48),(149,77,48),(150,77,49),(152,78,43),(151,78,48);
/*!40000 ALTER TABLE `product_product_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_rate`
--

DROP TABLE IF EXISTS `product_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_rate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `scores` varchar(100) NOT NULL,
  `averageScore` double NOT NULL,
  `comment` longtext NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `likedCount` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_rate_product_id_42b3b13a_fk_product_product_id` (`product_id`),
  KEY `product_rate_user_id_1b6c5486_fk_user_user_id` (`user_id`),
  CONSTRAINT `product_rate_product_id_42b3b13a_fk_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product_product` (`id`),
  CONSTRAINT `product_rate_user_id_1b6c5486_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_rate`
--

LOCK TABLES `product_rate` WRITE;
/*!40000 ALTER TABLE `product_rate` DISABLE KEYS */;
INSERT INTO `product_rate` VALUES (15,'55555',5,'이거에요','2022/12/07/KakaoTalk_20210822_110313494.jpg',4,'2022-12-07 13:35:37.078000',1,2),(16,'53444',4,'닭강정은 맛없을 수가..','',1,'2022-12-05 19:04:30.136000',2,2),(17,'34532',3.4,'옥수수 최고오','',3,'2022-11-29 19:04:43.000000',37,2),(18,'45343',3.8,'맨날 점심으로 먹어요 가성비 갑','2022/12/05/KakaoTalk_20210920_180107311.jpg',2,'2022-12-05 19:05:21.642000',4,2),(19,'44445',4.2,'편의점에서 꼬막이라뇨! 너무 좋습니다.','',1,'2022-11-05 19:05:59.000000',1,3),(20,'43454',4,'조금 텁텁해요ㅜㅜ 콜라 필수 입니다. ','',1,'2022-12-05 19:06:25.716000',4,3),(21,'34332',3,'맛있지만 좀 비싼 것 같기도 해요ㅜㅜ','2022/12/05/KakaoTalk_20210908_163241979_01.jpg',0,'2022-12-05 19:06:48.432000',2,3),(22,'33312',2.4,'너무 달아여','',0,'2022-12-05 19:07:08.739000',37,3),(23,'43242',3,'냠냠냠 약간 물립니다.','',3,'2022-07-05 19:07:32.000000',1,6),(24,'55555',5,'양념 대박이에요~~~','',2,'2022-12-03 19:07:46.000000',2,6),(25,'44445',4.2,'짜자장','',0,'2022-12-05 19:07:57.842000',4,6),(26,'52444',3.8,'자꾸 손이 가는데!','2022/12/05/KakaoTalk_20210925_220830314_01.jpg',1,'2022-12-04 19:08:28.000000',37,6),(27,'55555',5,'마치 강릉 엄지네 꼬막집 같은 느낌','',1,'2022-12-01 19:09:31.000000',1,5),(28,'53434',3.8,'닭강정 standard 그 맛','',4,'2022-12-05 19:09:46.486000',2,5),(29,'33433',3.2,'장자짜','',0,'2022-12-05 19:09:58.304000',4,5),(30,'33334',3.2,'약간 물컹한데여','2022/12/05/KakaoTalk_20210915_192801028_05.jpg',0,'2022-12-01 19:10:16.000000',37,5),(31,'43552',3.8,'생각보다 더 괜찮았어요 재구매의사 완전 있습니다','',0,'2022-12-04 19:11:40.000000',4,1),(40,'54423',3.6,'ㅍㅍ','',1,'2022-12-06 17:44:07.271000',21,1),(41,'41344',3.2,'비싸다','',1,'2022-12-07 19:40:07.117000',38,10),(42,'02432',2.2,'냠냠굿','',0,'2022-12-07 19:48:13.964000',21,11),(43,'25243',3.2,'괜찮아요~','',1,'2022-12-07 19:49:23.269000',20,11),(44,'23124',2.4,'리뷰','',0,'2022-12-07 19:49:38.100000',62,11),(45,'34332',3,'붕어빵!','',0,'2022-12-07 19:49:49.486000',40,11),(46,'33425',3.4,'레드벨벳','',1,'2022-12-07 19:50:01.352000',38,11),(47,'34433',3.4,'비타 오백','',0,'2022-12-07 19:50:11.429000',69,11),(48,'34243',3.2,'냠냠','',0,'2022-12-07 19:50:20.928000',39,11),(49,'34323',3,'비싸더라요','',0,'2022-12-07 19:50:34.367000',45,11),(50,'53433',3.6,'아메리카노!','',0,'2022-12-07 19:50:43.348000',64,11),(51,'54433',3.8,'역시 나뚜루','',0,'2022-12-07 19:50:52.395000',41,11),(52,'33332',2.8,'으악','2022/12/07/download.gif',0,'2022-12-07 19:51:06.336000',66,11),(53,'42334',3.2,'심슨도 울고간 맛','2022/12/07/download_io89L3q.gif',0,'2022-12-07 19:51:26.514000',1,11),(54,'33333',3,'냠','2022/12/07/KakaoTalk_20210821_000120933.jpg',0,'2022-12-07 19:51:38.853000',23,11),(56,'11223',1.8,'','',0,'2022-12-07 20:11:38.576000',42,12),(57,'55555',5,'굳','',0,'2022-12-07 20:12:54.469000',71,12),(58,'43332',3,'나는  지금 논실! 여긴 춥고 콜드브루하다','',0,'2022-12-07 20:18:53.621000',65,2),(59,'11111',1,'우엑','',1,'2022-12-07 20:19:08.528000',67,2),(60,'34322',2.8,'병 비타 오백이 최고지','',0,'2022-12-07 20:19:24.963000',69,2),(61,'55553',4.6,'넘 맛있오','',0,'2022-12-07 20:19:34.414000',70,2),(62,'13243',2.6,'커피 그만','',0,'2022-12-07 20:19:43.336000',72,2),(63,'54353',4,'겨울에 먹는 아이스크림','',0,'2022-12-07 20:19:55.982000',40,2),(64,'45355',4.4,'내 최애','2022/12/07/KakaoTalk_20211009_111307914_04.jpg',0,'2022-12-07 20:20:16.476000',51,2),(65,'34443',3.6,'냠','',0,'2022-12-07 20:20:29.942000',49,2),(66,'44343',3.6,'감 너무 좋아','',0,'2022-12-07 20:20:41.720000',57,2),(67,'33523',3.2,'특이점','',0,'2022-12-07 20:20:57.031000',45,2),(68,'53444',4,'너무 비싸다..','',0,'2022-12-07 20:21:17.750000',3,2),(69,'42543',3.6,'테스팅','',0,'2022-12-07 20:23:02.233000',62,13),(70,'42230',2.2,'Dhdhdd','',0,'2022-12-08 01:32:52.935000',61,1),(71,'35553',4.2,'고대만세','',1,'2022-12-08 01:33:17.299000',20,14),(72,'00000',0,'앗','',0,'2022-12-08 01:33:35.157000',43,1),(73,'33333',3,'굿!!! ','',0,'2022-12-08 01:34:44.668000',50,1),(74,'45554',4.6,'','',1,'2022-12-08 01:35:42.377000',38,14),(75,'55555',5,'','',1,'2022-12-08 01:45:46.043000',1,1),(76,'43354',3.8,'','',-1,'2022-12-08 01:48:04.911000',67,14);
/*!40000 ALTER TABLE `product_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tag`
--

DROP TABLE IF EXISTS `product_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tag`
--

LOCK TABLES `product_tag` WRITE;
/*!40000 ALTER TABLE `product_tag` DISABLE KEYS */;
INSERT INTO `product_tag` VALUES (1,'도시락'),(2,'간편식사'),(3,'햄버거'),(4,'핫도그'),(5,'삼각김밥'),(6,'주먹밥'),(7,'김밥'),(8,'비스켓'),(9,'쿠키'),(10,'냉장디저트'),(11,'디저트'),(12,'스낵'),(13,'과자류'),(14,'조리빵'),(15,'찐빵류'),(16,'냉장젤리'),(17,'푸딩'),(18,'소프트캔디'),(19,'젤리류'),(20,'토이캔디'),(21,'캔디류'),(22,'HEYROO'),(23,'젤리'),(24,'초콜릿'),(25,'아이스크림'),(26,'간편식'),(27,'즉석식'),(28,'가공식사'),(29,'냉장면'),(30,'냉장밀키트'),(31,'햄'),(32,'소시지'),(33,'육가공류'),(34,'마른안주류'),(35,'안주류'),(36,'핫바'),(37,'과일'),(38,'식재료'),(39,'냉장커피'),(40,'커피음료'),(41,'캔/병커피'),(42,'건강음료'),(43,'음료'),(44,'아이스드링크'),(45,'요구르트'),(46,'효상요구르트'),(47,'발효유'),(48,'가공유'),(49,'우유');
/*!40000 ALTER TABLE `product_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `age` int NOT NULL,
  `gender` int NOT NULL,
  `taste` varchar(10) NOT NULL,
  `question` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
INSERT INTO `user_user` VALUES (1,'pbkdf2_sha256$390000$TyJ50PqFwZmj8bYIMxdnMF$KztCmXIzmZ+ZQeMhC0IpfoyyReuNPSzLnpZMrX+cKhQ=','2022-12-10 08:02:46.835511',1,'super','','','super@gmail.com',1,1,'2022-12-05 08:55:52.197000',0,2,'',0),(2,'pbkdf2_sha256$390000$rXSq4ym3h1TIITvbSLMsd8$FYomTJfQQvIPgiLI13jDTNNkmbOXIizkvOjJ5Mw6gyI=','2022-12-07 20:16:20.731000',0,'letmecu','','','',0,1,'2022-12-05 08:58:40.755000',2,1,'AC',2),(3,'pbkdf2_sha256$390000$rbKUCWq55jBwS4jJlGyL4R$nBjrkgKviff/kGbJrahvX7Yu1GYECcQe9ck7x4R2nD0=','2022-12-05 20:52:38.880000',0,'worm','','','',0,1,'2022-12-05 08:59:31.034000',1,2,'BCE',1),(4,'pbkdf2_sha256$390000$qXfCCCvowr6cxBHfeDtR41$b/9fSWlURc+KtUuRjg4D3J4axFPcQCpAgEksNVwA6gc=','2022-12-05 16:50:11.970000',0,'happee','','','',0,1,'2022-12-05 08:59:51.569000',2,1,'AD',2),(5,'pbkdf2_sha256$390000$Qypk79NPRJIfWGefDxSURV$o6oaUGo8wdV+3y1GN5/PWfyNjBnmJ9ihQnGE8LOfG3c=','2022-12-05 19:09:07.507000',0,'imauser','','','',0,1,'2022-12-05 09:00:25.806000',5,2,'ACD',3),(6,'pbkdf2_sha256$390000$DWVLoX2qjgorah95AOHYjN$Mbr/FmeX7AjNXlApnUeyRbfM8q7nML1dkCRKjSmgNBk=','2022-12-07 20:26:44.797000',0,'sun','','','',0,1,'2022-12-05 09:00:52.935000',5,1,'AE',3),(7,'pbkdf2_sha256$390000$EvJQwXlX5QhWWqqSvAMv6c$HZqO6/4MZ7fkM3/TukOqSLIYriHJGBTS9s8K6Gd6OuA=',NULL,0,'민나','','','',0,1,'2022-12-07 19:29:47.805000',2,2,'AD',0),(8,'pbkdf2_sha256$390000$Bsj2p3ToZUF8phuQ7mYM4f$yCgi0BOCuHan4eQohH1OzNOrLQAB6AeRE/1uZzNVZ6I=','2022-12-07 19:30:18.659000',0,'lee','','','',0,1,'2022-12-07 19:30:13.403000',3,2,'AE',3),(9,'pbkdf2_sha256$390000$wQyE1NRdHDBCwmTNmRxlrB$QcusCoyApD25zFWq9/dFcyhnqt10InXxk06X57nS4vY=',NULL,0,'안녕','','','',0,1,'2022-12-07 19:30:39.043000',4,2,'AD',2),(10,'pbkdf2_sha256$390000$c5FIODZ6FTC1E3cNCNPUsM$KqynZhV0eiiu2imzNrCSW/BLc0SMkp2gTU95CiYQuaM=','2022-12-07 19:38:13.030000',0,'askrid','','','',0,1,'2022-12-07 19:38:01.492000',2,1,'AC',1),(11,'pbkdf2_sha256$390000$fE8u4mCgdlhfsWBpmdcGyc$3nrMi9k6A5tFdSzI9G1vb2n32zbKux6TpBMFnJs+yss=','2022-12-07 19:47:27.637000',0,'asdf','','','',0,1,'2022-12-07 19:47:17.461000',2,1,'',2),(12,'pbkdf2_sha256$390000$JIDMojeB1kapxV4ibx8L9B$+7adpp3dtNsMimszCOFS16rZO8skI9YBD5tWtLlptNE=','2022-12-07 20:10:31.298000',0,'test','','','',0,1,'2022-12-07 20:09:15.710000',2,1,'AD',2),(13,'pbkdf2_sha256$390000$rbWwpDMupLgmNmYy08KGZd$eBPuHuvyxB9tc/Kbicdampl9zW1c80osXDmToV17wKQ=','2022-12-07 20:21:53.689000',0,'zxc','','','',0,1,'2022-12-07 20:21:46.384000',2,1,'',2),(14,'pbkdf2_sha256$390000$5nEHbP2kpTKGYrfZWoFDF5$dLHhuPu5q9kyOZOvMT/aZvQ/HUaKpr+340+eHoMObhA=','2022-12-08 01:46:24.349000',0,'yunwkgus','','','',0,1,'2022-12-08 01:32:38.358000',2,1,'C',1),(15,'pbkdf2_sha256$390000$xZE3qe3WBWxnhvI49j3Cf6$auu89Ewx33cMAoFlVHMJccoQhNNU49jBXKDYcEC48wQ=',NULL,0,'safari','','','',0,1,'2022-12-08 01:39:24.648000',3,2,'AC',3);
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_groups`
--

DROP TABLE IF EXISTS `user_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_groups_user_id_group_id_bb60391f_uniq` (`user_id`,`group_id`),
  KEY `user_user_groups_group_id_c57f13c0_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_user_groups_group_id_c57f13c0_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_user_groups_user_id_13f9a20d_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_groups`
--

LOCK TABLES `user_user_groups` WRITE;
/*!40000 ALTER TABLE `user_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_user_permissions`
--

DROP TABLE IF EXISTS `user_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_user_permissions_user_id_permission_id_64f4d5b8_uniq` (`user_id`,`permission_id`),
  KEY `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_user_user_permissions_user_id_31782f58_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_user_permissions`
--

LOCK TABLES `user_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-10 12:30:19
