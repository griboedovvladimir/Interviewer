-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 04, 2018 at 06:37 PM
-- Server version: 5.7.23-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interviewer`
--

-- --------------------------------------------------------

--
-- Table structure for table `interview`
--

CREATE TABLE `interview` (
  `interview_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `level` varchar(3) NOT NULL,
  `specialization` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interview`
--

INSERT INTO `interview` (`interview_id`, `name`, `level`, `specialization`, `date`, `status`) VALUES
(2, 'Don Aubrey', '1', 'Frontend developer', '06.09.2018', 'ok'),
(3, 'Sophia Carson', '2', 'Frontend developer', '11.09.2018', 'ok'),
(45, 'asdas', '2', 'Frontend developer', '01.10.2018', 'ok'),
(48, 'dssdfsdf', '2', 'Frontend developer', '02.10.2018', 'ok');

-- --------------------------------------------------------

--
-- Table structure for table `interviewee`
--

CREATE TABLE `interviewee` (
  `interviewee_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `qualification` varchar(80) NOT NULL,
  `specialization` varchar(80) NOT NULL,
  `skills` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `subtopic_id` int(11) NOT NULL,
  `raiting` varchar(80) NOT NULL,
  `text` text NOT NULL,
  `source` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `subtopic_id`, `raiting`, `text`, `source`) VALUES
(1, 5, '5', 'Which HTML tag is used to display the data in the tabular form?', 'Read more books'),
(2, 4, '6', 'How many types of heading does an HTML contain?', 'Read more books'),
(5, 4, '7', 'What is the use of details and summary tag?', 'Read more books'),
(6, 4, '4', 'What is semantic HTML?', 'Read more books'),
(8, 2, '8', 'What are the benefits of CSS sprites?', 'Read more books'),
(9, 3, '6', 'What are the CSS frameworks?', 'Read more books'),
(10, 1, '4', 'What is the difference between class selectors and id selectors?', 'Read more books'),
(11, 1, '9', 'Are you familiar with styling SVG?', 'Read more books'),
(12, 1, '6', 'What does * { box-sizing: border-box; } do? What are its advantages?', 'Read more books'),
(13, 7, '4', 'What is NaN? What is its type? How can you reliably test if a value is equal to NaN?', 'Read more books'),
(14, 7, '4', 'How objects can be created?', 'Read more books'),
(15, 6, '6', 'How do you add an element at the begining of an array? How do you add one at the end?', 'Read more books'),
(16, 8, '7', 'What is the Strict mode in JavaScript and how can it be enabled?', 'Read more books'),
(17, 8, '7', 'What is the difference between .call() and .apply()?', 'Read more books');

-- --------------------------------------------------------

--
-- Table structure for table `question_card`
--

CREATE TABLE `question_card` (
  `question_card_id` int(11) NOT NULL,
  `interview_id` int(11) NOT NULL,
  `mark` varchar(40) NOT NULL,
  `comment` text NOT NULL,
  `question_id` int(11) NOT NULL,
  `topic_name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_card`
--

INSERT INTO `question_card` (`question_card_id`, `interview_id`, `mark`, `comment`, `question_id`, `topic_name`) VALUES
(1, 3, '', '', 1, 'html'),
(2, 3, '', '', 2, 'html'),
(3, 3, '', '', 5, 'html'),
(4, 3, '', '', 6, 'html'),
(5, 3, '', '', 8, 'css'),
(6, 3, '', '', 9, 'css'),
(7, 3, '', '', 10, 'css'),
(8, 3, '', '', 11, 'css'),
(9, 3, '', '', 12, 'css'),
(10, 3, '', '', 13, 'js'),
(11, 3, '', '', 14, 'js'),
(12, 3, '', '', 15, 'js'),
(13, 3, '', '', 16, 'js'),
(14, 3, '', '', 17, 'js');

-- --------------------------------------------------------

--
-- Table structure for table `subtopic`
--

CREATE TABLE `subtopic` (
  `subtopic_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `weight` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subtopic`
--

INSERT INTO `subtopic` (`subtopic_id`, `topic_id`, `name`, `weight`) VALUES
(1, 1, 'selectors', '5'),
(2, 1, 'sprites', '9'),
(3, 1, 'frameworks', '8'),
(4, 2, 'tags', '4'),
(5, 2, 'forms', '8'),
(6, 3, 'arrays', '6'),
(7, 3, 'objects', '8'),
(8, 3, 'function', '7');

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `topic_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`topic_id`, `name`) VALUES
(1, 'css'),
(2, 'html'),
(3, 'js');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `rights` varchar(10) NOT NULL,
  `token` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `password`, `rights`, `token`) VALUES
(1, 'j.doe', '123456789', 'user', '123456789'),
(2, 'm.smith', '123456789', 'admin', '123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `interview`
--
ALTER TABLE `interview`
  ADD PRIMARY KEY (`interview_id`);

--
-- Indexes for table `interviewee`
--
ALTER TABLE `interviewee`
  ADD PRIMARY KEY (`interviewee_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `subtopic_id` (`subtopic_id`);

--
-- Indexes for table `question_card`
--
ALTER TABLE `question_card`
  ADD PRIMARY KEY (`question_card_id`),
  ADD KEY `interview_id` (`interview_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `topic_name` (`topic_name`);

--
-- Indexes for table `subtopic`
--
ALTER TABLE `subtopic`
  ADD PRIMARY KEY (`subtopic_id`),
  ADD KEY `subtopic_id` (`subtopic_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topic_id`),
  ADD UNIQUE KEY `topic_id` (`topic_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `topic_id_2` (`topic_id`),
  ADD KEY `topic_id_3` (`topic_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `interview`
--
ALTER TABLE `interview`
  MODIFY `interview_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `interviewee`
--
ALTER TABLE `interviewee`
  MODIFY `interviewee_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `question_card`
--
ALTER TABLE `question_card`
  MODIFY `question_card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `subtopic`
--
ALTER TABLE `subtopic`
  MODIFY `subtopic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`subtopic_id`) REFERENCES `subtopic` (`subtopic_id`);

--
-- Constraints for table `question_card`
--
ALTER TABLE `question_card`
  ADD CONSTRAINT `question_card_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`),
  ADD CONSTRAINT `question_card_ibfk_2` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`interview_id`),
  ADD CONSTRAINT `question_card_ibfk_3` FOREIGN KEY (`topic_name`) REFERENCES `topic` (`name`);

--
-- Constraints for table `subtopic`
--
ALTER TABLE `subtopic`
  ADD CONSTRAINT `subtopic_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
