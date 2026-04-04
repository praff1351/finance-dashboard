'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle, DollarSign, Wallet, Calendar, Tag, FileText } from 'lucide-react'
import { useTransactionsStore, TransactionType } from '@/stores/use-transactions-store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export const AddTransactionModal = () => {
    const { addTransaction } = useTransactionsStore()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    
    // Default form state
    const [type, setType] = useState<TransactionType>('expense')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!amount || !category || !description) {
            toast.error("Please fill in all required fields")
            return
        }

        setLoading(true)
        
        try {
            addTransaction({
                type,
                category,
                amount: parseFloat(amount),
                description,
                date
            })
            
            toast.success("Transaction added successfully")
            setOpen(false)
            resetForm()
        } catch (error) {
            toast.error("Failed to add transaction")
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setType('expense')
        setCategory('')
        setAmount('')
        setDescription('')
        setDate(new Date().toISOString().split('T')[0])
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 shadow-md shadow-primary/25 transition-all font-semibold">
                    <PlusCircle className="h-4 w-4" />
                    New Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-border">
                <DialogHeader className="bg-muted/50 px-6 py-6 border-b border-border">
                    <DialogTitle className="text-xl font-bold text-foreground">Add New Transaction</DialogTitle>
                    <DialogDescription className="text-muted-foreground font-medium italic">
                        Record a new income or expense for your dashboard.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5 bg-background">
                    {/* Type Selector */}
                    <div className="grid grid-cols-2 gap-3 pb-2">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={cn(
                                "flex items-center justify-center gap-2 py-3 border-2 rounded-xl text-sm font-bold transition-all",
                                type === 'expense' 
                                ? "bg-rose-50 border-rose-200 text-rose-700 shadow-sm dark:bg-destructive/15 dark:border-destructive/30 dark:text-rose-300" 
                                : "bg-background border-border text-muted-foreground hover:border-primary/30"
                            )}
                        >
                            <DollarSign className="w-4 h-4" />
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={cn(
                                "flex items-center justify-center gap-2 py-3 border-2 rounded-xl text-sm font-bold transition-all",
                                type === 'income' 
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400" 
                                : "bg-background border-border text-muted-foreground hover:border-primary/30"
                            )}
                        >
                            <Wallet className="w-4 h-4" />
                            Income
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Amount */}
                        <div className="grid gap-2">
                            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount ($)</Label>
                            <div className="relative group">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="pl-10 h-11 border-border focus-visible:ring-primary rounded-xl"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="grid gap-2">
                            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</Label>
                            <div className="relative group">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                                <Input 
                                    type="date" 
                                    className="pl-10 h-11 border-border focus-visible:ring-primary rounded-xl"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="grid gap-2">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="h-11 border-border focus:ring-primary rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Select Category" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-xl shadow-lg border-border">
                                <SelectItem value="Food">Food & Beverage</SelectItem>
                                <SelectItem value="Transport">Transportation</SelectItem>
                                <SelectItem value="Salary">Salary & Income</SelectItem>
                                <SelectItem value="Rent">Rent & Housing</SelectItem>
                                <SelectItem value="Leisure">Entertainment & Leisure</SelectItem>
                                <SelectItem value="Health">Healthcare</SelectItem>
                                <SelectItem value="Shopping">Shopping</SelectItem>
                                <SelectItem value="Utilities">Utilities</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</Label>
                        <div className="relative group">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input 
                                placeholder="What was this for?" 
                                className="pl-10 h-11 border-border focus-visible:ring-primary rounded-xl"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter className="bg-muted/40 -mx-6 -mb-6 px-6 py-5 border-t border-border flex gap-3">
                        <Button
                            type="button"
                            variant="ghost" 
                            size="lg"
                            className="flex-1 rounded-xl text-muted-foreground font-medium"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            size="lg"
                            className="flex-1 rounded-xl font-bold shadow-md shadow-primary/25"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Transaction"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
