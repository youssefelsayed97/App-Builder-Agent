import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card, withTheme } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HistoryScreen = ({ theme }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const stepHistoryKeys = keys.filter(key => key.startsWith('stepHistory_'));
        const historyData = [];
        for (const key of stepHistoryKeys) {
          const data = await AsyncStorage.getItem(key);
          if (data) {
            historyData.push(JSON.parse(data));
          }
        }
        // Sort by date descending
        historyData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistory(historyData);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.stepsCountText}>{item.steps} steps</Text>
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={styles.header}>Step History</Text>
      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noHistoryText}>No history available yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  listContent: {
    width: width * 0.9,
  },
  cardContainer: {
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  stepsCountText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  noHistoryText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 50,
  },
});

export default withTheme(HistoryScreen);
