import "antd/dist/antd.css";
import CustomHead from "../components/CustomHead";
import LoginForm from "../components/login/LoginForm";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <CustomHead title="Login" />
      <h1 className={styles.title}>Login Page</h1>
      <LoginForm />
    </div>
  );
}
