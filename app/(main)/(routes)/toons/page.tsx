import Container from "@/components/container";
import Heading from "@/components/heading";
import { UserMenuProps } from "@/components/user-menu";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const page = async ({ currentUser }: UserMenuProps) => {
  const userId = currentUser?.id;
  if (currentUser) {
    redirect("/");
  }
  const toons = await db.webtoon.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <Container>
      <Heading title="All toons" />
      <DataTable columns={columns} data={toons} />
    </Container>
  );
};

export default page;
