import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";
import { create } from "zustand";
import { useLoadingStore } from "@/store";
import { deleteCookie, setCookie } from "@/utils";
import { auth } from "@/config/firebaseConfig";

export const useFirebaseStore = create<FirebaseStore>((set): FirebaseStore => {
  const { setLoading } = useLoadingStore.getState();

  return {
    user: null,
    setUser: (user: User | null) => set({ user }),
    isAuth: false,
    apiController: {
      listenToAuthChanges: () => {
        try {
          setLoading(true);
          set({ isAuth: false });

          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            const token = (await firebaseUser?.getIdToken()) as string;
            console.log("token-firebaseUser", token, firebaseUser);
            setCookie("firebaseToken", token);
            set({ user: firebaseUser || null, isAuth: true });
          });
          return unsubscribe;
        } catch (error) {
          console.error("Error in listenToAuthChanges:", error);
        } finally {
          setLoading(false); // ✅ Stop loading
        }
      },
      signInWithEmailAndPassword: async (email: string, password: string) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const token = await userCredential.user.getIdToken();

          setCookie("firebaseToken", token);
          set({ user: userCredential.user });
        } catch (error) {
          console.error(error);
        }
      },
      signInWithGoogle: async () => {
        try {
          const provider = new GoogleAuthProvider();
          const userCredential = await signInWithPopup(auth, provider);

          const token = await userCredential.user.getIdToken();

          setCookie("firebaseToken", token);
          set({ user: userCredential.user });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: async () => {
        try {
          await signOut(auth);

          deleteCookie("firebaseToken");
          set({ user: null });
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
});

export interface FirebaseStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuth: boolean;
  apiController: {
    listenToAuthChanges: () => Unsubscribe | undefined;
    signInWithEmailAndPassword: (
      email: string,
      password: string
    ) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
  };
}
