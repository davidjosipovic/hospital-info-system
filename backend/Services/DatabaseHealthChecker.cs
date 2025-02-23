using Npgsql;
using System;

public interface IDatabaseHealthChecker
{
    bool IsDatabaseConnected();
}

public class DatabaseHealthChecker : IDatabaseHealthChecker
{
    private readonly string _connectionString;

    public DatabaseHealthChecker(string connectionString)
    {
        _connectionString = connectionString;
    }

    public bool IsDatabaseConnected()
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                conn.Open();
                return true; // ✅ Connection successful
            }
        }
        catch (Exception)
        {
            return false; // ❌ Connection failed
        }
    }
}
