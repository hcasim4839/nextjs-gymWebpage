export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const data = JSON.parse(req.body);

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

      let queryCmd =
        "INSERT INTO Users VALUES ('" +
        data.userId +
        "','" +
        data.firstName +
        "','" +
        data.lastName +
        "')";

      await sqlConfig.request().query(queryCmd);

      conn.close();
      res.status(201).json({ message: "Account Registered" });
    } else {
      res.status(405);
      res.end();
    }
  } catch (error) {
    console.log(error.message);
  }
}
