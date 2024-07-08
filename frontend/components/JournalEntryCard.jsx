import React from "react";
import { View, Text, Image } from "react-native";
import { useDateFormatter } from "@/hooks/useDateFormatter";

const JournalEntryCard = ({
  id,
  title,
  content,
  date,
  userId,
  category,
  categoryColor,
  icon,
}) => {
  const { formatDate } = useDateFormatter();

  return (
    <View
      className="mb-3 px-4 flex flex-row bg-gray-800 rounded-md mx-2 p-2"
      style={{
        borderColor: categoryColor,
        borderWidth: 1,
      }}
    >
      <View
        style={{ backgroundColor: categoryColor }}
        className="flex p-3 -mt-2 -ml-2 rounded-l -mb-2 text-sm opacity-60 flex-row justify-between font-psemibold"
      ></View>
      <View className="flex flex-1 text-sm opacity-60 flex-col justify-between font-psemibold">
        <View className="flex flex-1 text-sm opacity-60 flex-row justify-between font-psemibold">
          <Text className="text-xl text-yellow-100 font-psemibold mb-1 ml-4">
            {category}
          </Text>
          <Text className="text-sm text-yellow-100">{formatDate(date)}</Text>
        </View>
        <View className="flex-row items-center mb-1 ml-2">
          <Image
            source={icon}
            style={{ borderColor: categoryColor }}
            className="rounded-full border-2 w-14 h-14"
          />
          <View className="ml-2.5 flex flex-row justify-between flex-1 border-opacity-50 rounded-sm px-1 py-2 font-psemibold">
            <Text className="text-xl font-semibold text-white">{title}</Text>
          </View>
        </View>

        <View className="flex-row items-center mb-1">
          <Text className="text-white bg-gray-700 flex flex-1 rounded-sm max-h-20 overflow-y-scroll p-1 mt-0.5">
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JournalEntryCard;
