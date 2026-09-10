import React, { useState, useEffect } from 'react';
import { blogService } from '../../services/blogService';
import Modal from '../../components/common/Modal';

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-margin-mobile lg:px-margin-desktop">
      <div className="max-w-[1280px] mx-auto space-y-space-2xl">
        
        {/* Editorial Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="font-label-sm uppercase tracking-[0.25em] font-semibold">
              The Nocturne Chronicles
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-semibold tracking-tight">
            Stories Brewed With Love
          </h1>
          <p className="font-body-lg text-on-surface-variant mt-2 leading-relaxed">
            Essays on single-origin sourcing, roast curve chemistry, vacuum siphon extractions, and the quiet philosophy of late-hour café culture.
          </p>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-surface-container rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-surface">
                    <img
                      src={post.coverImageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/85 backdrop-blur-md text-on-primary text-[11px] font-semibold">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[12px] text-on-surface-variant">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>

                    <h3 className="font-headline-sm text-[20px] font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center text-secondary font-label-md font-semibold gap-1">
                  <span>Read Essay</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Article Reading Modal */}
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost?.title || 'Chronicle Essay'}
        >
          {selectedPost && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex items-center gap-3 text-body-sm text-on-surface-variant border-b border-surface-container pb-3">
                <span className="font-semibold text-primary">{selectedPost.author}</span>
                <span>•</span>
                <span>Category: {selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.readTimeMinutes} min read</span>
              </div>
              <p className="font-headline-sm text-secondary italic font-normal text-[18px]">
                "{selectedPost.excerpt}"
              </p>
              <div className="text-body-md text-on-surface leading-relaxed whitespace-pre-line space-y-4">
                {selectedPost.content}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default BlogsPage;
