"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import type { Articles } from "@/lib/generated/prisma";
import { editArticle } from "@/action/edit-article";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticleProps = {
  article: Articles;
};
const EditArticlePage: React.FC<EditArticleProps> = ({ article }) => {
  const [content, setContent] = useState(article.content);
  const [formState, action, isPending] = useActionState(editArticle.bind(null, article.id), {
    errors: {},
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Enter an article title"
              />
              {formState.errors.title && (
                <span className="text-red-800 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={article.category}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-800 text-sm">
                  {formState.errors.category}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type="file"
                name="featuredImage"
                id="featuredImage"
                accept="image/*"
                className="mt-2"
              />
              <div className="mb-4 mt-2">
                {article.featuredImage && (
                  <img
                    src={article.featuredImage}
                    alt="featured-image"
                    className="w-48 h-32 mt-2 object-cover rounded-md"
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              {formState.errors.content && (
                <span className="text-red-800 text-sm">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <Button variant={"outline"}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Edit Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
