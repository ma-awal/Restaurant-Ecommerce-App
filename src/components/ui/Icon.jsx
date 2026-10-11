import {
  Flame,
  Truck,
  ShieldCheck,
  MousePointerClick,
  CreditCard,
  Banknote,
  Smile,
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  Leaf,
  Award,
  Users,
  Heart,
  UtensilsCrossed,
  List,
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  X,
  Menu,
  Trash2,
  Check,
  ShoppingBag,
  Navigation,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react';

function GrillIcon({ size = 24, className = '', strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 22h32a16 16 0 0 1-32 0z" />
      <path d="M14 28h20M16 33h16" />
      <path d="M17 39l-3 6M31 39l3 6" />
      <path d="M18 16c-2-3 2-4 0-8M24 16c-2-3 2-4 0-8M30 16c-2-3 2-4 0-8" />
    </svg>
  );
}

function SocialIcon({ path, size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const FACEBOOK =
  'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z';
const TIKTOK =
  'M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z';
const YOUTUBE =
  'M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3L10 15z';

function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props) {
  return <SocialIcon path={FACEBOOK} {...props} />;
}
function TiktokIcon(props) {
  return <SocialIcon path={TIKTOK} {...props} />;
}
function YoutubeIcon(props) {
  return <SocialIcon path={YOUTUBE} {...props} />;
}

const icons = {
  flame: Flame,
  grill: GrillIcon,
  truck: Truck,
  shield: ShieldCheck,
  cursor: MousePointerClick,
  card: CreditCard,
  cash: Banknote,
  smile: Smile,
  store: Store,
  pin: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  leaf: Leaf,
  meat: Award,
  users: Users,
  heart: Heart,
  utensils: UtensilsCrossed,
  list: List,
  cart: ShoppingCart,
  search: Search,
  user: User,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  arrowRight: ArrowRight,
  plus: Plus,
  minus: Minus,
  close: X,
  menu: Menu,
  trash: Trash2,
  check: Check,
  bag: ShoppingBag,
  navigation: Navigation,
  success: CircleCheck,
  warning: TriangleAlert,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 2 }) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
