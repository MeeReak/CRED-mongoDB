export const paramsMethod = (
  req: { path: any; method: any },
  res: Response,
  next: () => void
) => {
  console.log(req.path, req.method);
  next();
};
