import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
require('firebase/firestore');

import { userActions } from '../../redux/actions';

import { handleUserPosts } from '../../utility';

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const { fetchUserPosts, fetchUser, fetchUserFollowers } = bindActionCreators(
    userActions,
    dispatch
  );

  const { posts, currentUser, followers } = useSelector(
    (state) => state.userState
  );

  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  const userProfile = props.route.params.user;
  const isCurrentUser = userProfile.id === firebase.auth().currentUser.uid;

  const initial = async () => {
    setUser(isCurrentUser ? currentUser : userProfile);

    const currentPosts = isCurrentUser
      ? posts
      : await handleUserPosts(userProfile.id);

    setUserPosts(currentPosts);
  };

  const handleFollowing = (isFollow) => {
    if (isFollow) {
      firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(userProfile.id)
      .delete();

      return;
    }

    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(userProfile.id)
      .set({});   
  };

  const handleLogOut = () => firebase.auth().signOut();

  useEffect(() => {
    fetchUser();
    fetchUserPosts();
    fetchUserFollowers();
    initial();
  }, [userProfile]);

  useEffect(() => {
    setIsFollowing(followers.includes(userProfile.id));
  }, [followers]);

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

        {isCurrentUser ? (
          <Button title='Logout' onPress={handleLogOut} />
        ) : (
          <View>
           <Button title={ isFollowing ? 'Following' : 'Follow'} onPress={() => handleFollowing(isFollowing)} />
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
