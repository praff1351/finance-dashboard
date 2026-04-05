import { useMemo } from "react"
import { useTransactionsStore } from "@/stores/use-transactions-store"
import { Insight } from "../types/insight-types"

export function useInsights() {
  const { transactions } = useTransactionsStore()

  const data = useMemo<Insight[]>(() => {
    if (!transactions || transactions.length === 0) return []

    const expenses = transactions.filter((t) => t.type === "expense")
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)

    // --- Highest spending category ---
    const byCategory = expenses.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>
    )

    const [topCategory, topAmount] = Object.entries(byCategory).sort(
      (a, b) => b[1] - a[1]
    )[0] || ["None", 0]

    const topPercent =
      totalExpenses > 0 ? Math.round((topAmount / totalExpenses) * 100) : 0

    // --- Monthly trend ---
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const thisMonthExpenses = expenses
      .filter((t) => {
        const d = new Date(t.date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      })
      .reduce((sum, t) => sum + t.amount, 0)

    const lastMonthExpenses = expenses
      .filter((t) => {
        const d = new Date(t.date)
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
        return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear
      })
      .reduce((sum, t) => sum + t.amount, 0)

    const trend =
      lastMonthExpenses > 0
        ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
        : 0

    const trendLabel =
      trend === 0
        ? "No change vs last month"
        : trend > 0
          ? `Your spending is ${Math.abs(trend).toFixed(1)}% higher than last month.`
          : `Your total spending is ${Math.abs(trend).toFixed(1)}% lower than last month. Great job!`

    // --- Savings opportunity (subscriptions) ---
    const subscriptionCategories = ["Subscriptions", "Leisure"]
    const subscriptionTotal = expenses
      .filter((t) => subscriptionCategories.includes(t.category))
      .reduce((sum, t) => sum + t.amount, 0)

    const insights: Insight[] = [
      {
        id: "highest-spending",
        type: "highest-spending",
        title: "Highest Spending Category",
        value: topCategory,
        description: `This makes up ${topPercent}% of your total spending. Consider setting a budget.`,
        status: "warning",
        iconName: "Utensils",
      },
      {
        id: "monthly-comparison",
        type: "monthly-comparison",
        title: "Monthly Trend",
        value:
          trend === 0
            ? "No data"
            : `${trend > 0 ? "+" : ""}${trend.toFixed(1)}%`,
        description: trendLabel,
        status: trend <= 0 ? "success" : "warning",
        iconName: trend <= 0 ? "TrendingDown" : "TrendingUp",
      },
      {
        id: "useful-observation",
        type: "observation",
        title: "Savings Opportunity",
        value:
          subscriptionTotal > 0
            ? `$${(subscriptionTotal * 12).toFixed(0)} / year`
            : "$0 / year",
        description:
          subscriptionTotal > 0
            ? `You're spending $${subscriptionTotal.toFixed(0)}/month on subscriptions & leisure. Review if all are necessary.`
            : "No subscription or leisure expenses found this month.",
        status: "info",
        iconName: "Lightbulb",
      },
    ]

    return insights
  }, [transactions])

  return {
    data,
    isLoading: false,
    isError: false,
  }
}
