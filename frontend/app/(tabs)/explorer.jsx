import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { images } from "../../constants";
import { EmptyState, SearchInput } from "../../components";
import JournalEntryCard from "../../components/JournalEntryCard";
import JournalEntryModal from "../../components/JournalEntryModal";
import { BASE_URL } from "../../context/GlobalProvider";

const Explore = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortedByRecent, setSortedByRecent] = useState(true);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  // function to fetch journal entries which is inititaed by useEffect on load
  const fetchJournalEntries = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (!token) {
        throw new Error("User token not found");
      }

      const response = await axios.get(`${BASE_URL}/journal-entries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const entries = response.data;
      setJournalEntries(entries);
      setFilteredEntries(entries);

      const months = entries.map((entry) =>
        new Date(entry.date).toLocaleString("default", { month: "long" })
      );
      const uniqueMonths = [...new Set(months)];
      setAvailableMonths(uniqueMonths);

      const categories = entries.map((entry) => entry.categoryName);
      const uniqueCategories = [...new Set(categories)];
      setAvailableCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch journal entries:", error.message);
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      fetchJournalEntries();
    }
  }, [modalVisible]);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJournalEntries();
    setRefreshing(false);
  };

  // Sorting functions
  const sortByMostRecent = () => {
    const sorted = [...filteredEntries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilteredEntries(sorted);
    setSortedByRecent(true);
  };

  const sortByOldestFirst = () => {
    const sorted = [...filteredEntries].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setFilteredEntries(sorted);
    setSortedByRecent(false);
  };

  const filterByMonth = (month) => {
    const originalEntries = [...journalEntries];
    const filteredEntries = originalEntries.filter(
      (entry) =>
        new Date(entry.date).toLocaleString("default", { month: "long" }) ===
        month
    );
    setFilteredEntries(filteredEntries);
  };

  const filterByLast7Days = () => {
    const today = new Date();
    const last7Days = today.setDate(today.getDate() - 7);
    const filtered = journalEntries.filter(
      (entry) => new Date(entry.date) >= last7Days
    );
    setFilteredEntries(filtered);
  };

  const filterByLast28Days = () => {
    const today = new Date();
    const last28Days = today.setDate(today.getDate() - 28);
    const filtered = journalEntries.filter(
      (entry) => new Date(entry.date) >= last28Days
    );
    setFilteredEntries(filtered);
  };

  const filterByCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const filtered = journalEntries.filter(
      (entry) => new Date(entry.date).getMonth() === currentMonth
    );
    setFilteredEntries(filtered);
  };

  const filterByCurrentWeek = () => {
    const today = new Date();
    const currentWeekStart = today.setDate(today.getDate() - today.getDay());
    const filtered = journalEntries.filter(
      (entry) => new Date(entry.date) >= currentWeekStart
    );
    setFilteredEntries(filtered);
  };

  const filterByCategory = (category) => {
    if (category === "") {
      setFilteredEntries(journalEntries);
    } else {
      const filtered = journalEntries.filter(
        (entry) => entry.categoryName === category
      );
      setFilteredEntries(filtered);
    }
    setSelectedCategory(category);
  };

  // journal enrty rendered card
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEntryClick(item)}>
      <JournalEntryCard
        id={item.id}
        title={item.title}
        content={item.content}
        date={item.date}
        userId={item.userId}
        icon={images.pentagon}
        category={item.categoryName}
        categoryColor={item.categoryColor}
      />
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <EmptyState
      title="No Entries Found"
      subtitle="No journal entries available"
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View className="p-4">
            <View className="flex-row justify-between items-end pt-1 mb-1">
              <Text className="text-white text-4xl font-bold">Explore</Text>
              <Image
                source={images.logoSmall}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            </View>
            <SearchInput />
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-white text-xl font-bold">
                Latest Entries
              </Text>
              <TouchableOpacity
                onPress={fetchJournalEntries}
                className="bg-yellow-400 mt-1 rounded-lg py-2 px-4"
              >
                <Text className="text-white text-md font-psemibold">
                  Refresh
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
              <Button
                title="Most Recent"
                onPress={sortByMostRecent}
                disabled={sortedByRecent}
              />
              <Button
                title="Oldest First"
                onPress={sortByOldestFirst}
                disabled={!sortedByRecent}
              />
            </View>

            <ScrollView
              horizontal
              className="border-y py-1 border-yellow-500"
              showsHorizontalScrollIndicator={false}
            >
              {availableMonths.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    filterByMonth(month);
                    setActiveFilter(month);
                  }}
                  className={`rounded-lg p-2 px-4 mr-4 ${
                    activeFilter === month ? "bg-red-600" : "bg-blue-600"
                  }`}
                >
                  <Text className="text-white font-bold">{month}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => {
                  filterByLast7Days();
                  setActiveFilter("Last 7 Days");
                }}
                className={`rounded-lg p-2 px-4 mr-4 ${
                  activeFilter === "Last 7 Days" ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                <Text className="text-white font-bold">Last 7 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  filterByLast28Days();
                  setActiveFilter("Last 28 Days");
                }}
                className={`rounded-lg p-2 px-4 mr-4 ${
                  activeFilter === "Last 28 Days" ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                <Text className="text-white font-bold">Last 28 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  filterByCurrentMonth();
                  setActiveFilter("Current Month");
                }}
                className={`rounded-lg p-2 px-4 mr-4 ${
                  activeFilter === "Current Month"
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
              >
                <Text className="text-white font-bold">Current Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  filterByCurrentWeek();
                  setActiveFilter("Current Week");
                }}
                className={`rounded-lg p-2 px-4 mr-4 ${
                  activeFilter === "Current Week" ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                <Text className="text-white font-bold">Current Week</Text>
              </TouchableOpacity>
              {availableCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    filterByCategory(category);
                    setActiveFilter(category);
                  }}
                  className={`rounded-lg p-2 px-4 mr-4 ${
                    activeFilter === category ? "bg-green-900" : "bg-green-600"
                  }`}
                >
                  <Text className="text-white font-bold">{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        ListHeaderComponentStyle={{ marginBottom: 10 }}
      />
      <JournalEntryModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        entry={selectedEntry}
      />
    </SafeAreaView>
  );
};

export default Explore;
