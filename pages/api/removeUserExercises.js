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
        let exerciseToAddAmt = data.length;

        for (let index = 0; index < exerciseToAddAmt; index++) {
          const queryCmd =
            "DELETE FROM UserExercises WHERE UserId = '" +
            data[index].userId +
            "' AND ExerciseName = '" +
            data[index].exerciseName +
            "';";
          await sqlConfig.request().query(queryCmd);
        }

        conn.close();
        res.status(201).json({ message: "Exercise Removed" });
      }
    } else {
      res.status(500);
      res.end();
    }
  } catch (error) {
    console.log(error.message);
  }
}
