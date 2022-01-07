import React from "react";

export const Introduction = () => {
    return (
        <section className="bg-gray-800">
            <div className="w-4/5 max-w-7xl mx-auto flex flex-col justify-center items-center py-28">
                <div className="flex items-center gap-20">
                    <i className="far fa-star icon-font-small text-cyan-500/10"></i>
                    <i className="far fa-envelope icon-font-small text-cyan-500/20"></i>
                    <i className="fas fa-pencil-alt icon-font-medium text-cyan-500/40"></i>
                    <i className="fas fa-atom icon-font-large animate-bounce text-cyan-500"></i>
                    <i className="far fa-edit icon-font-medium text-cyan-500/40"></i>
                    <i className="fas fa-laptop icon-font-small text-cyan-500/20"></i>
                    <i className="far fa-star icon-font-small text-cyan-500/10"></i>
                </div>
                <h3 className="text-4xl text-cyan-500 font-light tracking-wider">Build and read the blog of your dreams</h3>   
            </div>
        </section>
    )
}