import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const responseMessage = (response) => {
    console.log(response);
    localStorage.setItem('token', response);
    window.location = '/';
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      window.location = '/';
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>NASA PTOD</h1>
            <h2>Login to Your Account</h2>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.green_btn}>
              Sign In
            </button>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to='/signup'>
            <button type='button' className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
