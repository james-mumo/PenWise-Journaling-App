import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchJournalEntries } from "../../lib/appwrite";
import { EmptyState, JournalEntryCard, SearchInput } from "../../components";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: journalEntries, refetch } = useAppwrite(() =>
    searchJournalEntries(query)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.$id}
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Entries Found"
            subtitle="No jounral entries found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
