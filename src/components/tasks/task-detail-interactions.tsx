"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, UserPlus, UserCheck } from "lucide-react";

interface TaskDetailInteractionsProps {
  slug: string;
  author: string;
  className?: string;
  showFollow?: boolean;
  showLike?: boolean;
}

export function TaskDetailInteractions({ slug, author, className, showFollow = true, showLike = true }: TaskDetailInteractionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    const followedAuthors = JSON.parse(localStorage.getItem('followedAuthors') || '{}');
    setIsLiked(!!likedPosts[slug]);
    setIsFollowing(!!followedAuthors[author]);
    
    // Load like count from localStorage (you could also fetch this from an API)
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');
    setLikeCount(likeCounts[slug] || 0);
  }, [slug, author]);

  const handleLike = async () => {
    if (isLikeLoading) return;
    
    setIsLikeLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
      setLikeCount(newLikeCount);
      
      // Store in localStorage for persistence
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');
      
      if (newLikedState) {
        likedPosts[slug] = true;
        likeCounts[slug] = newLikeCount;
      } else {
        delete likedPosts[slug];
        likeCounts[slug] = newLikeCount;
      }
      
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleFollow = async () => {
    if (isFollowLoading) return;
    
    setIsFollowLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsFollowing(!isFollowing);
      
      // Store in localStorage for persistence
      const followedAuthors = JSON.parse(localStorage.getItem('followedAuthors') || '{}');
      if (isFollowing) {
        delete followedAuthors[author];
      } else {
        followedAuthors[author] = true;
      }
      localStorage.setItem('followedAuthors', JSON.stringify(followedAuthors));
    } catch (error) {
      console.error('Failed to follow author:', error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  
  return (
    <div className={className}>
      {showFollow && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full px-4"
            onClick={handleFollow}
            disabled={isFollowLoading}
          >
            {isFollowing ? (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Follow
              </>
            )}
          </Button>
        </div>
      )}
      
      {showLike && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className={`h-10 w-10 rounded-full transition-colors ${
              isLiked ? 'text-blue-600 hover:text-blue-700' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={handleLike}
            disabled={isLikeLoading}
          >
            <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          {likeCount > 0 && (
            <span className="ml-2 text-sm text-muted-foreground self-center">
              {likeCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
