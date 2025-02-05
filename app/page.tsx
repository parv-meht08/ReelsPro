/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/video.model";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.log("Error while fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return <div></div>;
}
