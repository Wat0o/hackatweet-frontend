
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import LastTweets from './LastTweet';
import Trends from './Trends';

function Home() {
  const [tweetContent, setTweetContent] = useState('');
  const [tweets, setTweets] = useState([]);

  // Utilisateur simulé (à remplacer par les données de connexion réelles)
  const user = {
    id: '123',
    username: 'John Doe',
    token: 'token123'
  };

  const handleTweetChange = (e) => {
    if (e.target.value.length <= 280) {
      setTweetContent(e.target.value);
    }
  };

  const handleTweetSubmit = () => {
    if (tweetContent.trim() && tweetContent.length <= 280) {
      const newTweet = {
        id: Date.now().toString(),
        content: tweetContent,
        author: user,
        likes: 0,
        isLiked: false
      };
      setTweets([newTweet, ...tweets]);
      setTweetContent('');
    }
  };

  const handleLogout = () => {
    // Logique de déconnexion à implémenter
  };

  return (
      <main className={styles.container}>
        {/* Section gauche */}
        <div className={styles.leftSection}>
          <button className={styles.logoButton} onClick={() => window.location.reload()}>
            <img src="/logo.png" alt="Logo" />
          </button>
          <div className={styles.userInfo}>
            <p>{user.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Section centrale */}
        <div className={styles.middleSection}>
          <div className={styles.tweetInput}>
          <textarea
              value={tweetContent}
              onChange={handleTweetChange}
              placeholder="Quoi de neuf ?"
              maxLength={280}
          />
            <div className={styles.tweetControls}>
              <span>{280 - tweetContent.length} caractères restants</span>
              <button onClick={handleTweetSubmit}>Tweeter</button>
            </div>
          </div>
          <LastTweets tweets={tweets} setTweets={setTweets} currentUser={user} />
        </div>

        {/* Section droite */}
        <div className={styles.rightSection}>
          <Trends tweets={tweets} />
        </div>
      </main>
  );
}

export default Home;