import styles from '../styles/Tweet.module.css';
import Link from 'next/link'
import moment from 'moment'

function Tweet({ tweet, onDelete, onLike, isUserTweet, currentUser }) {

    let likeStyle = tweet.isLiked ? { color: 'red' } : likeStyle;

    function parseTweetContent(content) {
        const words = content.split(' ');
        return words.map((word, i) => {
          if (word.startsWith('#')) {
            const hashtag = word.slice(1);
            return (
              <Link key={i} href={`/hashtag/${hashtag}`}>
                <span style={{ color: '#3985D1' , cursor: 'pointer'}}>{word} </span>
              </Link>
            );
          }
          return word + ' ';
        });
      }

    return (
        <div className={styles.tweet}>
            <div className={styles.authorContainer}>
              <img className={styles.profil} src='/profil.webp' alt='profil picture'/>
              {console.log(tweet)}
              <p className={styles.firtsname}>{tweet.firstname}</p>
              <p className={styles.author}>@{tweet.author}</p>
              <p className={styles.date}>• {moment(new Date(parseInt(tweet.id))).fromNow()}</p>
            </div>
            <p className={styles.content}>{parseTweetContent(tweet.content)}</p>
            <div className={styles.actions}>
                <button onClick={() => onLike(tweet.id)} style={likeStyle} className={styles.btnLike}>
                    {tweet.likedBy.includes(currentUser.username) ? '❤️' : '🤍'} {tweet.likes}
                </button>
                {isUserTweet && (
                    <button onClick={() => onDelete(tweet.id)}>
                        🗑️
                    </button>
                )}
            </div>
        </div>
    );
}

export default Tweet;