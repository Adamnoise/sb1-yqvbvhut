import React from 'react';
import { Card, CardBody, CardHeader, Button, Avatar, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  timestamp: string;
  replies?: Comment[];
}

export const CommentsSection = () => {
  const [newComment, setNewComment] = React.useState('');
  
  const comments: Comment[] = [
    {
      id: 1,
      user: {
        name: "James Wilson",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
        role: "Product Manager"
      },
      content: "Hey, has anyone checked the latest sales report? We're seeing a significant increase in the premium plan subscriptions.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: {
        name: "Sarah Williams",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2"
      },
      content: "Yes, I've noticed that too! I think our recent marketing campaign is really paying off. The conversion rate has improved by almost 15%.",
      timestamp: "1 hour ago"
    },
    {
      id: 3,
      user: {
        name: "Michael Brown",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3"
      },
      content: "That's great news! Let's discuss this in the team meeting tomorrow. I'd like to see if we can replicate this success for other products.",
      timestamp: "45 minutes ago"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Here you would typically add the comment to your state or send to an API
    console.log("New comment:", newComment);
    setNewComment('');
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex justify-between items-center px-6">
        <div>
          <h3 className="text-lg font-semibold">Comments</h3>
          <p className="text-sm text-default-500">Team discussions</p>
        </div>
        <Button 
          variant="light" 
          color="primary" 
          size="sm"
          endContent={<Icon icon="lucide:chevron-right" className="w-4 h-4" />}
        >
          View all
        </Button>
      </CardHeader>
      
      <CardBody className="px-6 py-4">
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar
                src={comment.user.avatar}
                size="sm"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.user.name}</span>
                  {comment.user.role && (
                    <span className="text-xs text-default-500">{comment.user.role}</span>
                  )}
                </div>
                <p className="text-sm text-default-700 mb-1">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs text-default-500">
                  <span>{comment.timestamp}</span>
                  <button className="hover:text-primary transition-colors">Reply</button>
                  <button className="hover:text-primary transition-colors">Like</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex gap-3">
            <Avatar
              src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
              size="sm"
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                minRows={1}
                className="mb-2"
              />
              <div className="flex justify-end">
                <Button 
                  color="primary" 
                  size="sm"
                  type="submit"
                  isDisabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};