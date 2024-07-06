import { Link, Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5 bg-primary">
        <Text className="text-3xl font-bold text-center text-white">
          Page Not Found
        </Text>
        <Text className="mt-4 text-lg text-center text-gray-300">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Link
          href="/"
          className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
        >
          <Text className="text-lg">Go to Home</Text>
        </Link>
      </View>
    </>
  );
}
