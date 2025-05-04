import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LastTweets from './LastTweet'
import styles from '../styles/Hashtag.module.css'
import Trends from './Trends'

function HashtagPage() {
    const router = useRouter();
    const { hashtag } = router.query;
    const [tweets, setTweets] = useState([]);
    const [input, setInput] = useState('')
    const user = useSelector((state)=>state.user.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!hashtag) return;

        fetch(`http://localhost:3000/tweets/hashtag/${hashtag}`)
            .then(res => res.json())
            .then(data => setTweets(data));
    }, [hashtag]);

      const handleLogout = () => {
        dispatch(logout())
      };

    return (
        <main className={styles.container}>
            {/* Section gauche */}
            <div className={styles.leftSection}>
                <img src="/logo.png" alt="Logo" onClick={() => window.location.reload()} className={styles.logo} />
                <div className={styles.userInfo}>
                    <p>{user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Section centrale */}
            <div className={styles.middleSection}>
                <h2>Hashtag</h2>
                <input onChange={e => setInput(e.target.value)} value={input} />
                <LastTweets tweets={tweets} setTweets={setTweets} currentUser={user} />
            </div>

            {/* Section droite */}
            <div className={styles.rightSection}>
                <Trends tweets={tweets} />
            </div>
        </main>
    );
}

export default HashtagPage;