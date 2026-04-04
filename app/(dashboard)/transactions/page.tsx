'use client'

import React, { useState, useMemo } from 'react'
import { TransactionTable } from '@/features/transactions/components/transaction-table'
import { TransactionFilters } from '@/features/transactions/components/transaction-filters'
import { AddTransactionModal } from '@/features/transactions/components/add-transaction-modal'
import { useTransactionsStore } from '@/stores/use-transactions-store'
import { useUserStore } from '@/stores/use-user-store'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Receipt, Download, Trash2, PlusCircle, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const TransactionsPage = () => {
    const { transactions, clearTransactions } = useTransactionsStore()
    const { role } = useUserStore()

    // Filtering state
    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')
    const [category, setCategory] = useState('all')

    // Derived filtered transactions
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase())
            const matchesType = type === 'all' || t.type === type
            const matchesCategory = category === 'all' || t.category === category
            return matchesSearch && matchesType && matchesCategory
        })
    }, [transactions, search, type, category])

    const handleClearFilters = () => {
        setSearch('')
        setType('all')
        setCategory('all')
    }

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete ALL transactions? This cannot be undone.")) {
            clearTransactions()
            toast.success("All transactions cleared")
        }
    }

    const [isExporting, setIsExporting] = useState(false)

    const handleExportCSV = () => {
        setIsExporting(true)
        const csv = transactions.map(t => `${t.date},${t.description},${t.amount},${t.type},${t.category}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'transactions.csv';
        a.click();
        setIsExporting(false)
        window.URL.revokeObjectURL(url);
    }

    const isAdmin = role === 'admin'

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 bg-muted/30 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/25 text-primary-foreground shrink-0">
                            <Receipt className="w-5 h-5" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground truncate">Transactions</h1>
                    </div>
                    <p className="text-muted-foreground font-medium px-1 flex items-center gap-1.5 text-xs sm:text-sm">
                        View and manage all your financial records in one place.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button disabled={isExporting} onClick={handleExportCSV} variant="outline" className="flex-1 sm:flex-none h-10 gap-2 rounded-xl shadow-sm transition-all font-semibold">
                        {isExporting ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        Export CSV
                    </Button>

                    {/* Role-based Add Button */}
                    {isAdmin ? (
                        <div className="flex-1 sm:flex-none">
                            <AddTransactionModal />
                        </div>
                    ) : (
                        <div className="group relative flex-1 sm:flex-none">
                            <Button disabled className="w-full h-10 gap-2 bg-muted text-muted-foreground border-dashed border-border rounded-xl cursor-not-allowed">
                                <PlusCircle className="h-4 w-4" />
                                New Transaction
                            </Button>
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground border border-border text-[10px] rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Admin access required
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="grid gap-6">
                {/* Filters */}
                <TransactionFilters
                    search={search}
                    onSearchChange={setSearch}
                    type={type}
                    onTypeChange={setType}
                    category={category}
                    onCategoryChange={setCategory}
                    onClear={handleClearFilters}
                />

                {/* Table Card */}
                <Card className="border-border shadow-lg overflow-hidden ring-1 ring-border/50">
                    <CardHeader className="bg-card px-6 py-5 border-b border-border flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle className="text-lg font-bold text-foreground">History</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground font-medium italic mt-1">
                                Showing {filteredTransactions.length} of {transactions.length} entries
                            </CardDescription>
                        </div>

                        {isAdmin && transactions.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
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