import { Request, Response } from "express";
import * as VideoService from "../services/video.service";

export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const videos = await VideoService.fetchVideos();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const video = await VideoService.fetchVideoById(id);
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideosByIds = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ids } = req.body; // Assuming IDs are sent in the request body
    if (!Array.isArray(ids)) {
      res
        .status(400)
        .json({ message: "Invalid input, expected an array of IDs" });
    }
    const videos = await VideoService.fetchVideosByIds(ids);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No video file uploaded.");
    }

    const responseData = await VideoService.uploadVideoToAPI(req.file);

    res.status(200).send(responseData);
  } catch (error) {
    console.error("Error uploading video:", error.message);
    res.status(500).send("Error uploading video: " + error.message);
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await VideoService.deleteVideo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
