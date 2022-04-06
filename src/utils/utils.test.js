import { changeColor } from "./changeColor";
import { log } from "./log";
import { rollDice } from "./roll";

test("should render next color in the array", () => {
  const turnColor = "blue";
  const playerArr = ["red", "blue", "yellow", "green"];
  const nextColor = changeColor(turnColor, playerArr);
  expect(nextColor).toBe("yellow");
});

test("should display text", () => {
  jest.spyOn(console, "log");
  const text = "haha";
  const logText = log(text);
  expect(console.log.mock.calls[0][0]).toBe(text);
});

const runTheTest = async () => {
  let randomNum = rollDice();
  randomNum = Number(randomNum);
  expect(randomNum).toBeGreaterThanOrEqual(1);
  expect(randomNum).toBeLessThanOrEqual(6);
};

test("should roll between 1 to 6", async () => {
  const testRuns = [];
  for (let index = 0; index < 10; index++) {
    testRuns.push(runTheTest());
  }
  return Promise.all(testRuns);
});
