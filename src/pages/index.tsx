import Header from '@/components/Header/Header';
import Feed from "@/components/Feed/Feed";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Data} from "@/models/data";
import readDataJSON from "@/utilities/readJson";
import {useProjectStore} from "@/store/storeProvider";
import {useEffect} from "react";
import Style from '@/styles/App.module.css';
import Head from "next/head";

export default function Home({data}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {setProjects, setDisplayMode, setContactInfo} = useProjectStore((state) => state);

  useEffect(() => {
      console.log('only initial')
  },[]);

    useEffect(() => {
        setDisplayMode(window.innerWidth);
        const handleResize = () => {
            setDisplayMode(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setDisplayMode]);

    useEffect(() => {
        setProjects(data.projects);
        setContactInfo(data['lene-who']);
    }, [data, setProjects, setContactInfo]);


  return (
      <div className={Style.main}>
          <Head>
              <title>Lene Zech</title>
          </Head>
        <Header />
          <Feed />
      </div>
  )
}

export const getStaticProps: GetStaticProps<{data: Data}> = async () => {
  const data: Data = await readDataJSON();
  data.projects.sort((proA, proB) => proA.ID - proB.ID);

  return { props: { data } }
}
