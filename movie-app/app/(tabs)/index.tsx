import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const TABS = ['All', 'LIVE', 'Upcoming', 'Finished'];

const MATCHES = [
  { time: "4'", period: 'FT', home: 'Liverpool', away: 'Aston Villa', homeScore: 3, awayScore: 1, bookmarked: true, live: true },
  { time: '21:00', period: 'FT', home: 'Liverpool', away: 'Aston Villa', homeScore: 3, awayScore: 1, bookmarked: true, live: false },
  { time: '21:00', period: 'FT', home: 'Liverpool', away: 'Aston Villa', homeScore: 3, awayScore: 1, bookmarked: false, live: false },
  { time: "31'", period: 'FT', home: 'Liverpool', away: 'Aston Villa', homeScore: 3, awayScore: 1, bookmarked: false, live: true },
  { time: '21:00', period: 'FT', home: 'Liverpool', away: 'Aston Villa', homeScore: 3, awayScore: 1, bookmarked: false, live: false },
];

export default function MatchesScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🪸</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>⚽ Football ▾</Text>
        </TouchableOpacity>
        <Text style={styles.menuIcon}>☰</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tabIcons}>
          <Text style={styles.iconText}>📅</Text>
          <Text style={styles.iconText}>↕</Text>
          <Text style={styles.iconText}>🔍</Text>
        </View>
      </View>

      {/* Matches List */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* League Header */}
        <View style={styles.leagueRow}>
          <Text style={styles.leagueBadge}>🏆</Text>
          <Text style={styles.leagueTitle}>Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</Text>
          <Text style={styles.leagueArrow}>›</Text>
        </View>

        {/* Match Cards */}
        {MATCHES.map((match, index) => (
          <View key={index} style={styles.matchCard}>
            {match.live && <View style={styles.liveBar} />}
            <Text style={styles.time}>{match.time}{'\n'}{match.period}</Text>
            <View style={styles.teams}>
              <View style={styles.teamRow}>
                <Text style={styles.teamEmoji}>⚽</Text>
                <Text style={styles.teamName}>{match.home}</Text>
              </View>
              <View style={styles.teamRow}>
                <Text style={styles.teamEmoji}>🟣</Text>
                <Text style={styles.teamName}>{match.away}</Text>
              </View>
            </View>
            <View style={styles.scores}>
              <Text style={styles.score}>{match.homeScore}</Text>
              <Text style={styles.score}>{match.awayScore}</Text>
            </View>
            <Text style={[styles.bookmark, match.bookmarked && styles.bookmarkedStar]}>
              {match.bookmarked ? '★' : '☆'}
            </Text>
          </View>
        ))}

        {/* Second League */}
        <View style={styles.leagueRow}>
          <Text style={styles.leagueBadge}>🏆</Text>
          <Text style={styles.leagueTitle}>Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</Text>
          <Text style={styles.leagueArrow}>›</Text>
        </View>

        {MATCHES.slice(0, 2).map((match, index) => (
          <View key={index} style={styles.matchCard}>
            {match.live && <View style={styles.liveBar} />}
            <Text style={styles.time}>{match.time}{'\n'}{match.period}</Text>
            <View style={styles.teams}>
              <View style={styles.teamRow}>
                <Text style={styles.teamEmoji}>⚽</Text>
                <Text style={styles.teamName}>{match.home}</Text>
              </View>
              <View style={styles.teamRow}>
                <Text style={styles.teamEmoji}>🟣</Text>
                <Text style={styles.teamName}>{match.away}</Text>
              </View>
            </View>
            <View style={styles.scores}>
              <Text style={styles.score}>{match.homeScore}</Text>
              <Text style={styles.score}>{match.awayScore}</Text>
            </View>
            <Text style={[styles.bookmark, match.bookmarked && styles.bookmarkedStar]}>
              {match.bookmarked ? '★' : '☆'}
            </Text>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141420',
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: { fontSize: 24 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  dropdownText: { color: '#fff', fontSize: 14 },
  menuIcon: { color: '#fff', fontSize: 22 },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    gap: 6,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2a2a3e',
  },
  tabText: { color: '#666', fontSize: 13 },
  activeTabText: { color: '#fff', fontWeight: '600' },
  tabIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconText: { fontSize: 16 },
  leagueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  leagueBadge: { fontSize: 20 },
  leagueTitle: { flex: 1, color: '#ccc', fontSize: 14, fontWeight: '600' },
  leagueArrow: { color: '#666', fontSize: 18 },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    marginHorizontal: 12,
    marginBottom: 6,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  liveBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#e8453c',
    borderRadius: 2,
  },
  time: {
    color: '#aaa',
    fontSize: 11,
    width: 42,
    textAlign: 'center',
    lineHeight: 16,
  },
  teams: { flex: 1, gap: 6 },
  teamRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  teamEmoji: { fontSize: 14 },
  teamName: { color: '#fff', fontSize: 14 },
  scores: { alignItems: 'flex-end', marginRight: 12, gap: 6 },
  score: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  bookmark: { color: '#555', fontSize: 20 },
  bookmarkedStar: { color: '#e8453c' },
});