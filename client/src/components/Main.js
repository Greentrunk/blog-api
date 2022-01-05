import React from "react";

import { About } from "./About";
import { AllPosts } from "../features/posts/AllPosts";

export const Main = () => {
    return (
        <div className="flex flex-col justify-between gap-20">
            <AllPosts/>
            <About />
        </div>
    );
}