export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const data = JSON.parse(req.body);
      if (data !== null) {
        const mssql = require("mssql/msnodesqlv8");
        const sqlConfig = new mssql.ConnectionPool({
          database: "NextjsGym",
          server: "DESKTOP-HC\\SQLEXPRESS",
          driver: "msnodesqlv8",
          options: {
            trustedConnection: true,
          },
        });
        let conn = await sqlConfig.connect();

        const AMT_EXERCISE_TO_REMOVE = data[1].length;

        if (AMT_EXERCISE_TO_REMOVE > 0) {
          for (let index = 0; index < AMT_EXERCISE_TO_REMOVE; index++) {
            const queryCmd =
              "DELETE FROM UserExercises WHERE UserId = '" +
              data[1][index].userId +
              "' AND ExerciseName = '" +
              data[1][index].exerciseName +
              "';";
            await sqlConfig.request().query(queryCmd);
          }
        }

        const AMT_EXERCISE_TO_ADD = data[0].length;
        if (AMT_EXERCISE_TO_ADD > 0) {
          for (let index = 0; index < AMT_EXERCISE_TO_ADD; index++) {
            const queryCmd =
              "INSERT INTO UserExercises(UserId, ExerciseName)VALUES('" +
              data[0][index].userId +
              "','" +
              data[0][index].exerciseName +
              "');";
            await sqlConfig.request().query(queryCmd);
          }
        }

        conn.close();
        res.status(201).json({ message: "Exercise Registered" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
