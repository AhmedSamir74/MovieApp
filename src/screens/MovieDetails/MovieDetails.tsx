import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  LogBox,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import MoviesManager from "../../services/endpoints/moviesManager";
import { theme } from "../../constants";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IMovie } from "../../models";
import { strings } from "../../localization/i18n";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../services/redux/actions";
import AnimatedToast from "../../components/UI/AnimatedToast/AnimatedToast";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import APIKit from "../../services/axios/axios";

LogBox.ignoreLogs(["etting a timer for a long period of time"]);
const LoaderComp = () => {
  return (
    <View style={styles.loaderCont}>
      <ActivityIndicator color={theme.colors.green} size="large" />
    </View>
  );
};

const MovieDetails = (props: any) => {
  let { id } = props.route.params;
  const { navigate, goBack } = useNavigation();
  let animatedToast: any = useRef();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: movie, status, error, isLoading: requestLoading } = useQuery(
    `movieDetails-${id}`,
    async () => {
      let { data: response } = await APIKit.get(`movie/${id}`);
      return response;
    }
  );
  if (status == "error") {
    animatedToast?.showToast(error?.message);
  }

  const {
    data: movieCredits,
    status: creditsStatus,
    error: creditsError,
    isLoading: creditsLoading,
  } = useQuery(`movieCredits-${id}`, async () => {
    let { data: response } = await APIKit.get(`movie/${id}/credits`);
    return response?.cast || [];
  });

  if (creditsStatus == "error") {
    animatedToast?.showToast(creditsError?.message);
  }

  useEffect(() => {
    checkInFavorite();
  }, []);

  const checkInFavorite = async () => {
    let isMovieInFavorites = props.favorites.findIndex(
      (mov: IMovie) => mov.id == id
    );
    if (isMovieInFavorites != -1) {
      setIsFavorite(true);
    }
  };

  const toastFadeAnimation = new Animated.Value(-200);

  const renderAnimatedToast = () => {
    return (
      <Animated.View
        style={[
          styles.toastCont,
          {
            transform: [{ translateY: toastFadeAnimation }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate("Favorites")}
        >
          <View style={styles.touchableOpacity}>
            <View style={styles.toastImageCont}>
              <Image
                source={require("../../assets/images/wh-check.png")}
                style={styles.checkMark}
                resizeMode="contain"
              />
              <Text style={styles.toastText}>{strings("addedToFav")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const showAnimatedToast = () => {
    Animated.timing(toastFadeAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastFadeAnimation, {
          toValue: -200,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  };

  const onFavoritePress = () => {
    setIsFavorite((isFav) => !isFav);
    if (isFavorite) {
      props.removeFromFavorites(movie?.id);
    } else {
      props.addToFavorites(movie);
      showAnimatedToast();
    }
  };
  return (
    <View style={styles.layout}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {renderAnimatedToast()}

      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => goBack()}
        activeOpacity={0.6}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color={theme.colors.black}
          size={40}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backIcon, styles.favIcon]}
        onPress={() => onFavoritePress()}
        activeOpacity={0.6}
      >
        <MaterialCommunityIcons
          name={isFavorite ? "heart" : "heart-outline"}
          color={theme.colors.black}
          size={30}
        />
      </TouchableOpacity>
      {requestLoading ? (
        <LoaderComp />
      ) : (
        movie && (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <View style={styles.imgCont}>
              <Image
                source={{
                  uri: `https://www.themoviedb.org/t/p/w300_and_h300_bestv2/${
                    movie.backdrop_path || movie.poster_path
                  }`,
                }}
                style={styles.characterImg}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.infoCont}>
              {/* TITLE */}
              <Text style={styles.characterName}>{movie.title}</Text>
              <Text style={styles.vote}>
                {((movie.vote_average / 10) * 100).toFixed(0)}%
              </Text>

              {/* DESCRIPTION */}
              {movie.overview ? (
                <View style={styles.sectionCont}>
                  <Text style={styles.sectionTitle}>{strings("overview")}</Text>
                  <Text style={styles.sectionDesc}>{movie.overview}</Text>
                </View>
              ) : null}

              {/* GENERES */}
              {movie.genres ? (
                <View style={styles.sectionCont}>
                  <Text style={styles.sectionTitle}>{strings("genres")}</Text>
                  <View style={styles.genresCont}>
                    {movie.genres.map((value: any) => (
                      <Text style={styles.genres} key={value.id}>
                        {value.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}

              {/* VOTE */}
              {movie.vote_average ? (
                <View style={styles.sectionCont}>
                  <Text style={styles.sectionTitle}>
                    {strings("voteAverage")}
                  </Text>
                  <Text style={styles.sectionDesc}>
                    {movie.vote_average}/10 ({movie.vote_count})
                  </Text>
                </View>
              ) : null}

              {/* CREDITS */}
              {creditsStatus == "success" && movieCredits?.length != 0 && (
                <View style={styles.sectionCont}>
                  <Text style={styles.sectionTitle}>{strings("credits")}</Text>
                  <FlatList
                    horizontal
                    data={movieCredits}
                    renderItem={({ item }: any) => (
                      <View style={styles.creditCont}>
                        <Image
                          source={{
                            uri: `https://www.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`,
                          }}
                          style={styles.creditImg}
                        />
                        <Text style={[styles.sectionDesc, styles.creditName]}>
                          {item.name}
                        </Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => `${index}`}
                    style={styles.creditList}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        )
      )}
      <AnimatedToast onRef={(ref: any) => (animatedToast = ref)} />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  favorites: state.favorites.list,
});

const dispatchToProps = (dispatch: any) => ({
  addToFavorites: (movie: IMovie) => dispatch(addToFavorite(movie)),
  removeFromFavorites: (id: number) => dispatch(removeFromFavorite(id)),
});

export default connect(mapStateToProps, dispatchToProps)(MovieDetails);
