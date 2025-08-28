import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch("/api/blog")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((p) => p.slug === slug);
          setPost(found);
        });
    }
  }, [slug]);

  if (!post) return <p className="text-center mt-20">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <img src={post.image}/>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <p className="text-lg text-gray-800">{post.content}</p>
    </main>
  );
}
