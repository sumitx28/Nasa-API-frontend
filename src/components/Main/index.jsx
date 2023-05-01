import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

const Main = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const getImage = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/image`;
      const { data: res } = await axios.get(url);
      setData(res);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Nasa Image of the Day</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.main_container}>
        {error ? (
          <div className={styles.error_msg}>
            <h1>Error fetching the image! Please try again later!!</h1>
          </div>
        ) : (
          <img src={data.hdurl} alt='Please Wait for 5 second or refresh!!' />
        )}
      </div>
    </div>
  );
};

export default Main;
