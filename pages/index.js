import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from '../components/Home' ;

function Index() {
  const userInfo = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo.token) {
      router.push('/login');
    }
  }, [userInfo, router]);

  return userInfo.token ? <Home /> : null; 
}

export default Index;
