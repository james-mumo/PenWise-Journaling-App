import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";

import useCategories from "../../hooks/useCategories";

import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createJournalEntry } from "../../lib/appwrite";
import FormContentField from "../../components/FormContentField";

const Categories = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    date: new Date(),
    image: null,
    category_id: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const categories = useCategories();

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled) {
      setForm({
        ...form,
        thumbnail: result.assets[0],
      });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (form.title === "" || form.content === "") {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createJournalEntry({
        ...form,
        userId: user.id,
      });
      Alert.alert("Success", "Journal entry created successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        content: "",
        date: new Date(),
        image: null,
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="px-5 mt-2 flex-col flex">
        <View className="flex flex-row items-center justify-between mt-4">
          <Text className="text-white text-2xl font-bold mt-5 mb-2">
            Add Journal Item
          </Text>
          <Image
            source={images.logoSmall}
            className="h-11 w-11"
            resizeMode="contain"
          />
        </View>

        <Text className="text-lg text-yellow-500 font-psemibold">
          Create Journal Entry
        </Text>
        <View className="border-1 border p-3 rounded-md overflow-hidden border-opacity-70 border-yellow-500">
          <FormField
            title="Title"
            value={form.title}
            placeholder="Enter the title of your journal entry..."
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-2"
          />

          <FormContentField
            title="Content"
            value={form.content}
            placeholder="Enter the content of your journal entry..."
            handleChangeText={(e) => setForm({ ...form, content: e })}
            otherStyles="mt-2"
            multiline
          />

          <View style={{ marginTop: 7 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#CCC",
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              Select Category
            </Text>
            <Picker
              selectedValue={form.category}
              onValueChange={(itemValue, itemIndex) =>
                setForm({ ...form, category_id: itemValue })
              }
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
              {categories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Picker>
          </View>

          <View className="mt-2 space-y-1">
            <Text className="text-base text-gray-100 font-pmedium">
              Date & Time
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Text className="text-sm text-gray-100 font-pmedium">
                  {form.date.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={form.date}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || form.date;
                  setShowDatePicker(false);
                  if (currentDate <= new Date()) {
                    setForm({ ...form, date: currentDate });
                  } else {
                    Alert.alert("Error", "Date and time must be in the past");
                  }
                }}
              />
            )}
          </View>

          <View className="mt-1 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Attach Media
            </Text>

            <TouchableOpacity onPress={() => openPicker()}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Submit"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
