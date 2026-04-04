import {
    Home, Utensils, Repeat, Car, HeartPulse,
    Tv, ShoppingBag, MoreHorizontal,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    "home": Home,
    "utensils": Utensils,
    "repeat": Repeat,
    "car": Car,
    "heart-pulse": HeartPulse,
    "tv": Tv,
    "shopping-bag": ShoppingBag,
    "more-horizontal": MoreHorizontal,
};

interface CategoryIconProps {
    iconKey: string;
    className?: string;
}

export function CategoryIcon({ iconKey, className }: CategoryIconProps) {
    const Icon = iconMap[iconKey] ?? MoreHorizontal;
    return <Icon className={className} />;
}