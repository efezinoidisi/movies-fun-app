import { MdChevronLeft, MdChevronRight, MdHome } from 'react-icons/md';
import {
  BsFillBookmarkFill,
  BsFillBookmarkCheckFill,
  BsPersonFill,
} from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { HiUserGroup } from 'react-icons/hi2';
import {
  AiFillStar,
  AiFillPlayCircle,
  AiOutlineFileUnknown,
} from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { TfiMenuAlt } from 'react-icons/tfi';
import { FiSearch } from 'react-icons/fi';
import { BiSolidMoviePlay, BiLoaderAlt } from 'react-icons/bi';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import { FaTag } from 'react-icons/fa6';

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
};

export default Icons;
