// components/MainLayout.js
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import styles from './MainLayout.module.css'; // スタイルを適用するためのCSSモジュール

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <p>たあ</p>
        {children} {/* メインコンテンツをここに挿入 */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
