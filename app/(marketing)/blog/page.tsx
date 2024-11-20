import React from "react";

import { Grid, GridCol, Stack, Text, Title } from "@mantine/core";

import LayoutPage from "@/components/layout/page";
import LayoutSection from "@/components/layout/section";
import CardBlogNew from "@/components/common/cards/blog/new";
import CardBlogMain from "@/components/common/cards/blog/main";

import { postsGet } from "@/handlers/requests/database/post";
import { PostRelations } from "@/types/models/post";

export default async function Blog() {
	const { posts }: { posts: PostRelations[] } = await postsGet();

	return (
		<LayoutPage>
			<LayoutSection id={"page-blog"} padded>
				<Stack gap={"xl"}>
					<Stack align="center">
						<Title order={1} ta={"center"}>
							Expert web design advice
						</Title>
						<Text ta={"center"} w={{ md: "50%", lg: "40%" }}>
							Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit
							aliquam sit nullam.
						</Text>
					</Stack>

					<Grid gutter={"xl"}>
						<GridCol span={12}>
							<CardBlogNew post={posts[0]} />
						</GridCol>

						{posts.map(
							(post) =>
								posts.indexOf(post) != 0 && (
									<GridCol key={post.title} span={{ base: 12, sm: 6, md: 4 }}>
										<CardBlogMain post={post} />
									</GridCol>
								)
						)}
					</Grid>
				</Stack>
			</LayoutSection>
		</LayoutPage>
	);
}
