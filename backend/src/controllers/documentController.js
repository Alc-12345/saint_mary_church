import Document from "../models/Document.js";

export async function getDocuments(req, res) {
  try {
    const documents = await Document.find()
      .sort({ createdAt: -1 })
      .allowDiskUse(true);
    res
      .status(200)
      .json({ success: true, count: documents.length, data: documents });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch documents.",
      error: error.message,
    });
  }
}

export async function createDocument(req, res) {
  try {
    const document = await Document.create({
      title: req.body.title,
      description: req.body.description || "",
      type: req.body.type || "PDF",
      fileUrl: req.body.fileUrl || "",
      coverImage: req.body.coverImage || "",
      content: req.body.content || "",
    });
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create document.",
      error: error.message,
    });
  }
}

export async function deleteDocument(req, res) {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete document.",
      error: error.message,
    });
  }
}
