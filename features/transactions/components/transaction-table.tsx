'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'
import { useTransactionsStore, Transaction } from '@/stores/use-transactions-store'
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores/use-user-store'

interface TransactionTableProps {
  transactions: Transaction[]
}

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const { deleteTransaction } = useTransactionsStore()
  const { role } = useUserStore()

  const handleDelete = (id: string) => {
    if (role === 'admin') {
      deleteTransaction(id)
      toast.success('Transaction deleted successfully')
    } else {
      toast.error('You are not authorized to delete transactions')
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border-2 border-dashed border-border bg-muted/20">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
          <Trash2 className="w-6 h-6 opacity-20" />
        </div>
        <p className="text-muted-foreground font-medium">No transactions found</p>
        <p className="text-muted-foreground/80 text-sm">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[120px] font-semibold text-foreground">Date</TableHead>
            <TableHead className="font-semibold text-foreground">Description</TableHead>
            <TableHead className="font-semibold text-foreground">Category</TableHead>
            <TableHead className="font-semibold text-foreground">Type</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Amount</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id} className="group hover:bg-muted/30 transition-colors">
              <TableCell className="text-muted-foreground text-xs py-4">
                {format(new Date(t.date), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell className="font-medium text-foreground py-4">
                {t.description}
              </TableCell>
              <TableCell className="py-4">
                <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-[11px] font-medium">
                  {t.category || 'Uncategorized'}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  {t.type === 'income' ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <ArrowUpCircle className="w-3 h-3" />
                      Income
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <ArrowDownCircle className="w-3 h-3" />
                      Expense
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className={cn(
                "text-right font-bold py-4 tabular-nums text-sm",
                t.type === 'income' ? "text-emerald-600" : "text-rose-600"
              )}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
              </TableCell>
              <TableCell className="py-4 text-right">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-md transition-all"
                  title="Delete transaction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
