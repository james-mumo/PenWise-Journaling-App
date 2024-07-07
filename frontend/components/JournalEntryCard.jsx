import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { useDateFormatter } from "@/hooks/useDateFormatter";

const JournalEntryCard = ({ id, title, content, date, userId }) => {
  const { formatDate } = useDateFormatter(); // Use the custom hook

  return (
    <View className="mb-3 px-4 bg-gray-800 mx-2 rounded-sm p-2">
      <View className="flex flex-1 text-sm opacity-60 flex-row justify-between font-psemibold">
        <Text className="text-sm text-gray-400 font-psemibold">Category</Text>
        <Text className="text-sm text-gray-400">{formatDate(date)}</Text>
      </View>
      <View className="flex-row items-center mb-1">
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${userId}` }}
          className="rounded-full border-2 border-yellow-500 w-12 h-14"
        />
        <View className="ml-2.5 flex flex-row justify-between flex-1 border border-yellow-600 rounded-md">
          <Text className="text-lg font-semibold text-white">{title}</Text>
        </View>
        {/* <TouchableOpacity className="absolute right-0">
          <Image source={icons.menu} className="w-5 h-5" />
        </TouchableOpacity> */}
      </View>

      <View className="flex-row items-center mb-1">
        <Text className="text-white bg-gray-700 flex flex-1 rounded-sm max-h-9 overflow-y-scroll p-1 mt-0.5">
          {content}
        </Text>
      </View>
    </View>
  );
};

export default JournalEntryCard;
