import { useMemo } from "react"
import { useTransactionsStore } from "@/stores/use-transactions-store"

export const useStats = () => {
  const { transactions } = useTransactionsStore()

  const data = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    const thisMonth = transactions.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })

    const lastMonthTxns = transactions.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear
    })

    // --- Total Balance (all time income - expenses) ---
    const totalBalance = transactions.reduce(
      (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
      0
    )

    // --- Monthly Income ---
    const monthlyIncome = thisMonth
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)

    const lastMonthIncome = lastMonthTxns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)

    // --- Monthly Expenses ---
    const monthlyExpenses = thisMonth
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)

    const lastMonthExpenses = lastMonthTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)

    // --- Active Subscriptions ---
    const subscriptions = transactions.filter(
      (t) =>
        (t.category === "Subscriptions" || t.category === "Leisure") &&
        t.type === "expense"
    ).length

    // --- Sparkline helper (last 8 months cumulative) ---
    const getSparkData = (type: "income" | "expense" | "balance") => {
      return Array.from({ length: 8 }).map((_, i) => {
        const month = (currentMonth - (7 - i) + 12) % 12
        const year = currentMonth - (7 - i) < 0 ? currentYear - 1 : currentYear

        const monthTxns = transactions.filter((t) => {
          const d = new Date(t.date)
          return d.getMonth() === month && d.getFullYear() === year
        })

        if (type === "balance") {
          const value = monthTxns.reduce(
            (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
            0
          )
          return { value: Math.max(value, 0) }
        }

        const value = monthTxns
          .filter((t) => t.type === type)
          .reduce((sum, t) => sum + t.amount, 0)

        return { value }
      })
    }

    // --- Change % helper ---
    const getChange = (current: number, previous: number) => {
      if (previous === 0 && current === 0) return "0%"
      if (previous === 0) return "New"
      const pct = ((current - previous) / previous) * 100
      return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`
    }

    const incomeChange = getChange(monthlyIncome, lastMonthIncome)
    const expensesChange = getChange(monthlyExpenses, lastMonthExpenses)

    return [
      {
        type: "balance",
        title: "Total Balance",
        value: `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: "+0%",
        positive: totalBalance >= 0,
        accent: "indigo",
        sparkData: getSparkData("balance"),
      },
      {
        type: "income",
        title: "Monthly Income",
        value: `$${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: incomeChange,
        positive: !incomeChange.startsWith("-"),
        accent: "green",
        sparkData: getSparkData("income"),
      },
      {
        type: "expenses",
        title: "Monthly Expenses",
        value: `$${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: expensesChange,
        positive: expensesChange.startsWith("-"), // less expenses = positive
        accent: "red",
        sparkData: getSparkData("expense"),
      },
      {
        type: "balance",
        title: "Active Subscriptions",
        value: `${subscriptions}`,
        change: subscriptions > 0 ? `+${subscriptions}` : "0",
        positive: true,
        accent: "amber",
        sparkData: getSparkData("expense"),
      },
    ]
  }, [transactions])

  return {
    data,
    isLoading: false,
    isError: false,
  }
}
