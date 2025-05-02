import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Login from '../components/Login';

function LoginPage() {
  const userInfo = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    if (userInfo.token) {
      router.push('/');
    }
  }, [userInfo, router]);

  return !userInfo.token ? <Login /> : null;
}

export default LoginPage;