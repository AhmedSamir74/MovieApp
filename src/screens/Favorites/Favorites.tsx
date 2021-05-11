import React, { Component } from "react";
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import { theme } from "../../constants";
import { IMovie } from "../../models";
import { MovieCard } from "../../components";
import { Searchbar } from "react-native-paper";
import { connect } from "react-redux";
import { strings } from "../../localization/i18n";
import { removeFromFavorite } from "../../services/redux/actions";

class FavoritesScreen extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  state = {
    searchQuery: "",
  };

  onChangeSearch(searchQuery: string) {
    this.setState({ searchQuery });
  }

  onFavoritePress(movie: IMovie) {
    Alert.alert(strings("appName"), strings("deleteHint"), [
      {
        text: strings("cancel"),
        style: "cancel",
      },
      {
        text: strings("confirm"),
        onPress: () => this.props.removeFromFavorites(movie.id),
      },
    ]);
  }

  emptyListComp() {
    return (
      <View style={styles.emptyListCont}>
        <Image
          source={require("../../assets/images/empty_fav.png")}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyListTitle}>{strings("favListEmpty")}</Text>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.addLabelStyle}>
            {strings("startAddingNow").toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.layout}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeSearch.bind(this)}
          value={this.state.searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
          placeholderTextColor={theme.colors.lightGrey}
          iconColor={theme.colors.lightGrey}
        />
        <FlatList
          data={this.props.favorites.filter((movie: IMovie) =>
            movie.title
              .toLowerCase()
              .includes(this.state.searchQuery.toLowerCase())
          )}
          renderItem={({ item }: { item: IMovie }) => (
            <MovieCard
              item={item}
              favoriteCard
              onFavIconPress={this.onFavoritePress.bind(this, item)}
              searchWords={this.state.searchQuery}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={this.emptyListComp.bind(this)}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  favorites: state.favorites.list,
});

const dispatchToProps = (dispatch: any) => ({
  removeFromFavorites: (id: number) => dispatch(removeFromFavorite(id)),
});
export default connect(mapStateToProps, dispatchToProps)(FavoritesScreen);
