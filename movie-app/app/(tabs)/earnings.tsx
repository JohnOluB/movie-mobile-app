import { View, Text, StyleSheet } from 'react-native';

export default function EarningsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Earnings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141420', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 18 },
});