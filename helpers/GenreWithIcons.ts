import { Genre } from "@prisma/client";
import { HeartPulse, LucideIcon, MoonStar } from "lucide-react";
import { AiOutlineGroup } from "react-icons/ai";
import { BiKnife, BiNews, BiPlanet } from "react-icons/bi";
import {
  HiBookOpen,
  HiOutlineEmojiHappy,
  HiOutlineHeart,
  HiOutlineLibrary,
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineSupport,
  HiSparkles,
  HiTrendingDown,
} from "react-icons/hi";

export const GenreWithIcons: Record<Genre["name"], LucideIcon> = {
  FANTASY: HiOutlineSparkles,
  COMEDY: HiOutlineEmojiHappy,
  DRAMA: HiOutlineHeart,
  ACTION: HiTrendingDown,
  "SLICE OF LIFE": HiOutlineSun,
  ROMANCE: HeartPulse,
  SUPERHERO: MoonStar,
  "SCI-FI": BiPlanet,
  THRILLER: BiKnife,
  SUPERNATURAL: HiSparkles,
  MYSTERY: BiNews,
  SPORTS: HiOutlineSupport,
  HISTORICAL: HiOutlineLibrary,
  HEARTWARMING: HiOutlineEmojiHappy,
  HORROR: AiOutlineGroup,
  INFORMATION: HiBookOpen,
};
