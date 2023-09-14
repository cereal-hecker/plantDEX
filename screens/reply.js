import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ReplyScreen({ route, questionReplies, addReplyToQuestion }) {
  const { question } = route.params; // Get the question from the route params

  // Initialize state for replies
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState(""); // Initialize newReply state

  // Function to add a new reply
  const addReply = () => {
    if (newReply.trim() !== "") {
      const reply = { text: newReply, user: "Me" }; // You can replace "User XYZ" with the actual username
      setReplies([...replies, reply]);

      // Add the reply to the specific question in questionReplies state
      addReplyToQuestion(question, reply);

      setNewReply(""); // Clear the input field
    }
  };

  // Load existing replies for the question
  useEffect(() => {
    if (questionReplies[question]) {
      setReplies(questionReplies[question]);
    }
  }, [question, questionReplies]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>{question}</Text>
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
  buttonText: {
    color: "white",
    fontFamily: 'Poppins_500Medium'
  },
});
