import styles from '../styles/Trends.module.css';
import { useMemo } from 'react';
import Link from "next/link"

function Trends({ tweets }) {
  const hashtags = useMemo(() => {
    const hashtagCounts = {};
    tweets.forEach(tweet => {
      const matches = tweet.content.match(/#\w+/g) || [];
      matches.forEach(hashtag => {
        hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1;
      });
    });
    
    return Object.entries(hashtagCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([hashtag, count]) => ({ hashtag, count }));
  }, [tweets]);

  return (
    <div className={styles.trends}>
      <h2>Trends</h2>
      <div className={styles.hashtagList}>
        {hashtags.map(({ hashtag, count }) => (
          <Link href={`/hashtag/${hashtag.slice(1)}`}>
            <div key={hashtag} className={styles.hashtagItem}>
              <span>{hashtag}</span>
              <span>{count} tweets</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Trends;