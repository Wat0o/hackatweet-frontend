import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Hashtag from '../../components/Hashtag';

function HashtagPage() {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.value);

  const { hashtag } = router.query; 

  useEffect(() => {
    if (!userInfo.token) {
      router.push(`/login`);
    }
  }, [userInfo, router]);

  return userInfo.token ? <Hashtag hashtag={hashtag} /> : null;
}

export default HashtagPage;