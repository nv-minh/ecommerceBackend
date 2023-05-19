"use strict";

app.get("", (req, res, next) => {
  const strCompress = "hello world";
  return res.status(200).json({
    message: "welcome",
    metadata: strCompress.repeat(1000),
  });
});
