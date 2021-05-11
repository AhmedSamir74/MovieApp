import { strings } from "../localization/i18n";

export const MOVIES_CATEGORIES: {
  key: number;
  title: string;
  value: string;
}[] = [
  {
    key: 1,
    title: strings("upComing"),
    value: "upcoming",
  },
  {
    key: 2,
    title: strings("popular"),
    value: "popular",
  },
  {
    key: 3,
    title: strings("topRated"),
    value: "top_rated",
  },
];
