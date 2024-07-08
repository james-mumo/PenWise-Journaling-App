import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images, icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { EmptyState, SearchInput } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import JournalEntryCard from "../../components/JournalEntryCard";
import { BASE_URL } from "../../context/GlobalProvider";
import { useFormattedDate, useCurrentTime } from "../../hooks/useDateTime.jsx";

const Home = () => {
  const { user } = useGlobalContext();
  const [journalEntries, setJournalEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const formattedDate = useFormattedDate();
  const currentTime = useCurrentTime();

  // refresh function for the flat-list
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJournalEntries();
    setRefreshing(false);
  };

  // custom greeting text function depending on time
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

  // Function fetches all journal entries based on the page load initiated by useEffect
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
    <SafeAreaView className="flex bg-gray-900">
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
            icon={images.pentagon}
            category={item.categoryName}
            categoryColor={item.categoryColor}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-2 mt-5 px-5">
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
            <View className="mt-2 flex flex-1 flex-row border border-yellow-500 bg-gray-800 rounded-md ">
              <View className="bg-yellow-400 p-2"></View>
              <Image
                source={images.logoSmall}
                className="h-20 w-20 my-2"
                resizeMode="contain"
              />
              <View className="flex flex-col ml-3 items-end flex-1 justify-center">
                <Text className="font-psemibold text-yellow-400 text-xl">
                  {formattedDate}
                </Text>
                <Text className="font-psemibold text-yellow-400 text-xl">
                  {currentTime}
                </Text>
                <Text className="font-psemibold text-yellow-200 text-[11px]">
                  {journalEntries?.length > 0 ? journalEntries?.length : 0}{" "}
                  Entries
                </Text>
              </View>
            </View>
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
