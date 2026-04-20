import { View, Text, StyleSheet } from 'react-native';

export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Watchlist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141420', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 18 },
});