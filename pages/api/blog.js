// pages/api/blog.js
export default function handler(req, res) {
  const posts = [
    {
      slug: "first-post",
      title: "My First Post",
      date: "2025-08-01",
      description: "This is the first post, introducing our blog system.",
      content: "Full content of the first post goes here...",
      image: "/img//Blog-1536x864-1.png",
    },
    {
      slug: "second-post",
      title: "My Second Post",
      date: "2025-08-05",
      description: "This is the second post, explaining features in detail.",
      content: "Full content of the second post goes here...",
      image: "/img/How-to-Secure-Your-Financial-Future-with-Life-Insurance-copy.jpg",
    },
    {
      slug: "third-post",
      title: "Another Amazing Post",
      date: "2025-08-10",
      description: "Some tips and tricks in this post for developers.",
      content: "Full content of the third post goes here...",
      image: "/img/credit-card-bill-payment-blog-banner-copy.jpg",
    },
    {
      slug: "fourth-post",
      title: "Financial Habits That Stick",
      date: "2025-08-12",
      description: "Build better money habits with simple steps.",
      content: "Full content of the fourth post goes here...",
      image: "/img/Aadhaar-Enabled-Payment-System-AePS.jpg",
    },
    {
      slug: "fifth-post",
      title: "Grow Your Business Smartly",
      date: "2025-08-14",
      description: "Tactical advice to scale sustainably.",
      content: "Full content of the fifth post goes here...",
      image: "/img/second-utility-service-banner-for-blog-copy.jpg",
    },
  ];

  res.status(200).json(posts); // 👈 MUST return an array
}
