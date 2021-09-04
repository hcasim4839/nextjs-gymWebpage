--Creating the database
CREATE DATABASE nextjs_gym


--Creating the table for the 'nextjs-gym' database
USE nextjs_gym
CREATE TABLE Users(
userId VarChar(21) Primary Key,
firstName VarChar(20) Not Null,
lastName VarChar(20) Not Null
);
USE nextjs_gym
CREATE TABLE Exercise(
exerciseName VarChar(20) Primary Key,
);
USE nextjs_gym
CREATE TABLE User_Workouts(
workoutDays int  Null,
sets VarChar(2)  Null,
reps VarChar(2)  Null,

userId VarChar(20) FOREIGN KEY REFERENCES Users(userId) ON DELETE CASCADE,
exerciseName VarChar(20) FOREIGN KEY REFERENCES Exercise(exerciseName)ON DELETE CASCADE
);
USE nextjs_gym
CREATE TABLE Muscles (
muscleName VarChar(20) Primary Key,
description VarChar(40) Not Null);
USE nextjs_gym
CREATE TABLE Muscles_Used(
muscleName VarChar(20) FOREIGN KEY REFERENCES Muscles(muscleName) ON DELETE CASCADE,
exerciseName VarChar(20) FOREIGN KEY REFERENCES Exercise(exerciseName) ON DELETE CASCADE
);

USE nextjs_gym
Insert into Users
Values(324324, 'Horacio', 'Casimiro');