import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import QuestionCard from "../components/questionCard";
import ReplyScreen from "./reply"; // Import the ReplyScreen component
import gotQuestions from "../assets/data/questions";
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
  getDocs,
  getDoc,
} from "firebase/firestore";

const Stack = createStackNavigator();

export default function Forum() {
  const [questionReplies, setQuestionReplies] = useState({});
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSendButtonVisible, setSendButtonVisible] = useState(false);
  const rotateValue = new Animated.Value(0); // Initialize the animated value

  const onChangeSearch = (text) => {
    setSearch(text);
    const ArrQuestions = [...questions];

    const filtered = ArrQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(text.toLowerCase()) ||
        item.answer.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  const toggleSendButton = () => {
    let targetValue = !isSendButtonVisible ? 45 : 0;

    Animated.timing(rotateValue, {
      toValue: targetValue,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false, // Set useNativeDriver to false
    }).start();

    setSendButtonVisible(!isSendButtonVisible);
  };

  const postQuestion = async () => {
    if (user.displayName == null) {
      alert(
        "You need a display name before you can make a post\n\nPlease head to the profile section update it!"
      );
    } else {
      var getPostCount = await getDoc(doc(db, "user", user.uid));
      var postC = 0;
      if (getPostCount.exists()) {
        getPostCount = getPostCount.data();
        postC = getPostCount["postCount"];
      } else {
        await setDoc(doc(db, "user", user.uid), { postCount: postC });
      }
      const postID = `${user.uid}${postC}`;
      const newQuestionData = {
        id: postID,
        date: Math.floor(Date.now() / 1000),
        profile: user.photoURL,
        authorUUID: user.uid,
        username: user.displayName,
        question: newQuestion,
        answer: "",
        replies: 0,
      };
      try {
        await setDoc(doc(db, "forum", postID), newQuestionData);
        await setDoc(doc(db, "user", user.uid), {
          postCount: postC + 1,
        });
        alert("Post sent successfully!");
      } catch (e) {
        alert("Error adding post!");
        console.log(e.message);
      }
      setNewQuestion("");
      getQuestions();
    }
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 45],
    outputRange: ["0deg", "45deg"],
  });

  const addReplyToQuestion = (questionId, reply) => {
    setQuestionReplies((prevReplies) => ({
      ...prevReplies,
      [questionId]: [...(prevReplies[questionId] || []), reply],
    }));
  };

  const getQuestions = async () => {
    const first = query(
      collection(db, "forum"),
      orderBy("date", "desc"),
      limit(5)
    );
    const documentSnapshots = await getDocs(first);
    var actual = [];
    documentSnapshots.docs.filter(async (item) => {
      var here = item.data();
      actual.push(here);
    });
    setQuestions([...actual]);
    setFilteredQuestions([...actual]);
    return actual;
  };

  const user = auth.currentUser;

  // Place to fuk with starts

  useEffect(() => {
    getQuestions();
  }, []);
  // Place to fuk with ends
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="QuestionList">
        <Stack.Screen options={{ headerShown: false }} name="QuestionList">
          {(props) => (
            <QuestionListScreen
              {...props}
              questionReplies={questionReplies}
              search={search}
              filteredQuestions={filteredQuestions}
              setSearch={setSearch}
              onChangeSearch={onChangeSearch}
              toggleSendButton={toggleSendButton}
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
              isSendButtonVisible={isSendButtonVisible}
              postQuestion={postQuestion}
              rotate={rotate}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="ReplyScreen">
          {(props) => (
            <ReplyScreen
              {...props}
              questionReplies={questionReplies}
              addReplyToQuestion={addReplyToQuestion}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function QuestionListScreen({
  navigation,
  search,
  filteredQuestions,
  setSearch,
  onChangeSearch,
  toggleSendButton,
  newQuestion,
  setNewQuestion,
  isSendButtonVisible,
  postQuestion,
  rotate,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>FORUM</Text>
      <View style={styles.searchbarContainer}>
        <TextInput
          onChangeText={onChangeSearch}
          placeholder="Are my potatoes dying?"
          value={search}
          placeholderTextColor="#F2F2F2"
          style={styles.searchbar}
        />
        <ScrollView contentContainerStyle={styles.content}>
          {filteredQuestions &&
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                username={question.username}
                date={question.date}
                question={question.question}
                answer={question.answer}
                onCardPress={() =>
                  navigation.navigate("ReplyScreen", {
                    question: question.question,
                    postID: question.id,
                  })
                }
              />
            ))}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
      <View style={styles.centeredContent}>
        {isSendButtonVisible && (
          <TextInput
            style={styles.newQuestionInput}
            placeholder="Ask a question"
            placeholderTextColor="#F2F2F2"
            value={newQuestion}
            onChangeText={(text) => setNewQuestion(text)}
          />
        )}
        <View style={styles.buttonContainer}>
          {isSendButtonVisible && (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={postQuestion}
              disabled={newQuestion.trim() === ""}
            >
              <Image
                style={styles.send}
                source={require("../assets/images/send.png")}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.plusButton}
            onPress={toggleSendButton}
          >
            <Animated.Image
              style={[styles.plus, { transform: [{ rotate: rotate }] }]}
              source={require("../assets/images/plus.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  bottomSpacing: {
    height: 250,
  },
  header: {
    fontFamily: "Poppins_900Black",
    fontSize: 64,
    color: "#049A10",
    marginTop: "4%",
  },
  inputStyle: {
    color: "white",
  },
  searchbar: {
    backgroundColor: "rgba(4, 154, 16, 0.5)",
    marginBottom: "4%",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderRadius: 50,
    width: 320,
    height: 50,
    justifyContent: "center",
    marginTop: "-2%",
    paddingLeft: 20,
    color: "white",
  },
  inputContainer: {
    backgroundColor: "transparent",
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  centeredContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "0.5%",
    right: "0%",
    gap: 10,
  },
  newQuestionInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#75C07C",
    color: "white",
  },
  plusButton: {
    backgroundColor: "#049A10",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    width: 35,
    height: 35,
  },
  send: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#049A10",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
  },
  quesinput: {
    color: "white",
  },
});
