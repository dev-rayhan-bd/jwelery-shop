import mainUrl from "@/components/shared/mainUrl";

export default async function sitemap() {
  const baseUrl = 'https://cathysjewelry.net'; 

  // ১. স্ট্যাটিক রুটগুলো
  const staticRoutes = ['', '/aboutUs', '/contactUs', '/faq', '/shop', '/customize'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));


  let categoryRoutes = [];
  try {
    const categories = await mainUrl('/categories');
    categoryRoutes = categories.map((cat:any) => ({
      url: `${baseUrl}/${cat._id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap category fetch error:", error);
  }

  return [...staticRoutes, ...categoryRoutes];
}