import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Prisma } from "@/lib/generated/prisma";
import React from "react";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import CommentList from "../comments/comment-list";
import CommentForm from "../comments/comment-form";
import { prisma } from "@/lib/prisma";
import LikeButton from "./actions/like-button";
import { auth } from "@clerk/nextjs/server";

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({
  article,
}) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      articleId: article.id,
    },
  });

  const {userId} = await auth();

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId as string,
    },
  });

  const isLiked : boolean = likes.some((like) => like.userId === user?.id);
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · {12} min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          <LikeButton articleId={article.id} likes={likes}  isLiked={isLiked}/>

          {/* Comments Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div>

            {/* Comment Form */}
            <CommentForm articleId={article.id} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
