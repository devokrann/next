import prisma from "@/libraries/prisma";
import { CommentCreate, CommentUpdate } from "@/types/models/comment";
import { generateId } from "@/utilities/generators/id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const comment: Omit<CommentCreate, "id"> & { postId: string; userId?: string } = await request.json();

		const commentRecord = await prisma.comment.findUnique({
			where: {
				content_postId_name: { content: comment.content, postId: comment.postId, name: comment.name },
			},
		});

		if (commentRecord) {
			return NextResponse.json(
				{ error: "Comment already exists" },
				{ status: 409, statusText: "Already Exists" }
			);
		}

		const createComment = await prisma.comment.create({
			data: { id: generateId(), name: comment.name, content: comment.content, postId: comment.postId },
		});

		return NextResponse.json(
			{ message: "Comment created successfully", comment: createComment },
			{ status: 200, statusText: "Comment Created" }
		);
	} catch (error) {
		console.error("---> route handler error (create comment):", error);
		return NextResponse.json({ error: "Something went wrong on our end" }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { commentId: string } }) {
	try {
		const commentRecord = await prisma.comment.findUnique({ where: { id: params.commentId } });

		if (!commentRecord) {
			return NextResponse.json({ error: "Comment not found" }, { status: 404, statusText: "Not Found" });
		}

		const comment: CommentUpdate = await request.json();

		await prisma.comment.update({ where: { id: params.commentId }, data: comment });

		return NextResponse.json(
			{ message: "Your comment has been updated" },
			{ status: 200, statusText: "Comment Updated" }
		);
	} catch (error) {
		console.error("---> route handler error (update comment):", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
