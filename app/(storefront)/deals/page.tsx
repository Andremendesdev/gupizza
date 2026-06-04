import { getMenuItems } from "@/lib/data/menu";
import { DealsPageContent } from "@/components/store/deals-page-content";

export default function DealsPage() {
  const menuItems = getMenuItems();

  return <DealsPageContent menuItems={menuItems} />;
}
