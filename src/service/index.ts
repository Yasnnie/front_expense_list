import axios from "axios";
import { ExpenseCreate, ExpenseType } from "../types";

const httpClient = axios.create({ baseURL: "http://localhost:8000/expenses" });

export async function getAllExpenses() {
  const { data } = await httpClient.get("/");
  return data;
}

export async function createExpense(item: ExpenseCreate) {
  const { data } = await httpClient.post("/", item);
  return data;
}

export async function deleteExpense(id: number) {
  const { data } = await httpClient.delete(`/${id}`);
  return data;
}

export async function editExpense(id: number, item:ExpenseCreate) {
  const { data } = await httpClient.put(`/${id}`, item);
  return data;
}


