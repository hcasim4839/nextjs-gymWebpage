CREATE DATABASE NextjsGym

USE NextjsGym
CREATE TABLE Users
(
  UserName VARCHAR(21) NOT NULL,
  User_ID VARCHAR(21) NOT NULL,
  PRIMARY KEY (UserName, User_ID)
);

USE NextjsGym
CREATE TABLE Exercises
(
  ExerciseName VARCHAR(21) NOT NULL,
  Description VARCHAR(299) NOT NULL,
  Muscles_Used VARCHAR(21) NOT NULL,
  PRIMARY KEY (ExerciseName)
);

USE NextjsGym
CREATE TABLE Accounts
(
  Account_Name VARCHAR(21) NOT NULL,
  Name VARCHAR(21) NOT NULL,
  User_ID VARCHAR(21) NOT NULL,
  PRIMARY KEY (Account_Name, Name, User_ID),
  FOREIGN KEY (Name, User_ID) REFERENCES Users(UserName, User_ID)
);

USE NextjsGym
CREATE TABLE AccountsExerciseInfo
(
  Reps VARCHAR(2) NOT NULL,
  Sets VARCHAR(2) NOT NULL,
  WeekDays VARCHAR(7) NOT NULL,
  Notes VARCHAR(40),
  ExerciseName VARCHAR(21) NOT NULL,
  Account_Name VARCHAR(21) NOT NULL,
  Name VARCHAR(21) NOT NULL,
  User_ID VARCHAR(21) NOT NULL,
  PRIMARY KEY (ExerciseName, Account_Name, Name, User_ID),
  FOREIGN KEY (ExerciseName) REFERENCES Exercises(ExerciseName),
  FOREIGN KEY (Account_Name, Name, User_ID) REFERENCES Accounts(Account_Name, Name, User_ID)
);