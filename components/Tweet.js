import styles from '../styles/Tweet.module.css';

function Tweet({ tweet, onDelete, onLike, isUserTweet }) {
    return (
        <div className={styles.tweet}>
            <p className={styles.author}>{tweet.author.username}</p>
            <p className={styles.content}>{tweet.content}</p>
            <div className={styles.actions}>
                <button onClick={() => onLike(tweet.id)}>
                    {tweet.isLiked ? '❤️' : '🤍'} {tweet.likes}
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