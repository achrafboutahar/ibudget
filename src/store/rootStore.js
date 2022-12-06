import create from "zustand";

const TYPE = { EXPENSE: 1, INCOME: 2, SAVING: 3 };

const getItem = (id, title, expected, real) => ({ id, title, expected, real });
const getComponent = (id, title, items, type) => ({ id, title, items, type });

const income = [
  getItem(1, "Test1", 11600, 12800),
  getItem(2, "Test2", 18000, 21000),
];

const dept = [
  getItem(1, "Test1", 600, 600),
  getItem(2, "Test2", 3000, 4000),
  getItem(3, "Test3", 250, 250),
];

const expense = [
  getItem(1, "Test1", 1000, 1000),
  getItem(2, "Test2", 300, 300),
  getItem(3, "Test3", 500, 500),
  getItem(4, "Test4", 100, 100),
  getItem(5, "Test5", 100, 100),
];

const elements = [
  getComponent(1, "Revenu", income, TYPE.INCOME),
  getComponent(2, "Crédit / Dettes", dept, TYPE.EXPENSE),
  getComponent(3, "Depenses fixes", expense, TYPE.EXPENSE),
  getComponent(4, "Depenses variables", [], TYPE.EXPENSE),
  getComponent(5, "Epargne", [], TYPE.SAVING),
];

const root = {
  label: "Budget mensuel",
  month: 0,
  elements,
};

export const useRootStore = create((set) => ({
  root,
  setRoot: (value) => set({ root: value }),
}));
