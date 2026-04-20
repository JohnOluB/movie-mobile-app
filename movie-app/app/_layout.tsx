import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, focused && styles.activeLabel]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1e1e2e',
          borderTopColor: '#2a2a3e',
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#e8453c',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚽" label="Matches" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔖" label="Watchlist" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📈" label="Earnings" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👛" label="Wallet" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  emoji: { fontSize: 20 },
  label: {
    fontSize: 10,
    color: '#666',
  },
  activeLabel: {
    color: '#e8453c',
  },
});