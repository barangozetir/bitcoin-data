import express, { Response, Request } from "express";
import { BlockBusiness } from "../Business/BlockBusiness";

const block = express.Router();
const data = new BlockBusiness();

block.put("/", async (req: any, res: any) => {
  const key = req.body.key;
  const value = req.body.value;
  const result = await data.put(key, value);
  res.status(201).send(result);
});

block.get("/", async (req: any, res: any) => {
  const result = await data.getMany();
  console.log(result);
  res.send(
    result.filter((element) => element.val.height == req.query.height) &&
      result.filter((element) => element.key == req.query.hash) &&
      result.filter(
        (element) => element.val.timestamp == req.query.timestamp
      ) &&
      result.filter((element) => element.val.version == req.query.version) &&
      result.filter((element) => element.val.size == req.query.size) &&
      result.filter((element) => element.val.tx_count == req.query.tx_count) &&
      result.filter(
        (element) => element.val.difficulty == req.query.difficulty
      ) &&
      result.filter((element) => element.val.id == req.query.id)
  );
});

block.get("/:id", async (req: any, res: any) => {
  let id = req.params.id;
  const result = await data.get(id);
  res.send(result);
});

block.delete("/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.delete(id);
  res.send(result);
});

block.delete("/", async (req: any, res: any) => {
  const result = await data.deleteAll();
  res.send(result);
  console.log(result);
});

export default block;
