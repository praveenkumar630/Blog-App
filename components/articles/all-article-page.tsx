import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { Prisma } from "@/lib/generated/prisma";
import { Search } from "lucide-react";

import Image from "next/image";
import React from "react";

type AllArticlePageProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const AllArticlePage: React.FC<AllArticlePageProps> = async ({ articles }) => {
  if (articles.length <= 0) {
    return <NoSearchResult />;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-4">
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={article.featuredImage}
                alt="Article Image"
                fill
                className="object-cover"
              />
            </div>

            {/* Article content */}

            <h3 className="text-xl font-semibold text-foreground">
              {article.title}
            </h3>
            <p className="mt-2 text-sm font-bold">{article.category}</p>

            {/* Author & Metadata */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl || ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {article.author.name}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {article.createdAt.toDateString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AllArticlePage;

export const NoSearchResult = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
};
