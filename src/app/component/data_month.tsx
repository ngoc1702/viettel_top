
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY2 } from "../(sanity)/lib/queries";
import DATA_MONTH_CLIENT from "./data_month_client";

// export default async function DATA_MONTH() {
//   const posts = await client.fetch(POSTS_QUERY2); 
//   return <DATA_MONTH_CLIENT posts={posts} />;
// }

export default async function DATA_MONTH() {
  const posts = await client.fetch(POSTS_QUERY2, {}, {
    next: {
      revalidate: 30, // Tự động refetch lại sau 60 giây
    }
  });

  return <DATA_MONTH_CLIENT posts={posts} />;
}
