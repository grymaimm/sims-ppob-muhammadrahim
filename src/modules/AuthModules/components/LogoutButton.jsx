import { useRouter } from 'next/router';
import { Button } from '@/components/shadcnui/button';
import { logout } from '@/store/slices/loginSlice';
import { useDispatch } from 'react-redux';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <Button className='w-full' variant='destructive' onClick={handleLogout}>
      Logout
    </Button>
  );
}
