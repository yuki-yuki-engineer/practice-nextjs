import React, { Fragment } from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

// MenuオブジェクトのType定義
type Menu = {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
};

// APIからのResponseに合わせたType定義 =>  {"menus": [{}]}
type Menus = {
  menus: Menu[];
};

const Menus = ({ menus }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <h1>【メニューList】</h1>
      <ul>
        {/** メニュー・値段を表示する */}
        {menus.map(({ id, name, price }) => (
          <li key={id}>
            <div>
              {`メニュー名：${name}`} {`(値段：${price}円)`}
            </div>
            <br />
            <div></div>
            <br />
            <small></small>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export function getStaticPaths() {
  const restaurantIdList = ["1", "2", "3", "4", "5"];
  const paths = restaurantIdList.map((i) => {
    return {
      params: {
        id: [i, "foods"],
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { id } = params;
  const res = await fetch(`http://localhost:8080/restaurants/${id[0]}/foods`);
  const menus: Menus = await res.json();

  return {
    props: menus,
  };
};

export default Menus;
