import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "firebase";
require("firebase/firestore");

import { userActions } from "../../redux/actions";

import { handleUserPosts } from "../../utility";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const { fetchUserPosts, fetchUser } = bindActionCreators(
    userActions,
    dispatch
  );
  const { posts, currentUser } = useSelector((state) => state.userState);

  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({});
  const [ isFollowing, setIsFollowing] = useState(false);
  
  const isCurrentUser = userProfile.uid === firebase.auth().currentUser.uid;

  const initial = async () => {
    const userProfile = props.route.params.user;
    
    setUser(isCurrentUser ? currentUser : userProfile);

    const currentPosts = isCurrentUser
      ? posts
      : await handleUserPosts(userProfile.uid);

    setUserPosts(currentPosts);
  };

  useEffect(() => {
    fetchUser();
    fetchUserPosts();
    initial();
  }, [props.route.params.user]);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        
        { isCurrentUser ? (
          <Button title="Logout"  />
        ) : (
          <View>
            {isFollowing ? (
              <Button title="Following" />
            ) : (
              <Button title="Follow" />
            )}
          </View>
        )}
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: item.downloadURL,
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 2,
    aspectRatio: 1 / 1,
  },
});

export default ProfileScreen;
