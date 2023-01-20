CREATE DATABASE NextjsGym

USE NextjsGym
CREATE TABLE Users
(
  UserId VARCHAR(21) NOT NULL,
  FirstName VARCHAR(21) NOT NULL,
  LastName VARCHAR(21) NOT NULL,
  PRIMARY KEY (UserId)
);

USE NextjsGym
CREATE TABLE Exercise
(
  ExerciseName VARCHAR(21) NOT NULL,
  MusclesUsed VARCHAR(21) NOT NULL,
  Description VARCHAR(299) NOT NULL,
  PRIMARY KEY (ExerciseName)
);

USE NextjsGym
CREATE TABLE UserExercises
(
  Sets CHAR(2),
  Reps CHAR(2),
  WeekdaysOfExercise VARCHAR(7),
  UserId VARCHAR(21) NOT NULL,
  ExerciseName VARCHAR(21) NOT NULL,
  PRIMARY KEY (UserId, ExerciseName),
  FOREIGN KEY (UserId) REFERENCES Users(UserId)ON DELETE CASCADE,
  FOREIGN KEY (ExerciseName) REFERENCES Exercise(ExerciseName) ON DELETE CASCADE
);

USE NextjsGym
INSERT INTO Users
VALUES(324324, 'Horacio', 'Casimiro');

USE NextjsGym
INSERT INTO Exercise
VALUES('Push-ups', 'Chest', 'A push-up (sometimes called a press-up in British English) is a common calisthenics exercise beginning from the prone position.');

USE NextjsGym
INSERT INTO Exercise
VALUES('Curl-ups', 'Rectus abdominis', 'An abdominal endurance training exercise to strengthen, tighten and tone the abdominal muscles');
