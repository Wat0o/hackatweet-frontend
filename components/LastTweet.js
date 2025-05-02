import styles from '../styles/LastTweet.module.css';
import Tweet from './Tweet';

function LastTweets({ tweets, setTweets, currentUser }) {
  const handleDelete = (tweetId) => {
    setTweets(tweets.filter(tweet => tweet.id !== tweetId));
  };

  const handleLike = (tweetId) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
          isLiked: !tweet.isLiked
        };
      }
      return tweet;
    }));
  };

  return (
      <div className={styles.lastTweets}>
        <h2>Last Tweets</h2>
        <div className={styles.tweetsList}>
          {tweets.map(tweet => (
              <Tweet
                  key={tweet.id}
                  tweet={tweet}
                  onDelete={handleDelete}
                  onLike={handleLike}
                  isUserTweet={tweet.author.id === currentUser.id}
              />
          ))}
        </div>
      </div>
  );
}

export default LastTweets;