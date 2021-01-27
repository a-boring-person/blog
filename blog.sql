/*
Navicat MySQL Data Transfer

Source Server         : aaa
Source Server Version : 80022
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 80022
File Encoding         : 65001

Date: 2021-01-27 19:40:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `articleID` int NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `articleTitle` varchar(255) COLLATE utf8_bin NOT NULL,
  `author` varchar(255) COLLATE utf8_bin NOT NULL,
  `content` longtext COLLATE utf8_bin NOT NULL,
  `time` date NOT NULL,
  `click` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`articleID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'node.js开发实战', '杨凯', 0x6E6F64652E6A73E5BC80E58F91E5AE9EE68898, '2021-01-05', '5');
INSERT INTO `article` VALUES ('2', 'JavaScript高级程序设计', '杨凯', 0x4A617661536372697074E9AB98E7BAA7E7A88BE5BA8FE8AEBEE8AEA1, '2021-01-14', '5');
INSERT INTO `article` VALUES ('3', 'vuex的基本应用', '杨凯', 0x76756578E5BE88E5A5BD, '2021-01-27', '0');
INSERT INTO `article` VALUES ('4', 'vuerouter的基本应用', '杨凯', 0x767565726F75746572E5BE88E5A5BD, '2021-01-27', '0');
INSERT INTO `article` VALUES ('5', 'JavaScript常用数组方法 ', '杨凯', 0xE5B8B8E794A8E79A84E695B0E7BB84E696B9E6B395E5A682E4B88B, '2021-01-27', '1');
INSERT INTO `article` VALUES ('6', 'ES6基础入门', '杨凯', 0xE59FBAE7A180E585A5E997A8, '2021-01-27', '2');
INSERT INTO `article` VALUES ('7', '无聊人的博客', '杨凯', 0xE5BE88E5A5BDEFBC8CE58AA0E6B2B9E58AAAE58A9B, '2021-01-27', '0');
INSERT INTO `article` VALUES ('8', '你想要做什么', '杨凯', 0xE68891E4BC9AE980BCE887AAE5B7B1E8AFB4E588B0E5819AE588B0, '2021-01-05', '0');
INSERT INTO `article` VALUES ('9', '我坚信一切皆有可能', '杨凯', 0xE68891E8A681E68890E4B8BAE6B0B8E8BF9CE79280E792A8E79A84E68192E6989F, '2021-01-03', '1');
INSERT INTO `article` VALUES ('10', '放下一切停观晚霞', '杨凯', 0xE69DA5E887AAE4B896E7958CE79A84E681B6E6848F, '2021-01-27', '0');
INSERT INTO `article` VALUES ('11', '我终于完成了', '杨凯', 0xE8B094E8B094E8B094E8B094E696B9E6B395E698AFE59880E59295E59880E59295, '2021-01-27', '1');
INSERT INTO `article` VALUES ('14', '完工了', '小王', 0xE5BDBBE5BA95E4B8B8E7BAA2E4BA86, '2021-01-27', '2');

-- ----------------------------
-- Table structure for author
-- ----------------------------
DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `authorID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of author
-- ----------------------------
INSERT INTO `author` VALUES ('1', 'admin', 'yangkai', '杨凯');
INSERT INTO `author` VALUES ('2', 'root', 'xiaowang', '小王');
