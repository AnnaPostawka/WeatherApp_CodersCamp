import Controller from "./Controller.js";
import Model from "./Model.js";
import View from "./View.js";

const view = new View();
const model = new Model(view);
const appController = new Controller(model, view);