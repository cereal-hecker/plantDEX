import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, firebaseConfig, db } from "./firebase";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  getDocs,
  getDoc,
  addDoc,
} from "firebase/firestore";
export default function ReplyScreen({
  route,
  questionReplies,
  addReplyToQuestion,
}) {
  const { question, postID, image } = route.params; // Get the question from the route params
  const user = auth.currentUser;
  // Initialize state for replies
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState(""); // Initialize newReply state
  const handleLoadReplies = async () => {
    const first = query(
      collection(db, "replies"),
      where("postID", "==", postID)
    );
    const documentSnapshots = await getDocs(first);
    var actual = [];
    documentSnapshots.docs.filter((item) => {
      var here = item.data();
      actual.push(here);
    });
    setReplies(actual);
  };
  // Function to add a new reply
  const addReply = async () => {
    if (newReply.trim() !== "") {
      const getRepliesCount = await getDoc(doc(db, "forum", postID));
      const data = getRepliesCount.data();
      console.log(data);
      var repliesC = data["repliesCount"];
      if (repliesC == null) repliesC = 0;
      data["repliesCount"] = repliesC + 1;
      const replyID = `${postID}${repliesC}`;
      const reply = { text: newReply, user: user.displayName, postID: postID }; // You can replace "User XYZ" with the actual username
      try {
        await setDoc(doc(db, "replies", replyID), reply);
        await setDoc(doc(db, "forum", postID), data);
        setReplies([...replies, reply]);
        // Add the reply to the specific question in questionReplies state
        addReplyToQuestion(question, reply);
        setNewReply(""); // Clear the input field
      } catch (e) {
        alert("Sorry, your reply didn't go through!");
        console.log(e.message);
      }
    }
  };

  // Load existing replies for the question
  useEffect(() => {
    handleLoadReplies();
  }, [question, questionReplies]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>{question}</Text>
{      <Image
        source={{ uri: "data:image/png;base64," + image }}
        style={styles.image}
      />}
      <ScrollView style={styles.replyContainer}>
        {replies.map((reply, index) => (
          <View key={index} style={styles.reply}>
            <Text style={styles.replyText}>
              {reply.user}: {reply.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.replyInput}
        placeholder="Add a reply"
        onChangeText={(text) => setNewReply(text)}
        value={newReply}
      />
      <TouchableOpacity style={styles.replyButton} onPress={addReply}>
        <Text style={styles.replyText}>Reply</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  replyContainer: {
    flex: 1,
    marginBottom: 16,
  },
  reply: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 20,
  },
  replyText: {
    fontSize: 14,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 20,
  },
  replyButton: {
    backgroundColor: "#049A10",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 300,
    height: 81,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});
