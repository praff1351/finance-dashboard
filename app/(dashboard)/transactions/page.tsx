"use client"

import React, { useState, useMemo } from "react"
import { TransactionTable } from "@/features/transactions/components/transaction-table"
import { TransactionFilters } from "@/features/transactions/components/transaction-filters"
import { AddTransactionModal } from "@/features/transactions/components/add-transaction-modal"
import { useTransactionsStore } from "@/stores/use-transactions-store"
import { useUserStore } from "@/stores/use-user-store"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Receipt,
  Download,
  Trash2,
  PlusCircle,
  Loader2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TransactionsPage = () => {
  const { transactions, clearTransactions } = useTransactionsStore()
  const { role } = useUserStore()

  // Filtering state
  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  // Derived filtered transactions
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter((t) => {
      const matchesSearch = t.description
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesType = type === "all" || t.type === type
      const matchesCategory = category === "all" || t.category === category
      return matchesSearch && matchesType && matchesCategory
    })
    result.sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
      if (sortBy === "amount-desc") {
        return b.amount - a.amount
      }
      if (sortBy === "amount-asc") {
        return a.amount - b.amount
      }
      return 0
    })
    return result
  }, [transactions, search, type, category, sortBy])

  const handleClearFilters = () => {
    setSearch("")
    setType("all")
    setCategory("all")
  }

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL transactions? This cannot be undone."
      )
    ) {
      clearTransactions()
      toast.success("All transactions cleared")
    }
  }

  const [isExporting, setIsExporting] = useState(false)

  const handleExportCSV = () => {
    setIsExporting(true)
    const csv = transactions
      .map(
        (t) => `${t.date},${t.description},${t.amount},${t.type},${t.category}`
      )
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    setIsExporting(false)
    window.URL.revokeObjectURL(url)
  }

  const isAdmin = role === "admin"

  return (
    <div className="min-h-screen space-y-6 bg-muted/30 p-4 sm:p-6 md:space-y-8 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="space-y-1.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/25">
              <Receipt className="h-5 w-5" />
            </div>
            <h1 className="truncate text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Transactions
            </h1>
          </div>
          <p className="flex items-center gap-1.5 px-1 text-xs font-medium text-muted-foreground sm:text-sm">
            View and manage all your financial records in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            disabled={isExporting}
            onClick={handleExportCSV}
            variant="outline"
            className="h-10 flex-1 gap-2 rounded-xl font-semibold shadow-sm transition-all sm:flex-none"
          >
            {isExporting ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export CSV
          </Button>

          {/* Role-based Add Button */}
          {isAdmin ? (
            <div className="flex-1 sm:flex-none">
              <AddTransactionModal />
            </div>
          ) : (
            <div className="group relative flex-1 sm:flex-none">
              <Button
                disabled
                className="h-10 w-full cursor-not-allowed gap-2 rounded-xl border-dashed border-border bg-muted text-muted-foreground"
              >
                <PlusCircle className="h-4 w-4" />
                New Transaction
              </Button>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1 text-[10px] whitespace-nowrap text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                Admin access required
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="grid gap-6">
        
        <TransactionFilters
          search={search}
          onSearchChange={setSearch}
          type={type}
          onTypeChange={setType}
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClear={handleClearFilters}
        />

        {/* Table Card */}
        <Card className="overflow-hidden border-border shadow-lg ring-1 ring-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border bg-card px-6 py-5">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                History
              </CardTitle>
              <CardDescription className="mt-1 text-xs font-medium text-muted-foreground italic">
                Showing {filteredTransactions.length} of {transactions.length}{" "}
                entries
              </CardDescription>
            </div>

            {isAdmin && transactions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleClearAll}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] lg:min-w-0">
                <TransactionTable transactions={filteredTransactions} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TransactionsPage
