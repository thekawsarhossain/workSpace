import { Fragment } from "react";
import Board from "./board";
import Header from "@/components/header";

export default function ProjectDetails() {
  return (
    <Fragment>
      <Header />
      <div className="container max-w-screen-2xl mt-6">
        <Board />
      </div>
    </Fragment>
  );
}
