import Video from "../models/Video";

export const getVideos = async (req, res) => {
  const vids = await Video.find({});

  return res.status(200).json(vids);
};

export const getVideo = async (req, res) => {
  const { id } = req.params;
  const vid = await Video.findById(id);

  return res.status(200).json(vid);
};

export const postVideo = async (req, res) => {
  const { title, description, url } = req.body;

  const newVideo = await Video.create({ title, description, url });

  return res.status(200).json(newVideo);
};

export const reIndexVideo = async (req, res) => {
  const { videoId, id } = req.body;

  const video = await Video.findById(id);
};
