import {
  AiFillPlayCircle,
  AiFillStar,
  AiOutlineFileUnknown,
} from "react-icons/ai";
import { BiLoaderAlt, BiSolidMoviePlay } from "react-icons/bi";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkFill,
  BsPersonFill,
} from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { FaGithub, FaRegThumbsUp, FaTag } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi2";
import { LiaClipboardListSolid } from "react-icons/lia";
import {
  MdChevronLeft,
  MdChevronRight,
  MdHome,
  MdOutlineArrowUpward,
} from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { TfiMenuAlt } from "react-icons/tfi";

const Icons = {
  next: MdChevronRight,
  prev: MdChevronLeft,
  bookmark: BsFillBookmarkFill,
  bookmarkCheck: BsFillBookmarkCheckFill,
  heart: FaHeart,
  doubleDownArrow: HiOutlineChevronDoubleDown,
  star: AiFillStar,
  close: CgCloseR,
  play: AiFillPlayCircle,
  hamburger: TfiMenuAlt,
  search: FiSearch,
  person: BsPersonFill,
  movie: BiSolidMoviePlay,
  tv: PiTelevisionSimpleFill,
  genre: FaTag,
  home: MdHome,
  unknown: AiOutlineFileUnknown,
  people: HiUserGroup,
  loader: BiLoaderAlt,
  watchlist: LiaClipboardListSolid,
  top: MdOutlineArrowUpward,
  like: FaRegThumbsUp,
  github: FaGithub,
};

export default Icons;
