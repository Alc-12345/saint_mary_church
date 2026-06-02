import Message from "../models/Message.js";

export async function getMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch messages.",
      error: error.message,
    });
  }
}

export async function createMessage(req, res) {
  try {
    const message = await Message.create({
      name: req.body.name,
      email: req.body.email || "",
      phone: req.body.phone || "",
      purpose: req.body.purpose || "",
      amount: Number(req.body.amount) || 0,
      topic:
        req.body.topic ||
        (req.body.message || "").trim().slice(0, 80) ||
        "Website message",
      message: req.body.message,
      reply: "",
      status: "New",
    });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create message.",
      error: error.message,
    });
  }
}

export async function markMessageReplied(req, res) {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        status: "Replied",
        reply: req.body.reply || "",
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update message status.",
      error: error.message,
    });
  }
}

export async function markMessageResolved(req, res) {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to resolve message.",
      error: error.message,
    });
  }
}
