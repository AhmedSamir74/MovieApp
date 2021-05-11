import { useNavigation } from "@react-navigation/native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, View } from "react-native";
import { theme } from "../../constants";
import { IMovie } from "../../models";
import { Card } from "../UI";
import { styles } from "./style";
import Highlighter from "react-native-highlight-words";

const dateFormatter = (date: string | number | Date) => {
  let dateInstance = new Date(date);
  return dateInstance.toDateString();
};
export const MovieCard = ({
  item: movie,
  favoriteCard,
  onFavIconPress,
  searchWords,
}: {
  item: IMovie;
  favoriteCard?: boolean;
  onFavIconPress?: any;
  searchWords?: string;
}) => {
  const navigation = useNavigation();
  return (
    <Card
      onPress={() =>
        navigation.navigate("MovieDetails", {
          id: movie.id,
        })
      }
    >
      <View style={styles.cardCont}>
        <Image
          source={
            movie.poster_path
              ? {
                  uri: `https://www.themoviedb.org/t/p/w150_and_h150_bestv2/${movie.poster_path}`,
                }
              : require("../../assets/logo.png")
          }
          style={styles.cardImg}
        />
        <View style={styles.textCont}>
          <View>
            <View style={styles.favCont}>
              <Text style={styles.title} numberOfLines={3}>
                <Highlighter
                  highlightStyle={{ backgroundColor: theme.colors.green }}
                  searchWords={[searchWords]}
                  textToHighlight={movie.title}
                />
              </Text>
              {favoriteCard && onFavIconPress && (
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  color={theme.colors.error}
                  size={20}
                  style={{ marginHorizontal: 10 }}
                  onPress={() => onFavIconPress()}
                />
              )}
            </View>
            <Text style={styles.date} numberOfLines={4}>
              {dateFormatter(movie.release_date)}
            </Text>
          </View>
          <View style={styles.genresCont}>
            <Text style={styles.genres}>Action</Text>
            <Text style={styles.genres}>Drama</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.vote}>
              {((movie.vote_average / 10) * 100).toFixed(0)}%
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
