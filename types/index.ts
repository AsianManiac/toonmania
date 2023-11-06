import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string;
};

interface AuthorListProps {
  authorType: string;
  authorNo: number;
  communityAuthorId: string;
  authorName: string;
  sortOrder: number;
}

interface dailyPassProps {
  id: number;
  language: string;
  titleProductId: number;
  titleNo: number;
  openYn: boolean;
  startYmdt: number;
  endYmdt: number;
  productPolicyId: string;
  feedCount: number;
  passUseRestrictEpisodeCount: number;
  feedTime: number;
  backgroundColor: string;
  registerYmdt: number;
  modifyYmdt: number;
  modifyAdminId: string;
  new: boolean;
}

interface titleWeekdayProps {
  titleNo: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface RapidToonProps {
  titleNo?: number;
  language?: string;
  viewer?: string;
  title: string;
  koreanTitle?: string;
  representGenre?: string;
  restTerminationStatus?: string;
  ageGradeNotice?: boolean;
  registerYmdt?: number;
  trending?: boolean;
  previewDisabled?: boolean;
  contentRating?: string;
  thumbnail?: string;
  thumbnailIpad?: string;
  bgNewIpad?: string;
  wideThumbnail?: string;
  readCount?: number;
  favoriteCount?: number;
  mana?: number;
  rankingMana?: number;
  likeitCount?: string;
  lastEpisodeRegisterYmdt?: number;
  groupName?: string;
  synopsis?: string;
  totalServiceEpisodeCount?: number;
  serviceStatus?: string;
  backgroundMobile?: string;
  titleAuthorList?: AuthorListProps;
  dailyPass?: dailyPassProps;
  titleForSeo?: string;
  representGenreCssCode?: string;
  newTitle?: boolean;
}
export interface RapidCompleteToonProps {
  titleNo?: number;
  language?: string;
  viewer?: string;
  title: string;
  koreanTitle?: string;
  representGenre?: string;
  restTerminationStatus?: string;
  ageGradeNotice?: boolean;
  theme?: string;
  registerYmdt?: number;
  unsuitableForChildren?: true;
  webnovel?: boolean;
  usingGeoBlocking?: boolean;
  staffPick?: boolean;
  trending?: boolean;
  previewDisabled?: boolean;
  contentRating?: string;
  thumbnail?: string;
  thumbnailIpad?: string;
  bgNewIpad?: string;
  wideThumbnail?: string;
  starScoreAverage?: number;
  readCount?: number;
  favoriteCount?: number;
  mana?: number;
  rankingMana?: number;
  likeitCount?: string;
  lastEpisodeRegisterYmdt?: number;
  groupName?: string;
  synopsis?: string;
  subGenre?: [];
  weekday?: [];
  totalServiceEpisodeCount?: number;
  serviceStatus?: string;
  backgroundMobile?: string;
  titleAuthorList?: AuthorListProps;
  dailyPass?: dailyPassProps;
  titleBMType?: string;
  titleUnsuitableForChildren?: boolean;
  titleWeekday?: titleWeekdayProps;
  service?: boolean;
  genreColor?: string;
  titleForSeo?: string;
  representGenreCssCode?: string;
  newTitle?: boolean;
  representGenreSeoCode?: string;
  webtoonType?: string;
  writingAuthorNo?: number;
  pictureAuthorNo?: number;
  writingAuthorName?: string;
  pictureAuthorName?: string;
  starScoreCount?: number;
  starScoreTotal?: number;
  dailyPassTitle?: boolean;
}
