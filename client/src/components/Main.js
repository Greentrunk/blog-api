import React from "react";

import { About } from "./About";
import { AllPosts } from "../features/posts/AllPosts";
import { Banner } from "./Banner";
import { Introduction } from "./Introduction";

export const Main = () => {
  return (
    <div className="flex flex-col justify-between">
      <Banner />
      <Introduction />
      <AllPosts />
      <About />
    </div>
  );
};
