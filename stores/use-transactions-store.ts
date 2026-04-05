import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  date: string
  amount: number
  category: string
  type: TransactionType
  description: string
}

interface TransactionsState {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (id: string, updated: Partial<Transaction>) => void
  clearTransactions: () => void
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "2026-04-01",
    amount: 2500,
    category: "Salary",
    type: "income",
    description: "Monthly Salary April",
  },
  {
    id: "2",
    date: "2026-04-02",
    amount: 150,
    category: "Food",
    type: "expense",
    description: "Dinner at Italian Restaurant",
  },
  {
    id: "3",
    date: "2026-04-03",
    amount: 50,
    category: "Transport",
    type: "expense",
    description: "Uber ride",
  },
  {
    id: "4",
    date: "2026-04-03",
    amount: 1200,
    category: "Rent",
    type: "expense",
    description: "Apartment Rent",
  },
  {
    id: "5",
    date: "2026-04-03",
    amount: 300,
    category: "Leisure",
    type: "expense",
    description: "Movie tickets and snacks",
  },
]

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      addTransaction: (data) =>
        set((state) => ({
          transactions: [
            { ...data, id: Math.random().toString(36).substring(2, 9) },
            ...state.transactions,
          ],
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      updateTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "transactions-storage",
    }
  )
)
