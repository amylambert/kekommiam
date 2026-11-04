/**
 * @file src/app/_layout.tsx
 * @description Root layout handling database bootstrapper.
 */

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { initializeDatabase } from '../db/database';

export default function RootLayout() {
  const [isDbReady, setIsDbReady] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    async function setup() {
      try {
        await initializeDatabase();
        setIsDbReady(true);
      } catch (err) {
        console.error('DB Init Error:', err);
        setDbError('Failed to initialize local database.');
      }
    }
    setup();
  }, []);

  if (!isDbReady) {
    return (
      <View style={styles.container}>
        {dbError ? (
          <Text style={styles.error}>{dbError}</Text>
        ) : (
          <>
            <ActivityIndicator size="large" color="#2b8a3e" />
            <Text style={styles.text}>Loading Kekommiam...</Text>
          </>
        )}
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#495057',
  },
  error: {
    fontSize: 16,
    color: '#fa5252',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});