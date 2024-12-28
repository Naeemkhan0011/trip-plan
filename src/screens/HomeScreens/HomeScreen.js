import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>Current Location</Text>
          <Text style={styles.locationValue}>New York, USA</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {['Sports', 'Music', 'Food'].map((category, index) => (
          <TouchableOpacity key={index} style={styles.category}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.eventCards}
      >
        <View style={styles.eventCard}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>10</Text>
            <Text style={styles.monthText}>JUNE</Text>
          </View>
          <Text style={styles.eventTitle}>International Band Music</Text>
          <Text style={styles.eventLocation}>36 Guild Street London, UK</Text>
        </View>
        <View style={styles.eventCard}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>10</Text>
            <Text style={styles.monthText}>JUNE</Text>
          </View>
          <Text style={styles.eventTitle}>Jo Malone</Text>
          <Text style={styles.eventLocation}>Radius Gallery</Text>
        </View>
      </ScrollView>

      {/* Invite Friends Section */}
      <TouchableOpacity style={styles.inviteCard}>
        <Text style={styles.inviteTitle}>Invite your friends</Text>
        <Text style={styles.inviteSubtitle}>Get 100 Rupees for ticket</Text>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>INVITE</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {['Explore', 'Events', 'Map', 'Profile'].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.navButton}>
            <Text style={styles.navButtonText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  locationRow: {
    flexDirection: 'column',
  },
  locationLabel: {
    fontSize: 12,
    color: '#6C757D',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  notificationIcon: {
    backgroundColor: '#EEE',
    borderRadius: 20,
    padding: 10,
  },
  iconText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    backgroundColor: '#6F1DE8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  filterText: {
    color: '#FFF',
    fontWeight: '600',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  category: {
    backgroundColor: '#EEE',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  categoryText: {
    color: '#6F1DE8',
    fontWeight: '600',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    color: '#6F1DE8',
  },
  eventCards: {
    flexDirection: 'row',
  },
  eventCard: {
    width: 150,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    elevation: 2,
  },
  dateBadge: {
    backgroundColor: '#6F1DE8',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  monthText: {
    fontSize: 12,
    color: '#FFF',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 12,
    color: '#6C757D',
  },
  inviteCard: {
    backgroundColor: '#E6F4FF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  inviteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  inviteSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 15,
  },
  inviteButton: {
    backgroundColor: '#6F1DE8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inviteButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E6E8EB',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 14,
    color: '#6C757D',
  },
});

export default HomeScreen;
