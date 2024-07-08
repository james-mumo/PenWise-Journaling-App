import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import {
  getUserPosts,
  signOut,
  getAllJournalEntriesByUser,
  getAllCategoriesEntriesByUser,
  getCurrentUser,
} from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, JournalEntryCard } from "../../components";
import FormField from "../../components/FormField";
import { useState } from "react";
import { updateUserDetails } from "../../lib/appwrite";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getAllJournalEntriesByUser());
  const { data: categories } = useAppwrite(() =>
    getAllCategoriesEntriesByUser()
  );

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // function to handle updating of user details
  const handleUpdateDetails = async () => {
    try {
      await updateUserDetails(
        currentPassword,
        newPassword,
        user.email,
        user.username
      );
      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordFields(false);
      const result = await getCurrentUser();
      setUser(result);
      Alert.alert("Success", "User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error.message);
      Alert.alert("Error", "Failed to update user details");
    }
  };

  // function to call the signout method
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex flex-row justify-between items-center mb-4">
            <View className="flex flex-row flex-1 items-center">
              <Image
                source={icons.profile_}
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />
              <View className="flex-1 ml-2">
                <Text className="text-yellow-400 font-semibold text-xl">
                  Hello
                </Text>
                <Text className="text-yellow-400 capitalize font-semibold text-3xl">
                  {user?.username}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-12 h-12"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between border border-yellow-500 rounded-lg p-4 mb-4">
            <InfoBox
              title={posts.length || 0}
              subtitle="Entries"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox
              title={categories.length || 0}
              subtitle="Categories"
              titleStyles="text-xl"
            />
            <View className="flex justify-center items-center border-yellow-500 border flex-1 ml-3">
              <Text className="text-yellow-400 capitalize font-semibold text-3xl">
                PenWise ©
              </Text>
            </View>
          </View>

          <View className="bg-black-100 rounded-lg border-yellow-500 border border-opacity-20 p-4">
            <FormField
              title="Username"
              value={user?.username}
              placeholder="Enter your username"
              handleChangeText={(text) => setUser({ ...user, username: text })}
              otherStyles="mb-4"
            />
            <FormField
              title="Email"
              value={user?.email}
              placeholder="Enter your email"
              handleChangeText={(text) => setUser({ ...user, email: text })}
              otherStyles="mb-4"
            />

            {showPasswordFields && (
              <>
                <FormField
                  title="Current Password"
                  value={currentPassword}
                  placeholder="Enter your current password"
                  handleChangeText={setCurrentPassword}
                  otherStyles="mb-4"
                  secureTextEntry
                />
                <FormField
                  title="New Password"
                  value={newPassword}
                  placeholder="Enter new password"
                  handleChangeText={setNewPassword}
                  otherStyles="mb-4"
                  secureTextEntry
                />
              </>
            )}

            <View className="rounded-lg py-2 items-center justify-center">
              {showPasswordFields ? (
                <View className="rounded-lg gap-2 py-2 w-full items-center justify-center">
                  <TouchableOpacity
                    onPress={handleUpdateDetails}
                    className="bg-yellow-500 w-full flex flex-1 rounded-lg py-2 items-center justify-center"
                  >
                    <Text className="text-gray-700 text-xl font-psemibold">
                      Update
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowPasswordFields(false)}
                    className="bg-red-500 w-1/2 flex flex-1 rounded-lg py-1 items-center justify-center"
                  >
                    <Text className="text-gray-300 text-lg font-psemibold">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="rounded-lg border py-0 w-full items-center justify-center">
                  <TouchableOpacity
                    onPress={() => setShowPasswordFields(true)}
                    className="bg-yellow-500 w-full flex flex-1 rounded-lg py-2 items-center justify-center"
                  >
                    <Text className="text-gray-700 text-xl font-psemibold">
                      Update Details?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
