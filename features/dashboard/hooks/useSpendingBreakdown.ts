import { useMemo } from "react"
import { useTransactionsStore } from "@/stores/use-transactions-store"
import {
  CategoryDataPoint,
  SpendingCategory,
} from "../types/spending-breakdown"

const CATEGORY_CONFIG: Record<
  string,
  {
    category: SpendingCategory
    label: string
    color: string
    iconKey: string
    budget: number
  }
> = {
  Housing: {
    category: "housing",
    label: "Housing",
    color: "#6366f1",
    iconKey: "home",
    budget: 1600,
  },
  Rent: {
    category: "housing",
    label: "Housing",
    color: "#6366f1",
    iconKey: "home",
    budget: 1600,
  },
  "Food & Dining": {
    category: "food",
    label: "Food & Dining",
    color: "#10b981",
    iconKey: "utensils",
    budget: 1000,
  },
  Food: {
    category: "food",
    label: "Food & Dining",
    color: "#10b981",
    iconKey: "utensils",
    budget: 1000,
  },
  Subscriptions: {
    category: "subscriptions",
    label: "Subscriptions",
    color: "#f59e0b",
    iconKey: "repeat",
    budget: 800,
  },
  Transport: {
    category: "transport",
    label: "Transport",
    color: "#3b82f6",
    iconKey: "car",
    budget: 500,
  },
  Health: {
    category: "health",
    label: "Health",
    color: "#ec4899",
    iconKey: "heart-pulse",
    budget: 400,
  },
  Entertainment: {
    category: "entertainment",
    label: "Entertainment",
    color: "#8b5cf6",
    iconKey: "tv",
    budget: 300,
  },
  Leisure: {
    category: "entertainment",
    label: "Entertainment",
    color: "#8b5cf6",
    iconKey: "tv",
    budget: 300,
  },
  Shopping: {
    category: "shopping",
    label: "Shopping",
    color: "#f87171",
    iconKey: "shopping-bag",
    budget: 350,
  },
}

export function useSpendingBreakdown(): CategoryDataPoint[] {
  const { transactions } = useTransactionsStore()

  return useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense")

    // Accumulate amounts per mapped category
    const amountMap: Record<string, number> = {}

    expenses.forEach((t) => {
      const config = CATEGORY_CONFIG[t.category]
      const key = config ? config.category : "other"
      amountMap[key] = (amountMap[key] || 0) + t.amount
    })

    if (Object.keys(amountMap).length === 0) return []

    // Build CategoryDataPoint array from accumulated data
    const result: CategoryDataPoint[] = []
    const seen = new Set<string>()

    expenses.forEach((t) => {
      const config = CATEGORY_CONFIG[t.category]
      const key = config ? config.category : "other"

      if (!seen.has(key)) {
        seen.add(key)
        result.push({
          category: key as SpendingCategory,
          label: config ? config.label : "Other",
          amount: amountMap[key],
          budget: config ? config.budget : 250,
          color: config ? config.color : "#94a3b8",
          iconKey: config ? config.iconKey : "more-horizontal",
        })
      }
    })

    // Sort by amount descending
    return result.sort((a, b) => b.amount - a.amount)
  }, [transactions])
}
