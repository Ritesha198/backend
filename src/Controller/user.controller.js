import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user detail
  //validation - not empty
  //check if user already exist: email,username
  //check for images and avtar
  //upload to cloudinary
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullname, email, username, password } = req.body;
  console.log("body", req.body);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are requierd");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }
  const avtarLocal = req.files?.avtar[0]?.path;
  //   const coverImageLocal = req.files?.coverImage[0]?.path;

  let coverImageLocal;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocal = req.files.coverImage[0].path;
  }
  if (!avtarLocal) {
    throw new ApiError(400, "Avatar is necessary");
  }
  console.log("files", req.files);

  const avtar = await uploadOnCloudinary(avtarLocal);
  const coverImage = await uploadOnCloudinary(coverImageLocal);

  if (!avtarLocal) {
    throw new ApiError(400, "Avatar is necessary");
  }

  const user = await User.create({
    fullname,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createUser) {
    throw new ApiError(500, "something went wrong whiteregisterinh thr user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User regestered successfully"));
});

export { registerUser };
