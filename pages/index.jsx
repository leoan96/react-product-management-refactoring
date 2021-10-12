import "antd/dist/antd.css";
import LoginForm from "../components/login/LoginForm";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login Page</h1>
        <div className={styles.loginForm}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
