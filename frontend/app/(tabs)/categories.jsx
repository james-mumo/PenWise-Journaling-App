import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { icons } from "../../constants";
import CategoryCard from "../../components/CategoryCard";
import { getAllCategoriesEntriesByUser } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import AddCategoryModal from "../../components/AddCategoryModal";

const CategoriesScreen = () => {
  const {
    data: categories,
    refetch,
    loading,
    error,
  } = useAppwrite(() => getAllCategoriesEntriesByUser());

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      await refetch();
    };

    if (modalVisible) {
      fetchCategories();
    }
  }, [modalVisible, refetch]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity>
      <CategoryCard
        name={item.name}
        icon={item.icon}
        color={item.color}
        isEditable={item.isEditable}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900 p-4">
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle="flex-1 justify-between p-3"
        ListHeaderComponent={() => (
          <View className="px-4 flex-1">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <TextInput
                  className="ml-2 px-3 py-2 bg-white rounded-full w-4/5"
                  placeholder="Search categories..."
                />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-blue-500 p-2 rounded-md"
              >
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-white text-center">Add Category</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-white text-2xl font-bold mt-5 mb-2">
              Categories
            </Text>
          </View>
        )}
      />
      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
