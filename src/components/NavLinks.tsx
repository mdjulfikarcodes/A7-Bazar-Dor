import Link from "next/link";

type Category = {
  id: number;
  slug: string;
  icon: string;
  nameBn: string;
};

const NavLinks = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const categories: Category[] = await res.json();

  return (
    <nav className="mx-auto max-w-7xl flex justify-start items-center gap-7 w-full mt-5 pl-8">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`}>
          {category.icon} {category.nameBn}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;