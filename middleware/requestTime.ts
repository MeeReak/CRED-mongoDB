export const requestTime = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  console.log(new Date().toTimeString());
  next();
};
