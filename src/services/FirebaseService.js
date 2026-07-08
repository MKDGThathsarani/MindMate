import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class FirebaseService {
  async login(email, password) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  }

  async signup(email, password) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        email: email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return userCredential.user;
    } catch (error) {
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  }

  async anonymousLogin() {
    try {
      const userCredential = await auth().signInAnonymously();
      return userCredential.user;
    } catch (error) {
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  }

  getAuthErrorMessage(code) {
    const errors = {
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
    };
    return errors[code] || 'An error occurred. Please try again.';
  }
}

export default new FirebaseService();