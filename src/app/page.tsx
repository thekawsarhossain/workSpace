import Header from "@/components/header";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment>
      <Header />
      <main className="container max-w-screen-2xl h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-6xl font-bold max-w-5xl md:max-w-4xl text-center my-6">WorkSpace is a better way to manage applications</h2>
        <p className="text-center mb-12 text-balance text-sm md:text-xl leading-5 font-normal">Elevate Your Workflow: Discover the Future of Product Development</p>

        <Link href="/login" className="flex items-center space-x-2 bg-primary px-4 py-2.5 rounded-md text-white hover:bg-primary/95">
          <span>Get started</span>
          <RightOutlined />
        </Link>
      </main>
    </Fragment>
  );
}
