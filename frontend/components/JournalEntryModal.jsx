import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { updateJournalEntry, deleteJournalEntry } from "../lib/appwrite";
import { useDateFormatterToLocaleString } from "../hooks/useDateTime";

const JournalEntryModal = ({ visible, entry, closeModal }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(entry?.title);
  const [updatedContent, setUpdatedContent] = useState(entry?.content);
  console.log(entry);
  const formattedDate = useDateFormatterToLocaleString();

  const clearState = () => {
    setUpdatedTitle("");
    setUpdatedContent("");
  };

  // Function to call the updateJournalEntry data
  const handleUpdate = () => {
    console.log(entry);
    const updatedData = {
      title: updatedTitle || entry.title,
      content: updatedContent || entry.content,
      categoryId: entry?.category_id,
      date: entry.date,
    };

    updateJournalEntry(entry.id, updatedData)
      .then(() => {
        console.log("Entry updated successfully");
        setEditing(false);
        Alert.alert("Success", "Successfully Updated Item");
        clearState();
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating entry:", error);
        clearState();
        closeModal();
        Alert.alert(
          "Error",
          "Failed to update journal entry. Please try again later."
        );
      });
  };

  // fnction to call the deleteJournal entry method
  const handleDelete = async () => {
    try {
      await deleteJournalEntry(entry.id);
      Alert.alert("Success", "Successfully Deleted Item");
      clearState();
      closeModal();
    } catch (error) {
      console.error("Error deleting entry:", error);
      Alert.alert(
        "Error",
        "Failed to delete journal entry. Please try again later."
      );
      closeModal();
    }
  };

  if (!entry) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center bg-[#053652a1] bg-opacity-50">
        <View
          style={{ borderColor: entry.categoryColor }}
          className="bg-gray-800 border  w-4/5 p-5 rounded-md"
        >
          <View className="flex mt-10 text-sm opacity-60 flex-row justify-between font-psemibold">
            <Text className="text-lg text-yellow-400 font-psemibold mb-1 ml-1">
              {entry.categoryName}
            </Text>
            <Text className="text-sm text-yellow-400">
              {formattedDate(entry.date)}
            </Text>
          </View>
          {editing ? (
            <View className="">
              <Text className="text-teal-400 text-xl">Update Entry Header</Text>
              <TextInput
                className="text-lg border text-white border-gray-400 p-2 mb-4"
                value={updatedTitle}
                onChangeText={setUpdatedTitle}
              />
              <Text className="text-teal-400 text-xl">
                Update Entry Content
              </Text>
              <TextInput
                value={updatedContent}
                onChangeText={setUpdatedContent}
                multiline
                className="border  text-white border-gray-400 p-2 mb-4 h-24"
              />

              <TouchableOpacity
                className="mb-5 h-12 bg-emerald-500 flex items-center justify-center rounded-md"
                onPress={handleUpdate}
                style={{ borderColor: entry.categoryColor, borderWidth: 1 }}
              >
                <Text className="text-white text-xl font-psemibold ">
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className="flex flex-1 text-sm opacity-60 flex-row justify-between font-psemibold">
                <Text className="text-sm text-yellow-400 opacity-60 font-psemibold mb-1 ml-2">
                  {entry.categoryName}
                </Text>
                <Text className="text-sm text-yellow-400">{entry.date}</Text>
              </View>
              <Text
                style={{
                  color: entry?.categoryColor,
                }}
                className="text-xl font-semibold text-white"
              >
                {entry.title}
              </Text>

              <View className="h-32">
                <Text className="text-white bg-gray-750 flex flex-1 rounded-sm overflow-y-scroll opacity-70 py-1 mt-0.5">
                  {entry.content}
                </Text>
              </View>
            </>
          )}
          {editing ? (
            <TouchableOpacity
              className="bg-red-600 h-10 flex items-center justify-center rounded-md"
              onPress={() => setEditing(false)}
            >
              <Text className="font-psemibold text-white text-xl">Cancel</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setEditing(true)}
                className="bg-emerald-600 px-10 py-4 rounded-md"
              >
                <Text className="text-xl font-psemibold text-white">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-600 px-10 py-4 rounded-md"
              >
                <Text className="text-xl font-psemibold text-white">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            className="absolute right-5 px-5 py-2 rounded-md top-5 bg-yellow-700"
            onPress={() => {
              closeModal();
              clearState();
            }}
            style={{ borderColor: entry.categoryColor, borderWidth: 1 }}
          >
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default JournalEntryModal;
