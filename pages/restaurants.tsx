import React, { Fragment } from "react";
import Link from "next/link";
import { InferGetStaticPropsType } from "next";

// RestaurantオブジェクトのType定義
type Restaurant = {
  id: number;
  name: string;
};

// APIからのResponseに合わせたType定義 =>  {"restaurants": [{}]}
type Restaurants = {
  restaurants: Restaurant[];
};

const Restaurants = ({
  restaurants,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <h1>【レストラン一List】</h1>
      <ul>
        {/** レストラン名を表示する */}
        {restaurants.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/restaurants/${id}/foods`}>
              <a>{`レストラン名：${name}`}</a>
            </Link>
            <br />
            <small></small>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:8080/restaurants`);
  const restaurants: Restaurants = await res.json();

  return {
    props: restaurants,
  };
};

export default Restaurants;
