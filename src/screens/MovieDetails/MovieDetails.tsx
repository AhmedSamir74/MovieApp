import React, { Component } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
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
import { Card } from "../../components/UI";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../services/redux/actions";
import AnimatedToast from "../../components/UI/AnimatedToast/AnimatedToast";

const LoaderComp = () => {
  return (
    <View style={styles.loaderCont}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
};

class MovieDetails extends Component<any> {
  moviesManager: MoviesManager;
  toastFadeAnimation: Animated.Value;
  animatedToast: any;

  state: {
    requestLoading: boolean;
    movie: IMovie | null;
    isFavorite: boolean;
    movieCredits: [];
  };
  constructor(props: any) {
    super(props);
    this.moviesManager = new MoviesManager();
    this.toastFadeAnimation = new Animated.Value(-200);

    this.state = {
      requestLoading: true,
      movie: null,
      isFavorite: false,
      movieCredits: [],
    };
  }

  componentDidMount() {
    this.getMovieDetails();
    this.getMovieCredits();
  }

  async getMovieDetails() {
    let { id } = this.props.route.params;
    const { status, data } = await this.moviesManager.getMovieDetails(id);

    if (status) {
      this.setState({
        movie: data,
        requestLoading: false,
      });
    } else {
      this.setState({
        movie: [],
        requestLoading: false,
      });
      this.animatedToast.showToast(data);
    }
    let isMovieInFavorites = this.props.favorites.findIndex(
      (movie: IMovie) => movie.id == id
    );
    if (isMovieInFavorites != -1) {
      this.setState({ isFavorite: true });
    }
  }
  async getMovieCredits() {
    let { id } = this.props.route.params;
    const { status, data } = await this.moviesManager.getMovieCredits(id);

    if (status) {
      this.setState({
        movieCredits: data,
        requestLoading: false,
      });
    } else {
      this.setState({
        movieCredits: [],
        requestLoading: false,
      });
      this.animatedToast.showToast(data);
    }
    let isMovieInFavorites = this.props.favorites.findIndex(
      (movie: IMovie) => movie.id == id
    );
    if (isMovieInFavorites != -1) {
      this.setState({ isFavorite: true });
    }
  }

  showAnimatedToast() {
    Animated.timing(this.toastFadeAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(this.toastFadeAnimation, {
          toValue: -200,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  }

  onFavoritePress() {
    this.setState({ isFavorite: !this.state.isFavorite });
    if (this.state.isFavorite) {
      this.props.removeFromFavorites(this.state.movie?.id);
    } else {
      this.props.addToFavorites(this.state.movie);
      this.showAnimatedToast();
    }
  }

  renderAnimatedToast() {
    return (
      <Animated.View
        style={[
          styles.toastCont,
          {
            transform: [{ translateY: this.toastFadeAnimation }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation?.navigate("Favorites")}
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
  }
  render() {
    const { movie, requestLoading, movieCredits } = this.state;
    return (
      <View style={styles.layout}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {this.renderAnimatedToast()}

        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.props.navigation.goBack()}
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
          onPress={() => this.onFavoritePress()}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name={this.state.isFavorite ? "heart" : "heart-outline"}
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
                    <Text style={styles.sectionTitle}>
                      {strings("overview")}
                    </Text>
                    <Text style={styles.sectionDesc}>{movie.overview}</Text>
                  </View>
                ) : null}

                {/* GENERES */}
                {movie.genres ? (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>{strings("genres")}</Text>
                    <View style={styles.genresCont}>
                      {movie.genres.map((value) => (
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
                {movieCredits.length != 0 && (
                  <View style={styles.sectionCont}>
                    <Text style={styles.sectionTitle}>
                      {strings("credits")}
                    </Text>
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
        <AnimatedToast onRef={(ref: any) => (this.animatedToast = ref)} />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  favorites: state.favorites.list,
});

const dispatchToProps = (dispatch: any) => ({
  addToFavorites: (movie: IMovie) => dispatch(addToFavorite(movie)),
  removeFromFavorites: (id: number) => dispatch(removeFromFavorite(id)),
});

export default connect(mapStateToProps, dispatchToProps)(MovieDetails);
