import legalData from "../data/legalData.js";

const getLegalContent = async (
  req,
  res,
  next
) => {
  try {
    const {
      type
    } = req.params;

    const content = legalData[type];

    if (!content) {
      return res.status(404).json({
        success: false,
        message:
          "Legal content not found."
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

export { getLegalContent };