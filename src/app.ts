import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import { router as indexRouter } from "./routes/index";

const app = express();

const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://ajax.googleapis.com",
        "https://maxcdn.bootstrapcdn.com",
      ],
      styleSrc: [
        "'self'",
        "https://maxcdn.bootstrapcdn.com",
        "https://fonts.googleapis.com",
      ],
      imgSrc: ["'self'", "https://image.tmdb.org"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// routes
app.use("/", indexRouter);

// 404 redirect
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
