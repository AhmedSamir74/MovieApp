import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { styles } from "./style";
import MoviesManager from "../../services/endpoints/moviesManager";
import { theme } from "../../constants";
import { CategoryCard, MovieCard } from "../../components";
import { throttle } from "lodash";
import { ICategory, IMovie } from "../../models";
import AnimatedToast from "../../components/UI/AnimatedToast/AnimatedToast";
import { MOVIES_CATEGORIES } from "../../constants/moviesCategories";

const NUM_OF_MOVIES_PER_SCREEN = 8;
class HomeScreen extends Component<any> {
  moviesManager: MoviesManager;
  handleSearchThrottled: any;
  animatedToast: any;
  constructor(props: any) {
    super(props);
    this.moviesManager = new MoviesManager();
    this.handleSearchThrottled = throttle(this.getMovies, 1000).bind(this);
  }

  state = {
    movies: [],
    refreshing: false,
    requestLoading: true,
    currentPage: 1,
    pages: 0,
    activeCategory: 1,
  };

  componentDidMount() {
    this.getMovies(this.state.currentPage);
  }

  async getMovies(pageNum: number, isRefresh?: boolean) {
    if (isRefresh) {
      this.setState({ refreshing: true });
    }

    let listValue = MOVIES_CATEGORIES.filter(
      (category) => category.key == this.state.activeCategory
    )[0]?.value;
    const {
      status,
      data,
      page,
      pages,
    } = await this.moviesManager.getMoviesList(listValue, pageNum);
    if (status) {
      this.setState((prevState: any, props) => ({
        movies: pageNum == 1 ? data : [...prevState.movies, ...data],
        requestLoading: false,
        refreshing: false,
        currentPage: page,
        pages,
      }));
    } else {
      this.setState({ movies: [], requestLoading: false, refreshing: false });
      this.animatedToast.showToast(data);
    }
  }

  render() {
    return (
      <View style={styles.layout}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.white}
          translucent
        />
        <FlatList
          horizontal
          data={MOVIES_CATEGORIES}
          renderItem={({ item }: { item: ICategory }) => (
            <CategoryCard
              item={item}
              activeCategory={this.state.activeCategory}
              onCategoryPress={() => {
                if (this.state.activeCategory != item.key) {
                  this.setState(
                    { requestLoading: true, activeCategory: item.key },
                    () => this.getMovies(1, true)
                  );
                }
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: ICategory) => `${item.key}`}
          style={styles.categoryList}
        />
        {this.state.requestLoading ? (
          <View style={styles.activityIndicatorCont}>
            <ActivityIndicator size="large" color={theme.colors.green} />
          </View>
        ) : (
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.getMovies(1, true)}
            data={this.state.movies}
            renderItem={({ item }: { item: IMovie }) => (
              <MovieCard item={item} />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={() => this.getMovies(this.state.currentPage + 1)}
            onEndReachedThreshold={0.3}
            ListFooterComponent={() =>
              this.state.movies.length > NUM_OF_MOVIES_PER_SCREEN ? (
                <View style={styles.footerCont}>
                  <ActivityIndicator size="small" color={theme.colors.green} />
                </View>
              ) : null
            }
            keyExtractor={(item) => `${item.id}`}
          />
        )}
        <AnimatedToast onRef={(ref: any) => (this.animatedToast = ref)} />
      </View>
    );
  }
}

export default HomeScreen;
