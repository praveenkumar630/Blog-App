import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Clock, FileText, MessageCircle, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./recent-articles";
import { prisma } from "@/lib/prisma";

const BlogDashboard = async () => {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy:{
        createdAt: "desc"
      },
      include:{
        comments: true,
        author:{
          select:{
            name: true,
            email: true,
            imageUrl: true
          }
        }
      }
    }),
    prisma.comment.count(),

  ])

  return (
      <main className="flex-1 p-4 md:p-8">
        <div className="flex justify-center items-center mb-8">
          <div>
            <h1 className="font-bold text-2xl">Blog Dashboard</h1>
            <p>Manage your content and analytics</p>
          </div>
          <Link href={"/dashboard/articles/create"} className="ml-auto">
            <Button>
              <PlusCircle className="h-4 w-4" />
              New Article
            </Button>
          </Link>
        </div>
        
        {/* Quick stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="h-[140px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="font-medium text-sm">
                Total Articles
              </CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{articles.length}</div>
              <p className="text-sm text-muted-foreground mt-1">+5 from last months</p>
            </CardContent>
          </Card>
          <Card className="h-[140px]">
            <CardHeader className="flex items-center justify-between space-y-0 ">
              <CardTitle className="font-medium text-sm">
                Total Comments
              </CardTitle>
              <MessageCircle className="h-4 w-4" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{totalComments}</div>
              <p className="text-sm text-muted-foreground mt-1">12 awaiting moderation</p>
            </CardContent>
          </Card>
          <Card className="h-[140px]">
            <CardHeader className="flex items-center justify-between space-y-0 ">
              <CardTitle className="font-medium text-sm">
                Avg. Rating Time
              </CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-sm text-muted-foreground mt-1">+0.6 from last month</p>
            </CardContent>
          </Card>
        </div>

        <RecentArticles articles={articles}/>
      </main>
    
  );
};

export default BlogDashboard;
