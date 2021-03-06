USE [NextjsGym]
GO
/****** Object:  Table [dbo].[Exercise]    Script Date: 8/25/2021 9:24:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exercise](
	[ExerciseName] [varchar](21) NOT NULL,
	[MusclesUsed] [varchar](21) NOT NULL,
	[Description] [varchar](299) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ExerciseName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
