import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { useApi } from "../api/dto/ApiProvider";

function GetMe() {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.getMe();
        if (response.success) {
          setUserData(response.data);
        } else {
          console.error("Failed to fetch user:", response.statusCode);
          setError(`Failed to fetch user: ${response.statusCode}`);
        }
      } catch (error) {
        // Handle different types of errors
        if (error instanceof Error) {
          console.error("Error fetching user data:", error);
          setError(`Error fetching user data: ${error.message}`);
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiClient]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="single-book">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/books">Lista książek</Link>
          <Link to="/main">Strona główna</Link>
          <Link to="/">Wyloguj</Link>
        </div>
      </nav>
      <header className="header">Moje konto</header>
      <table className="user-table">
        <tbody>
          {Object.entries(userData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetMe;
