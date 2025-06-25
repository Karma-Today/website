import styles from './Loading.module.css';

export default function LoadingDots() {

    return (
        <span className={styles.container}>
            <span className={styles.dots}></span>
            <span className={styles.dots} style={{ animationDelay: '400ms' }}></span>
            <span className={styles.dots} style={{ animationDelay: '800ms' }}></span>
        </span>
    );
}