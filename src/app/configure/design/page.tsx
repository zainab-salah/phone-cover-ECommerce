import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";
import { getAuthSession } from '@/auth'

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  //make the db call
  const { id } = await searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) {
    return notFound();
  }
  const user = (await getAuthSession())?.user
  if (configuration.userId && configuration.userId !== user?.id) {
    return notFound()
  }
  const { imageUrl, width, height } = configuration;
  return (
    <DesignConfigurator
      imageUrl={imageUrl}
      configId={configuration.id}
      imageDimensions={{ width, height }}
    />
  );
};

export default page;
