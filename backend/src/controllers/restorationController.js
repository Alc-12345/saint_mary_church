import RestorationUpdate from "../models/RestorationUpdate.js";

function getRelevantTimestamp(item) {
  return new Date(
    item?.publishedAt || item?.updatedAt || item?.createdAt || 0,
  ).getTime();
}

export async function getRestorationUpdates(req, res) {
  try {
    const updates = await RestorationUpdate.find().lean();
    updates.sort((first, second) => getRelevantTimestamp(second) - getRelevantTimestamp(first));
    res.status(200).json({ success: true, count: updates.length, data: updates });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch restoration updates.",
      error: error.message,
    });
  }
}

export async function createRestorationUpdate(req, res) {
  try {
    const imageUrls = Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls.filter(Boolean)
      : req.body.imageUrl
        ? [req.body.imageUrl]
        : [];

    const update = await RestorationUpdate.create({
      title: req.body.title,
      description: req.body.description || "",
      status: req.body.status || "Draft",
      imageUrl: imageUrls[0] || "",
      imageUrls,
    });
    res.status(201).json({ success: true, data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create restoration update.",
      error: error.message,
    });
  }
}

export async function publishRestorationUpdate(req, res) {
  try {
    const update = await RestorationUpdate.findByIdAndUpdate(
      req.params.id,
      { status: "Published", publishedAt: new Date() },
      { new: true }
    );

    res.status(200).json({ success: true, data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to publish restoration update.",
      error: error.message,
    });
  }
}

export async function deleteRestorationUpdate(req, res) {
  try {
    const update = await RestorationUpdate.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete restoration update.",
      error: error.message,
    });
  }
}
