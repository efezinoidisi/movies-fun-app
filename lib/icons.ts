import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { BsFillBookmarkFill, BsFillBookmarkCheckFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { AiFillStar, AiFillPlayCircle } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { TfiMenuAlt } from 'react-icons/tfi';
import { FiSearch } from 'react-icons/fi';

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
};

export default Icons;
