import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

interface UserData extends DocumentData {
  name: string;
  firstName: string;
  status: string;
  photoURL?: string;
}

const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserData = async () => {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserData);
          }
        };

        fetchUserData();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

interface ProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && !user) {
      router.push('/auth/login');
    }
  }, [isClient, user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedPage;
