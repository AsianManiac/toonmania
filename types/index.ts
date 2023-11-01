import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string;
};

export interface RapidToonProps {
  titleNo: number;
  language: string;
  viewer: string;
  title: string;
  koreanTitle: string;
  representGenre: string;
  restTerminationStatus: string;
  ageGradeNotice: boolean;
  theme: string;
  registerYmdt: number;
  unsuitableForChildren: true;
  webnovel: boolean;
  usingGeoBlocking: boolean;
  staffPick: boolean;
  trending: boolean;
  previewDisabled: boolean;
  contentRating: string;
  thumbnail: string;
  thumbnailIpad: string;
  bgNewIpad: string;
  wideThumbnail: string;
  starScoreAverage: number;
  readCount: number;
  favoriteCount: number;
  mana: number;
  rankingMana: number;
  likeitCount: number;
  lastEpisodeRegisterYmdt: number;
  groupName: string;
  synopsis: string;
  subGenre: [];
  weekday: [];
  totalServiceEpisodeCount: number;
  serviceStatus: string;
  backgroundMobile: string;
  titleAuthorList: [];
  titleBMType: string;
  titleUnsuitableForChildren: boolean;
  titleWeekday: [Object];
  service: boolean;
  genreColor: string;
  titleForSeo: string;
  representGenreCssCode: string;
  newTitle: boolean;
  representGenreSeoCode: string;
  webtoonType: string;
  writingAuthorNo: number;
  pictureAuthorNo: number;
  writingAuthorName: string;
  pictureAuthorName: string;
  starScoreCount: number;
  starScoreTotal: number;
  dailyPassTitle: boolean;
}
