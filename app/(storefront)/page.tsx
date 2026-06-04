import { getMenuItems } from "@/lib/data/menu";
import { HomeContent } from "@/components/store/home-content";

export default function HomePage() {
  const menuItems = getMenuItems();

  return <HomeContent menuItems={menuItems} />;
}
