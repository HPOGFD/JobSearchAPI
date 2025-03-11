// src/interfaces/Post.ts

export interface Post {
    id: number;        // Unique identifier for the post
    text: string;      // Content of the post
    author: string;    // Username of the post creator
    timestamp: string; // ISO string of when the post was created
    likes: number;     // Number of likes on the post
    authorId?: string; // Optional: ID of the author for more advanced user management
    edited?: boolean;  // Optional: Flag to indicate if post has been edited
    editTimestamp?: string; // Optional: When the post was last edited
  }
  
  // You can also create additional interfaces for post actions
  export interface PostAction {
    type: 'create' | 'edit' | 'delete' | 'like';
    payload: Post | number; // Post object for create/edit, post ID for delete/like
  }
  
  // For filtering or searching posts
  export interface PostFilters {
    author?: string;
    beforeDate?: Date;
    afterDate?: Date;
    searchTerm?: string;
    likedByUser?: string;
  }