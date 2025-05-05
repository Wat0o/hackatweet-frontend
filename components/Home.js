import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import LastTweets from './LastTweet';
import Trends from './Trends';
import {useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/user'
import Link from 'next/link'

function Home() {

  const user = useSelector((state)=>state.user.value)

  const [tweetContent, setTweetContent] = useState('');
  const [tweets, setTweets] = useState([]);

  const dispatch = useDispatch()

  useEffect(()=>{
    fetch('http://localhost:3000/tweets')
    .then(response=>response.json())
    .then(data=> {
      setTweets(data.data)
    })
  },[])

  const handleTweetChange = (e) => {
    if (e.target.value.length <= 280) {
      setTweetContent(e.target.value);
    }
  };

  const handleTweetSubmit = () => {
    if (tweetContent.trim() && tweetContent.length <= 280) {
      fetch('http://localhost:3000/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tweetContent, author: user.username, firstname: user.firstname }),
      }).then(response => response.json())
      .then(data => {
        setTweets([data.tweet, ...tweets]);
        setTweetContent('');
      })
    }
  };

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <main className={styles.container}>
      {/* Section gauche */}
      <div className={styles.leftSection}>
      <Link href={`/`}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </Link>
        <div className={styles.userInfo}>
          <div className={styles.profil}>
            <img src='profil.webp' alt='profil picture' className={styles.profilPic} />
            <div className={styles.name}>
              <p>{user.firstname}</p>
              <p>@{user.username}</p>
            </div>
          </div>
          <button className={styles.logout} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Section centrale */}
      <div className={styles.middleSection}>
        <div className={styles.tweetInput}>
          <h2>HOME</h2>
          <textarea
            className={styles.input}
            value={tweetContent}
            onChange={handleTweetChange}
            placeholder="Quoi de neuf ?"
            maxLength={280}
          />
          <div className={styles.tweetControls}>
            <span className={styles.contentLeft}>{tweetContent.length} / 280</span>
            <button className={styles.tweetButton} onClick={handleTweetSubmit}>Tweeter</button>
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
