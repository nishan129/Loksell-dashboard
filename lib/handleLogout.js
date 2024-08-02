import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default async function handleLogout() {
    const router = useRouter();
    await signOut({ redirect: false });
    router.push('/');
}