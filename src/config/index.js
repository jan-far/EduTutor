import { category } from "../db";
export * from "./helper";

export class initial {
  constructor() {
    this.define();
  }

  define() {
    category.estimate()
  }
}
