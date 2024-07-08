import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { images, icons } from "../../constants";
import CategoryCard from "../../components/CategoryCard";
import { getAllCategoriesEntriesByUserTotalCount } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import AddCategoryModal from "../../components/AddCategoryModal";
import { EmptyState, SearchInput } from "../../components";

const CategoriesScreen = () => {
  const { data: categoriesFetched } = useAppwrite(() =>
    getAllCategoriesEntriesByUserTotalCount()
  );
  const [categories, setCategories] = useState(categoriesFetched);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (categoriesFetched) {
      setCategories(categoriesFetched);
    }
  }, [categoriesFetched]);

  const fetchAllCategories = async () => {
    const getCategories = await getAllCategoriesEntriesByUserTotalCount();
    setCategories(getCategories);
  };

  // function for fetching any changes if modal closes
  const handleModalClose = () => {
    setModalVisible(false);
    fetchAllCategories();
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity>
      <CategoryCard
        name={item.name}
        color={item.color}
        isEditable={item.isEditable}
        entryCount={item.entryCount}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle="flex-1 justify-center flex items-center p-1"
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
        ListHeaderComponent={() => (
          <View className="mt-2 flex flex-col mb-4 px-5">
            <View className="flex flex-row items-center justify-between mt-4">
              <Text className="text-white text-2xl font-bold mt-5 mb-2">
                Categories
              </Text>
              <Image
                source={images.logoSmall}
                className="h-11 w-11"
                resizeMode="contain"
              />
            </View>

            <View className="flex-row justify-between items-center gap-3 flex flex-1 w-full">
              <SearchInput />
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  className="bg-blue-500 p-2 rounded-md"
                >
                  <Image
                    source={icons.add}
                    resizeMode="contain"
                    className="w-7 h-7"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Categories Found"
            subtitle="No journal categories available"
          />
        )}
      />
      <AddCategoryModal visible={modalVisible} onClose={handleModalClose} />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
