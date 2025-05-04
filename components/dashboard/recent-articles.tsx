"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Prisma } from "@/lib/generated/prisma";
import { deleteArticle } from "@/action/delete-article";

type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
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

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button className="text-muted-foreground" size="sm" variant={"ghost"}>
            View All →{" "}
          </Button>
        </div>
      </CardHeader>

      {articles.length === 0 ? (
        <CardContent>No article found</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={"outline"}
                      className="rounded-full bg-green-100 text-green-800 "
                    >
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>{article.createdAt.toDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/articles/${article.id}/edit`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Button
                          variant={"ghost"}
                          size="sm"
                          className="text-muted-foreground"
                        >
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton articleId={article.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
 const [isPending, startTransition] = useTransition();
  return (
    <form
      action={() => {
        startTransition(async () => {
          await deleteArticle(articleId);
        });
      }}
    >
      <Button
      disabled={isPending}
        variant={"ghost"}
        size="sm"
        type="submit"
        className="text-muted-foreground"
      >
        {isPending ? "Loading..." : "Delete"}
      </Button>
    </form>
  );
};
