import React from "react";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import CategoriesSlider from "./CategoriesSlider/CategoriesSlider";
import MainSlider from "./MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      <div>
        <MainSlider />
      </div>
      <div>
        <CategoriesSlider />
      </div>
      <div className="py-5">
        <FeaturedProducts />
      </div>
    </>
  );
}
