import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FirebaseService from '../services/FirebaseService';

const AuthScreen = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email and password to continue.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await FirebaseService.login(email.trim(), password);
      } else {
        await FirebaseService.signup(email.trim(), password);
      }
    } catch (error) {
      Alert.alert('Unable to continue', error.message);
    } finally {
      setLoading(false);
    }
  };

  const continueAnonymously = async () => {
    setLoading(true);
    try {
      await FirebaseService.anonymousLogin();
    } catch (error) {
      Alert.alert('Unable to continue anonymously', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.brandBlock}>
          <Text style={styles.logo}>mindmate</Text>
          <Text style={styles.tagline}>A private space to check in, reflect, and feel supported.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your space'}</Text>
          <Text style={styles.subtitle}>
            {mode === 'login' ? 'Continue your wellbeing journey.' : 'Your account keeps your check-ins synced.'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#8B98A5"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8B98A5"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={submit} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>{mode === 'login' ? 'Sign in' : 'Create account'}</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchButton} onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            <Text style={styles.switchText}>
              {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.secondaryButton} onPress={continueAnonymously} disabled={loading}>
            <Text style={styles.secondaryButtonText}>Continue anonymously</Text>
          </TouchableOpacity>
          <Text style={styles.privacyText}>No name or email is needed for a private check-in.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7F5' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  brandBlock: { marginBottom: 42 },
  logo: { color: '#155E63', fontSize: 42, fontWeight: '800', letterSpacing: 0 },
  tagline: { color: '#52636A', fontSize: 16, lineHeight: 23, marginTop: 10, maxWidth: 320 },
  form: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 22, shadowColor: '#1A3A3D', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 3 },
  title: { color: '#183B3D', fontSize: 25, fontWeight: '700' },
  subtitle: { color: '#718087', fontSize: 14, marginTop: 6, marginBottom: 22 },
  input: { borderWidth: 1, borderColor: '#D8E3E0', borderRadius: 12, color: '#183B3D', fontSize: 16, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 12 },
  primaryButton: { backgroundColor: '#1E7770', borderRadius: 12, alignItems: 'center', justifyContent: 'center', minHeight: 48, marginTop: 4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  switchButton: { alignItems: 'center', paddingVertical: 16 },
  switchText: { color: '#1E7770', fontSize: 14, fontWeight: '600' },
  divider: { alignItems: 'center', flexDirection: 'row', gap: 10, marginVertical: 4 },
  dividerLine: { backgroundColor: '#E1EAE7', flex: 1, height: 1 },
  dividerText: { color: '#9AA9A8', fontSize: 13 },
  secondaryButton: { borderColor: '#9BC2BA', borderRadius: 12, borderWidth: 1, alignItems: 'center', minHeight: 48, justifyContent: 'center', marginTop: 18 },
  secondaryButtonText: { color: '#155E63', fontSize: 15, fontWeight: '700' },
  privacyText: { color: '#899795', fontSize: 12, lineHeight: 17, marginTop: 10, textAlign: 'center' },
});

export default AuthScreen;
