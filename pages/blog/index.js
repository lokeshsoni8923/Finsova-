import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data } = matter(markdownWithMeta);

    return {
      frontmatter: data,
      slug: filename.replace(".md", ""),
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="border-b pb-4 mb-4 hover:bg-gray-50 rounded-md p-4 transition"
          >
            <h2 className="text-2xl font-semibold">{post.frontmatter.title}</h2>
            <p className="text-gray-500">{post.frontmatter.date}</p>
            <p className="text-gray-700 mb-2">{post.frontmatter.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
