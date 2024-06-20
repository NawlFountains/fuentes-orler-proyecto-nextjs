import { fetchProductCategories } from "../lib/data";
import SideNav from "../ui/search/sidenav";
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const categories = await fetchProductCategories();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav categories={categories}/>
      </div>
      <div className="flex-grow p-4 md:py-1 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}