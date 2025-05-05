import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LastTweets from './LastTweet'
import styles from '../styles/Hashtag.module.css'
import Trends from './Trends'
import Link from 'next/link'
import {logout} from '../reducers/user'

function HashtagPage() {
    const router = useRouter();
    const { hashtag } = router.query;
    const [tweets, setTweets] = useState([]);
    const [allTweets, setAllTweets] = useState([])
    const [input, setInput] = useState('')
    const user = useSelector((state)=>state.user.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!hashtag) return;

        fetch(`http://localhost:3000/tweets/hashtag/${hashtag}`)
            .then(res => res.json())
            .then(data => setTweets(data));
    }, [hashtag]);

    useEffect(()=>{
        fetch('http://localhost:3000/tweets')
        .then(response=>response.json())
        .then(data=> {
          setAllTweets(data.data)
        })
    },[])

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
                        <img src='/profil.webp' alt='profil picture' className={styles.profilPic} />
                        <div className={styles.name}>
                            <p>{user.firstname}</p>
                            <p>@{user.username}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Section centrale */}
            <div className={styles.middleSection}>
                <div className={styles.inputContainer}>
                    <h2>Hashtag</h2>
                    <input onChange={e => setInput(e.target.value)} value={input} placeholder="Rechercher un hashtag"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const cleaned = input.trim().replace(/^#/, '');
                                if (cleaned) {
                                    router.push(`/hashtag/${cleaned.toLowerCase()}`);
                                    setInput('');
                                }
                            }
                        }} />
                </div>
                <LastTweets tweets={tweets} setTweets={setTweets} currentUser={user} />
            </div>

            {/* Section droite */}
            <div className={styles.rightSection}>
                <Trends tweets={allTweets} />
            </div>
        </main>
    );
}

export default HashtagPage;