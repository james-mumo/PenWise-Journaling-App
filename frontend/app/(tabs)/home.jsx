import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images, icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { EmptyState, SearchInput, Trending } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllJournalEntriesByUser } from "../../lib/appwrite";
import JournalEntryCard from "../../components/JournalEntryCard";
import { BASE_URL } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const [journalEntries, setJournalEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJournalEntries();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
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
      setJournalEntries(response.data);
    } catch (error) {
      console.error("Failed to fetch journal entries:", error.message);
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#141414" }}>
      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JournalEntryCard
            id={item.id}
            title={item.title}
            content={item.content}
            date={item.date}
            userId={item.userId}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-2 px-5">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "white" }}
                >
                  {getGreeting()}
                </Text>
                <Text
                  style={{ fontSize: 24, fontWeight: "700", color: "white" }}
                >
                  {user?.username || "User"}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="h-11 w-11"
                resizeMode="contain"
              />
            </View>
            <SearchInput />
            <View className="mt-2">
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "white",
                  marginBottom: 10,
                }}
              >
                Latest Entries
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Entries Found"
            subtitle="No journal entries available"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
