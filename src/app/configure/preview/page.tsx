import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/db";
import DesignPreview from "./DesignPreview";
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const PreviewPage = async ({ searchParams }: PageProps) => {
    const {id} = searchParams;
    if (!id || typeof id !== "string") {
      return notFound()
    }

    const configuration = await db.configurations.findUnique({
        where: { id },
    });
  return (
   <DesignPreview  />
  );
};

export default PreviewPage;
