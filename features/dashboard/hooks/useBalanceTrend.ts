import { useMemo } from "react"
import { useTransactionsStore } from "@/stores/use-transactions-store"
import { BalanceDataPoint, TimeRange } from "../types/balance-types"

const RANGE_DAYS: Record<TimeRange, number> = {
  "7D": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
}

export function useBalanceTrend(range: TimeRange) {
  const { transactions } = useTransactionsStore()

  const data = useMemo<BalanceDataPoint[]>(() => {
    const days = RANGE_DAYS[range]
    const now = new Date()
    const result: BalanceDataPoint[] = []

    // Compute running balance before the range starts
    const rangeStart = new Date(now)
    rangeStart.setDate(now.getDate() - days + 1)
    rangeStart.setHours(0, 0, 0, 0)

    const priorBalance = transactions
      .filter((t) => new Date(t.date) < rangeStart)
      .reduce(
        (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
        0
      )

    let runningBalance = priorBalance

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const dayTxns = transactions.filter((t) => t.date === dateStr)

      const income = dayTxns
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0)

      const expenses = dayTxns
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)

      runningBalance =
        Math.round((runningBalance + income - expenses) * 100) / 100

      result.push({ date: dateStr, balance: runningBalance, income, expenses })
    }

    return result
  }, [transactions, range])

  return {
    data,
    isLoading: false,
    isError: false,
  }
}
