import styles from './styles.module.scss';

export function NotFound() {
  return (
    <main className={styles.main}>
      <h1>Algum errado aconteceu! 🙁</h1>
      <a href='/'>Volte para o início</a>
    </main>
  );
}