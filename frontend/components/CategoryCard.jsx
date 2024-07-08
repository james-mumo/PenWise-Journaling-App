import { images } from "@/constants";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const CategoryCard = ({ id, entryCount, name, color, isEditable }) => {
  var bgColors = color;

  return (
    <TouchableOpacity
      className="flex-row flex mt-1 w-40 overflow-hidden flex-1 rounded-lg mb-4 shadow-md"
      style={{
        backgroundColor: bgColors,
        borderColor: bgColors,
        borderWidth: 1,
      }}
    >
      <View className="bg-yellow-400 overflow-hidden rounded-l-md  p-1 h-max"></View>
      <View className="overflow-hidden flex items-center justify-center rounded-l-md  p-1 h-max">
        <Image
          source={images.logoSmall}
          className="h-12 w-12"
          resizeMode="contain"
        />
      </View>

      <View className="ml-1 my-4">
        <Text className="text-white font-psemibold text-xl">{name}</Text>
        <Text className="text-white opacity-75 text-lg">{entryCount}</Text>
        {isEditable && (
          <Text className="text-white font-bold bg-red-600 text-xs px-2 py-1 mt-1 rounded">
            Editable
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
