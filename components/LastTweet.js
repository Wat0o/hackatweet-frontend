import styles from '../styles/LastTweet.module.css';
import Tweet from './Tweet';

function LastTweets({ tweets, setTweets, currentUser }) {

  const handleDelete = (tweetId) => {
    fetch(`https://hackatweet-backend-inky.vercel.app/tweets/${tweetId}`, {
      method: 'DELETE'
    }).then(()=>{
      setTweets(tweets.filter(tweet => tweet.id !== tweetId));
    })
  };

  const handleLike = (tweetId) => {
    fetch('https://hackatweet-backend-inky.vercel.app/tweets', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({author: currentUser.username, tweetId: tweetId})
    }).then(() => {
      setTweets(tweets.map(tweet => {
        if (tweet.id === tweetId) {
          const alreadyLiked = tweet.likedBy.includes(currentUser.username);
          return {
            ...tweet,
            likes: alreadyLiked ? tweet.likes - 1 : tweet.likes + 1,
            likedBy: alreadyLiked
              ? tweet.likedBy.filter(user => user !== currentUser.username)
              : [...tweet.likedBy, currentUser.username]
          };
        }
        return tweet;
      }));
    })
  };

  return (
      <div className={styles.lastTweets}>
        <div className={styles.tweetsList}>
          {tweets.map(tweet => (
              <Tweet
                  key={tweet.id}
                  tweet={tweet}
                  onDelete={handleDelete}
                  onLike={handleLike}
                  isUserTweet={tweet.author === currentUser.username}
                  currentUser={currentUser}
              />
          ))}
        </div>
      </div>
  );
}

export default LastTweets;