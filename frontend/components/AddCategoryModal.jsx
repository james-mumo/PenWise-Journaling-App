import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createCategory } from "../lib/appwrite";

const AddCategoryModal = ({ visible, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("red-500");
  const [isEditable, setIsEditable] = useState(true);

  // function to call the create category function
  const handleAddCategory = async () => {
    const newCategory = {
      name: categoryName,
      color: categoryColor,
      isEditable,
    };

    try {
      await createCategory(newCategory);
      console.log(newCategory);
      Alert.alert("Success", "New category added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[#04202777] bg-opacity-50">
        <View className="bg-gray-800 w-4/5 p-5  border border-yellow-500 border-opacity-70 rounded-md">
          <Text className="text-xl text-yellow-600 font-psemibold mb-2">
            New Category
          </Text>
          <TextInput
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
            className="border p-2 mb-4 rounded text-white border-yellow-600"
          />

          <Text className="text-yellow-600 font-psemibold px-1">
            Category Color
          </Text>
          <View className="border p-2 border-yellow-600 mb-4 rounded">
            <Picker
              selectedValue={categoryColor}
              onValueChange={(itemValue) => setCategoryColor(itemValue)}
              style={{
                height: 200,
                width: "100%",
                backgroundColor: "#2C2C39",
                color: "#FFFFFF",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#00000033",
                marginBottom: 10,
                paddingHorizontal: 1,
              }}
              itemStyle={{
                fontSize: 16,
                fontWeight: "500",
                color: "#FFFFFF",
              }}
            >
              <Picker.Item label="Red" value="#ff3300" />
              <Picker.Item label="Blue" value="#3333ff" />
              <Picker.Item label="Green" value="#009933" />
              <Picker.Item label="Yellow" value="#ff9900" />
              <Picker.Item label="Purple" value="#9966ff" />
              <Picker.Item label="Teal" value="#339966" />
            </Picker>
          </View>

          <View className="flex border-yellow-600 border p-2 rounded-md flex-row justify-between items-center mb-4">
            <Text className="text-yellow-600">Editable</Text>
            <Switch value={isEditable} onValueChange={setIsEditable} />
          </View>

          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={onClose}
              className=" bg-red-500 p-2 rounded-md"
            >
              <Text className=" text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddCategory}
              className="bg-yellow-600 p-2 rounded-md"
            >
              <Text className="text-primary font-psemibold px-3">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;
