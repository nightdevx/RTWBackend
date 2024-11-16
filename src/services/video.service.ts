import axios from "axios";
import dotenv from "dotenv";
import { Video } from "../models/video.model";
import FormData from "form-data";
import e from "express";
dotenv.config();

const VIDEO_API_KEY = process.env.VIDEO_API_KEY;
const VIDEO_API_LINK = process.env.VIDEO_API_LINK;
const VIDEO_API_BUCKET = process.env.VIDEO_API_BUCKET;
const VIDEO_API_PROJECT = process.env.VIDEO_API_PROJECT;

if (!VIDEO_API_KEY || !VIDEO_API_LINK) {
  throw new Error("Video API configuration is missing");
}

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get(
      `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch videos: ${error.message}`);
  }
};

export const fetchVideoById = async (videoId: string): Promise<Video> => {
  try {
    const response = await axios.get(
      `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}/${videoId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch video by ID: ${error.message}`);
  }
};

export const fetchVideosByIds = async (
  videoIds: string[]
): Promise<Video[]> => {
  try {
    const videoPromises = videoIds.map((videoId) => {
      if (videoId === "non-recorded") {
        return { data: "non-recorded" };
      } else {
        return axios.get(
          `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}/${videoId}`
        );
      }
    });
    const responses = await Promise.all(videoPromises);
    return responses.map((response) => response.data);
  } catch (error) {
    throw new Error(`Failed to fetch videos by IDs: ${error.message}`);
  }
};

export const uploadVideoToAPI = async (file: Express.Multer.File) => {
  try {
    const formData = new FormData();
    const randomFileName = `${Date.now()}.mp4`;
    formData.append("file", file.buffer, randomFileName);
    formData.append("accessKey", VIDEO_API_KEY);
    formData.append("bucket", VIDEO_API_BUCKET);
    formData.append("project", VIDEO_API_PROJECT);

    const response = await axios.post(VIDEO_API_LINK, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to upload video: ${error.message}`);
  }
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  try {
    await axios.delete(
      `${VIDEO_API_LINK}/${VIDEO_API_PROJECT}/${VIDEO_API_BUCKET}/${VIDEO_API_KEY}/${videoId}`
    );
  } catch (error) {
    throw new Error(`Failed to delete video: ${error.message}`);
  }
};
