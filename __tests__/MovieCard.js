import React from "react";
import renderer from "react-test-renderer";
import { MovieCard } from "../src/components";
import MockedNavigator from "./MockedNavigator";
it("renders correctly across screens", () => {
  let movie = {
    adult: false,
    backdrop_path: "/ezLKohe4HKsHQbwQwhv0ARo83NC.jpg",
    genre_ids: [10751, 14, 12, 35],
    id: 624963,
    original_language: "en",
    original_title: "A Babysitter's Guide to Monster Hunting",
    overview:
      "Recruited by a secret society of babysitters, a high schooler battles the Boogeyman and his monsters when they nab the boy she's watching on Halloween.",
    popularity: 90.12,
    poster_path: "/bkld8Me0WiLWipLORRNfF1yIPHu.jpg",
    release_date: "2020-10-14",
    title: "A Babysitter's Guide to Monster Hunting",
    video: false,
    vote_average: 6.3,
    vote_count: 181,
  };
  const tree = renderer.create(<MovieCard item={movie} />).toJSON();
  expect(tree).toMatchSnapshot();
});
