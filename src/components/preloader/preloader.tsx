import styles from "./preloader.module.css";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader_circle} />
    </div>
  );
};

export default Preloader;
