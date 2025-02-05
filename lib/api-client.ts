/* eslint-disable @typescript-eslint/no-explicit-any */

import { IVideo } from "@/models/video.model";

export type videoFormData = Omit<IVideo, "_id">;

/* eslint-disable @typescript-eslint/no-unused-vars */
type FetchOption = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOption = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>("/videos");
  }

  async getAVideo(id: string) {
    return this.fetch<IVideo>(`/videos/${id}`);
  }

  async createVideo(videoData: videoFormData) {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient()
