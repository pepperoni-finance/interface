import type { InferGetServerSidePropsType, NextPage } from "next";
import networks from "../../configuration/networks.json";
import uniswap from "../../configuration/uniswap.json";
import Head from "next/head";
import { Connect } from "../components/Connect";
import { TokenSetModal } from "../components/TokenSetModal";
import Header from "../components/Header";
import Swap from "../components/Swap";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useUniverseStore } from "../hooks/useUniverseStore";

export async function getStaticProps() {
  return {
    props: {
      networks,
      tokens: uniswap.tokens,
    },
  };
}

const Home: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = (
  props
) => {
  const { isActive } = useWeb3React();
  const { initialize } = useUniverseStore();

  useEffect(
    () =>
      initialize({
        networks: props.networks,
        tokens: props.tokens,
      }),
    [props, initialize]
  );

  return (
    <div className="font-serif min-h-screen">
      <Head>
        <title>Pepperoni Finance</title>
      </Head>
      <Header></Header>
      <div className="flex justify-center sm:pb-10 pb-4">
        <div className="sm:w-128 w-full">
          {isActive ? <Swap></Swap> : <Connect></Connect>}
        </div>
      </div>
      <TokenSetModal></TokenSetModal>
    </div>
  );
};

export default Home;
